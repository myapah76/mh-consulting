import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVietnameseApiError } from '../../../utils/apiError';
import { ConsultationStatusBadge } from '../../consultations';
import { useAdminDashboard } from '../hooks/useAdminDashboard';
import type { DashboardParams } from '../types/dashboard.types';

type PeriodOption = 'week' | 'last7' | 'last30' | 'custom';

const periodOptions: Array<{ value: PeriodOption; label: string }> = [
  { value: 'week', label: 'Tuần này' },
  { value: 'last7', label: '7 ngày gần nhất' },
  { value: 'last30', label: '30 ngày gần nhất' },
  { value: 'custom', label: 'Tùy chọn' },
];

const WEEKDAY_LABELS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const FULL_WEEKDAY_LABELS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

function parseLocalDate(date: string): Date | undefined {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return undefined;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const value = new Date(year, month - 1, day);
  if (value.getFullYear() !== year || value.getMonth() !== month - 1 || value.getDate() !== day) return undefined;
  return value;
}

function formatChartDate(date: string): string {
  const value = parseLocalDate(date);
  if (!value) return 'Không xác định';
  const weekday = WEEKDAY_LABELS[value.getDay()];
  const day = String(value.getDate()).padStart(2, '0');
  const month = String(value.getMonth() + 1).padStart(2, '0');
  return `${weekday} ${day}/${month}`;
}

function formatFullCalendarDate(date: string): string {
  const value = parseLocalDate(date);
  if (!value) return 'Không xác định';
  const weekday = FULL_WEEKDAY_LABELS[value.getDay()];
  const day = String(value.getDate()).padStart(2, '0');
  const month = String(value.getMonth() + 1).padStart(2, '0');
  return `${weekday}, ${day}/${month}/${value.getFullYear()}`;
}

function toStartOfDayIso(date: string): string | undefined {
  if (!date) return undefined;
  const value = new Date(`${date}T00:00:00`);
  return Number.isNaN(value.getTime()) ? undefined : value.toISOString();
}

function toEndOfDayIso(date: string): string | undefined {
  if (!date) return undefined;
  const value = new Date(`${date}T23:59:59.999`);
  return Number.isNaN(value.getTime()) ? undefined : value.toISOString();
}

function localDateValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function rollingPeriod(days: number): DashboardParams {
  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - (days - 1));
  return {
    from: toStartOfDayIso(localDateValue(start)),
    to: toEndOfDayIso(localDateValue(end)),
  };
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Không xác định';
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(date);
}

function formatPeriodDate(value: string, timezone: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Không xác định';
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      day: '2-digit', month: '2-digit', year: 'numeric', timeZone: timezone,
    }).formatToParts(date);
    const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value;
    const year = part('year');
    const month = part('month');
    const day = part('day');
    return year && month && day ? formatFullCalendarDate(`${year}-${month}-${day}`) : 'Không xác định';
  } catch {
    return 'Không xác định';
  }
}

export default function AdminDashboard() {
  const [period, setPeriod] = useState<PeriodOption>('week');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  const customFromIso = toStartOfDayIso(customFrom);
  const customToIso = toEndOfDayIso(customTo);
  const customComplete = Boolean(customFromIso && customToIso);
  const customOrderValid = !customComplete || new Date(customFromIso!) <= new Date(customToIso!);
  const customValid = customComplete && customOrderValid;

  const params = useMemo<DashboardParams>(() => {
    if (period === 'week') return {};
    if (period === 'last7') return rollingPeriod(7);
    if (period === 'last30') return rollingPeriod(30);
    return customValid ? { from: customFromIso, to: customToIso } : {};
  }, [customFromIso, customToIso, customValid, period]);

  const queryEnabled = period !== 'custom' || customValid;
  const dashboard = useAdminDashboard(params, queryEnabled);
  const data = dashboard.data;

  return (
    <section>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Bảng điều khiển</p>
          <h1 className="mt-1 text-2xl font-black sm:text-3xl">Tổng quan</h1>
          <p className="mt-2 text-sm text-gray-500">Theo dõi các yêu cầu tư vấn và hiệu quả xử lý.</p>
        </div>
        {data && <p className="text-xs font-semibold text-gray-500">{formatPeriodDate(data.period.from, data.period.timezone)} – {formatPeriodDate(data.period.to, data.period.timezone)} · {data.period.timezone}</p>}
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2" aria-label="Chọn khoảng thời gian">
          {periodOptions.map((option) => (
            <button key={option.value} type="button" onClick={() => setPeriod(option.value)} className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${period === option.value ? 'bg-[#d40000] text-white' : 'border border-gray-300 bg-white text-gray-700 hover:border-gray-500'}`}>
              {option.label}
            </button>
          ))}
        </div>
        {period === 'custom' && (
          <div className="mt-4 grid gap-4 sm:max-w-xl sm:grid-cols-2">
            <DateInput label="Từ ngày" value={customFrom} onChange={setCustomFrom} />
            <DateInput label="Đến ngày" value={customTo} onChange={setCustomTo} />
            {!customComplete && <p className="text-xs font-semibold text-gray-500 sm:col-span-2">Chọn đầy đủ Từ ngày và Đến ngày để xem dữ liệu.</p>}
            {customComplete && !customOrderValid && <p className="text-sm font-semibold text-red-600 sm:col-span-2" role="alert">Từ ngày không được sau Đến ngày.</p>}
          </div>
        )}
      </div>

      {queryEnabled && dashboard.isPending && <DashboardLoading />}
      {queryEnabled && dashboard.isError && <DashboardError message={getVietnameseApiError(dashboard.error, 'Không thể tải dữ liệu tổng quan.')} onRetry={() => void dashboard.refetch()} />}
      {!queryEnabled && <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center text-sm font-semibold text-gray-500">Dữ liệu sẽ hiển thị khi khoảng thời gian hợp lệ.</div>}

      {queryEnabled && data && !dashboard.isError && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <SummaryCard label="Tổng yêu cầu" value={data.summary.total} className="text-gray-900" />
            <SummaryCard label="Mới" value={data.summary.newCount} className="text-blue-700" />
            <SummaryCard label="Đã liên hệ" value={data.summary.contactedCount} className="text-amber-700" />
            <SummaryCard label="Hoàn thành" value={data.summary.completedCount} className="text-green-700" />
            <SummaryCard label="Đã hủy" value={data.summary.cancelledCount} className="text-gray-600" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4"><div><h2 className="font-black">Yêu cầu theo ngày</h2><p className="mt-1 text-xs text-gray-500">Số yêu cầu tư vấn nhận được trong kỳ.</p></div><span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">{data.summary.total} yêu cầu</span></div>
              <DailyChart items={data.dailyConsultations} />
            </section>
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-black">Tỷ lệ hoàn thành</h2>
              <div className="mt-6 flex items-end gap-2"><strong className="text-4xl font-black text-green-700">{data.summary.completionRate.toLocaleString('vi-VN')}%</strong><span className="pb-1 text-xs text-gray-500">trong kỳ</span></div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-green-600" style={{ width: `${Math.min(Math.max(data.summary.completionRate, 0), 100)}%` }} /></div>
              <p className="mt-4 text-sm leading-6 text-gray-600">Đã hoàn thành <strong>{data.summary.completedCount}</strong> trên tổng số <strong>{data.summary.total}</strong> yêu cầu.</p>
            </section>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <RankingCard title="Theo dịch vụ" emptyText="Chưa có dữ liệu dịch vụ." items={data.consultationsByService.map((item) => ({ label: item.serviceTitle ?? 'Không xác định', count: item.count }))} />
            <RankingCard title="Theo danh mục" emptyText="Chưa có dữ liệu danh mục." items={data.consultationsByCategory.map((item) => ({ label: item.categoryName ?? 'Không xác định', count: item.count }))} />
          </div>

          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-4 sm:px-6"><div><h2 className="font-black">Yêu cầu gần đây</h2><p className="mt-1 text-xs text-gray-500">Các yêu cầu tư vấn mới nhất trong kỳ.</p></div><Link to="/admin/consultations" className="shrink-0 text-xs font-black text-[#d40000] hover:underline">Xem tất cả</Link></div>
            {data.recentConsultations.length === 0 ? <EmptyState text="Chưa có yêu cầu tư vấn nào trong kỳ." /> : (
              <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-5 py-4">Khách hàng</th><th className="px-5 py-4">Liên hệ</th><th className="px-5 py-4">Dịch vụ</th><th className="px-5 py-4">Trạng thái</th><th className="px-5 py-4">Thời gian</th></tr></thead><tbody className="divide-y divide-gray-100">{data.recentConsultations.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70"><td className="px-5 py-4 font-bold text-gray-900">{item.customerName}</td><td className="px-5 py-4"><a href={`tel:${item.phone}`} className="font-semibold text-blue-700 hover:underline">{item.phone}</a>{item.email && <a href={`mailto:${item.email}`} className="mt-1 block text-xs text-gray-500 hover:underline">{item.email}</a>}</td><td className="max-w-[240px] px-5 py-4 text-gray-600">{item.serviceTitleSnapshot ?? 'Không xác định'}</td><td className="px-5 py-4"><ConsultationStatusBadge status={item.status} /></td><td className="whitespace-nowrap px-5 py-4 text-gray-600">{formatDateTime(item.createdAt)}</td></tr>
              ))}</tbody></table></div>
            )}
          </section>
        </div>
      )}
    </section>
  );
}

function DateInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label><span className="mb-1.5 block text-xs font-bold text-gray-600">{label}</span><input type="date" value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10" /></label>;
}

function SummaryCard({ label, value, className }: { label: string; value: number; className: string }) {
  return <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</p><p className={`mt-3 text-3xl font-black ${className}`}>{value.toLocaleString('vi-VN')}</p></div>;
}

function DailyChart({ items }: { items: Array<{ date: string; count: number }> }) {
  if (items.length === 0) return <EmptyState text="Chưa có dữ liệu theo ngày." />;
  const maximum = Math.max(...items.map((item) => item.count), 1);
  return <div className="mt-6 overflow-x-auto"><div className="flex h-56 min-w-[520px] items-end gap-2 border-b border-gray-200 px-1">{items.map((item) => {
    const height = item.count === 0 ? 2 : Math.max(8, (item.count / maximum) * 160);
    const [weekday, ...calendarDateParts] = formatChartDate(item.date).split(' ');
    const calendarDate = calendarDateParts.join(' ');
    const fullLabel = formatFullCalendarDate(item.date);
    return <div key={item.date} className="flex min-w-8 flex-1 flex-col items-center justify-end gap-2" title={`${fullLabel}: ${item.count} yêu cầu`} aria-label={`${fullLabel}: ${item.count} yêu cầu`}><span className="text-[10px] font-bold text-gray-600">{item.count}</span><div className="w-full max-w-10 rounded-t-md bg-[#d40000]" style={{ height }} /><span className="pb-2 text-center text-[10px] leading-4 text-gray-500"><strong className="block font-bold text-gray-700">{weekday}</strong><span className="block whitespace-nowrap">{calendarDate}</span></span></div>;
  })}</div></div>;
}

function RankingCard({ title, items, emptyText }: { title: string; items: Array<{ label: string; count: number }>; emptyText: string }) {
  const maximum = Math.max(...items.map((item) => item.count), 1);
  return <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"><h2 className="font-black">{title}</h2>{items.length === 0 ? <EmptyState text={emptyText} /> : <div className="mt-5 space-y-4">{items.map((item, index) => <div key={`${item.label}-${index}`}><div className="flex justify-between gap-4 text-sm"><span className="min-w-0 truncate font-semibold text-gray-700" title={item.label}>{item.label}</span><strong>{item.count.toLocaleString('vi-VN')}</strong></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-[#d40000]" style={{ width: `${(item.count / maximum) * 100}%` }} /></div></div>)}</div>}</section>;
}

function EmptyState({ text }: { text: string }) {
  return <p className="px-4 py-10 text-center text-sm font-semibold text-gray-500">{text}</p>;
}

function DashboardLoading() {
  return <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5" aria-label="Đang tải dữ liệu tổng quan">{Array.from({ length: 5 }, (_, index) => <div key={index} className="h-28 animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><div className="h-3 w-24 rounded bg-gray-200" /><div className="mt-5 h-8 w-16 rounded bg-gray-200" /></div>)}</div>;
}

function DashboardError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center"><p className="text-sm font-bold text-red-700">{message}</p><button type="button" onClick={onRetry} className="mt-4 rounded-lg bg-[#d40000] px-4 py-2 text-xs font-bold text-white">Thử lại</button></div>;
}
