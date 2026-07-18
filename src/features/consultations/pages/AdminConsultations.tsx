import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ConfirmDialog from '../../../components/common/ConfirmDialog';
import { useToast } from '../../../components/common/ToastProvider';
import ConsultationStatusBadge, {
  consultationStatusLabels,
  getConsultationStatusLabel,
} from '../components/ConsultationStatusBadge';
import {
  useAdminConsultation,
  useAdminConsultations,
  useUpdateConsultationStatus,
} from '../hooks/useAdminConsultations';
import { useAdminServices } from '../../services';
import { getApiStatus, getVietnameseApiError } from '../../../utils/apiError';
import type { AdminConsultationListParams, ConsultationStatus } from '../types/consultation.types';

const statuses = Object.keys(consultationStatusLabels) as ConsultationStatus[];

interface FilterDraft {
  status: string;
  serviceId: string;
  phone: string;
  email: string;
  createdFrom: string;
  createdTo: string;
}

function validStatus(value: string): value is ConsultationStatus {
  return statuses.includes(value as ConsultationStatus);
}

function toIsoInstant(value: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Không xác định';
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(date);
}

function readDraft(searchParams: URLSearchParams): FilterDraft {
  return {
    status: searchParams.get('status') ?? '',
    serviceId: searchParams.get('serviceId') ?? '',
    phone: searchParams.get('phone') ?? '',
    email: searchParams.get('email') ?? '',
    createdFrom: searchParams.get('createdFrom') ?? '',
    createdTo: searchParams.get('createdTo') ?? '',
  };
}

export default function AdminConsultations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [draft, setDraft] = useState<FilterDraft>(() => readDraft(searchParams));
  const [filterError, setFilterError] = useState('');
  const [selectedId, setSelectedId] = useState<string>();
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;
  const parsedPage = Number(searchParams.get('page') ?? '1');
  const uiPage = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const parsedSize = Number(searchParams.get('size') ?? '20');
  const pageSize = [10, 20, 50].includes(parsedSize) ? parsedSize : 20;

  const params = useMemo<AdminConsultationListParams>(() => {
    const status = searchParams.get('status') ?? '';
    const serviceId = searchParams.get('serviceId')?.trim() ?? '';
    const phone = searchParams.get('phone')?.trim() ?? '';
    const email = searchParams.get('email')?.trim() ?? '';
    const createdFrom = toIsoInstant(searchParams.get('createdFrom') ?? '');
    const createdTo = toIsoInstant(searchParams.get('createdTo') ?? '');
    return {
      ...(validStatus(status) ? { status } : {}),
      ...(serviceId ? { serviceId } : {}),
      ...(phone ? { phone } : {}),
      ...(email ? { email } : {}),
      ...(createdFrom ? { createdFrom } : {}),
      ...(createdTo ? { createdTo } : {}),
      page: uiPage - 1,
      size: pageSize,
    };
  }, [pageSize, searchParams, uiPage]);

  const consultations = useAdminConsultations(params);
  const services = useAdminServices({ page: 0, size: 100 });

  const updateTextFilter = (field: 'phone' | 'email', value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const current = searchParamsRef.current;
      const phone = draft.phone.trim();
      const email = draft.email.trim();
      if ((current.get('phone') ?? '') === phone && (current.get('email') ?? '') === email) return;

      const next = new URLSearchParams(current);
      phone ? next.set('phone', phone) : next.delete('phone');
      email ? next.set('email', email) : next.delete('email');
      next.set('page', '1');
      next.set('size', String(pageSize));
      setSearchParams(next, { replace: true });
    }, 450);

    return () => window.clearTimeout(timeoutId);
  }, [draft.email, draft.phone, pageSize, setSearchParams]);

  const updateImmediateFilter = (field: 'status' | 'serviceId', value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    const next = new URLSearchParams(searchParamsRef.current);
    value ? next.set(field, value) : next.delete(field);
    next.set('page', '1');
    next.set('size', String(pageSize));
    setSearchParams(next);
  };

  const updateDateFilter = (field: 'createdFrom' | 'createdTo', value: string) => {
    const nextDraft = { ...draft, [field]: value };
    setDraft(nextDraft);
    const from = toIsoInstant(nextDraft.createdFrom);
    const to = toIsoInstant(nextDraft.createdTo);
    if ((nextDraft.createdFrom && !from) || (nextDraft.createdTo && !to)) {
      setFilterError('Ngày đã nhập không hợp lệ.');
      return;
    }
    if (from && to && new Date(from) > new Date(to)) {
      setFilterError('Từ ngày không được sau Đến ngày.');
      return;
    }
    const next = new URLSearchParams(searchParamsRef.current);
    nextDraft.createdFrom ? next.set('createdFrom', nextDraft.createdFrom) : next.delete('createdFrom');
    nextDraft.createdTo ? next.set('createdTo', nextDraft.createdTo) : next.delete('createdTo');
    next.set('page', '1');
    next.set('size', String(pageSize));
    setSearchParams(next);
    setFilterError('');
  };

  const clearFilters = () => {
    const empty = readDraft(new URLSearchParams());
    setDraft(empty);
    setFilterError('');
    setSearchParams({ page: '1', size: String(pageSize) });
  };

  const setPage = (page: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(page));
    setSearchParams(next);
  };

  const setPageSize = (size: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', '1');
    next.set('size', String(size));
    setSearchParams(next);
  };

  return (
    <section>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Chăm sóc khách hàng</p>
        <h1 className="mt-1 text-2xl font-black sm:text-3xl">Yêu Cầu Tư Vấn</h1>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <FilterSelect label="Trạng thái" value={draft.status} onChange={(value) => updateImmediateFilter('status', value)}>
            <option value="">Tất cả trạng thái</option>
            {statuses.map((status) => <option key={status} value={status}>{consultationStatusLabels[status]}</option>)}
          </FilterSelect>
          <FilterSelect label="Dịch vụ" value={draft.serviceId} onChange={(value) => updateImmediateFilter('serviceId', value)} disabled={services.isPending}>
            <option value="">{services.isPending ? 'Đang tải dịch vụ...' : 'Tất cả dịch vụ'}</option>
            {services.data?.content.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}
          </FilterSelect>
          <FilterInput label="Số điện thoại" value={draft.phone} onChange={(value) => updateTextFilter('phone', value)} placeholder="Nhập số điện thoại" />
          <FilterInput label="Email" value={draft.email} onChange={(value) => updateTextFilter('email', value)} placeholder="Nhập email" type="email" />
          <FilterInput label="Từ ngày" value={draft.createdFrom} onChange={(value) => updateDateFilter('createdFrom', value)} type="datetime-local" />
          <FilterInput label="Đến ngày" value={draft.createdTo} onChange={(value) => updateDateFilter('createdTo', value)} type="datetime-local" />
        </div>
        {services.isError && <p className="mt-3 text-xs font-semibold text-red-600">Không thể tải danh sách dịch vụ.</p>}
        {filterError && <p className="mt-3 text-sm font-semibold text-red-600" role="alert">{filterError}</p>}
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={clearFilters} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-gray-500">Xóa bộ lọc</button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {consultations.isPending && <RequestState text="Đang tải danh sách yêu cầu tư vấn..." />}
        {consultations.isError && <RequestState text={getVietnameseApiError(consultations.error, 'Không thể tải danh sách yêu cầu tư vấn.')} action="Thử lại" onAction={() => void consultations.refetch()} error />}
        {!consultations.isPending && !consultations.isError && consultations.data?.content.length === 0 && <RequestState text="Không tìm thấy yêu cầu tư vấn nào." />}
        {consultations.data && consultations.data.content.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1060px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr>
                <th className="px-4 py-4">Mã yêu cầu</th><th className="px-4 py-4">Khách hàng</th><th className="px-4 py-4">Số điện thoại</th><th className="px-4 py-4">Email</th><th className="px-4 py-4">Dịch vụ</th><th className="px-4 py-4">Trạng thái</th><th className="px-4 py-4">Thời gian gửi</th><th className="px-4 py-4 text-right">Thao tác</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">{consultations.data.content.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70">
                  <td className="px-4 py-4 font-mono text-xs text-gray-600" title={item.id}>{item.id.slice(0, 8)}…</td>
                  <td className="px-4 py-4 font-bold text-gray-900">{item.customerName}</td>
                  <td className="px-4 py-4"><a className="font-semibold text-blue-700 hover:underline" href={`tel:${item.phone}`}>{item.phone}</a></td>
                  <td className="px-4 py-4">{item.email ? <a className="text-blue-700 hover:underline" href={`mailto:${item.email}`}>{item.email}</a> : <span className="text-gray-500">Không cung cấp</span>}</td>
                  <td className="max-w-[220px] px-4 py-4 text-gray-600">{item.serviceTitleSnapshot ?? 'Không xác định'}</td>
                  <td className="px-4 py-4"><ConsultationStatusBadge status={item.status} /></td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">{formatDateTime(item.createdAt)}</td>
                  <td className="px-4 py-4 text-right"><button type="button" onClick={() => setSelectedId(item.id)} className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 hover:border-[#d40000] hover:text-[#d40000]">Xem chi tiết</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        {consultations.data && consultations.data.totalElements > 0 && (
          <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500">
              <span>Trang {consultations.data.number + 1} / {Math.max(consultations.data.totalPages, 1)} · {consultations.data.totalElements} yêu cầu</span>
              <label className="flex items-center gap-2">Hiển thị
                <select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))} className="rounded-md border border-gray-300 px-2 py-1.5 text-xs text-gray-700">
                  <option value="10">10</option><option value="20">20</option><option value="50">50</option>
                </select>
              </label>
            </div>
            <div className="flex gap-2"><button type="button" disabled={consultations.data.first} onClick={() => setPage(uiPage - 1)} className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-bold disabled:opacity-40">Trước</button><button type="button" disabled={consultations.data.last} onClick={() => setPage(uiPage + 1)} className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-bold disabled:opacity-40">Sau</button></div>
          </div>
        )}
      </div>

      <ConsultationDetailModal id={selectedId} onClose={() => setSelectedId(undefined)} />
    </section>
  );
}

function FilterInput({ label, value, onChange, type = 'text', placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string }) {
  return <label><span className="mb-1.5 block text-xs font-bold text-gray-600">{label}</span><input type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10" /></label>;
}

function FilterSelect({ label, value, onChange, disabled = false, children }: { label: string; value: string; onChange: (value: string) => void; disabled?: boolean; children: React.ReactNode }) {
  return <label><span className="mb-1.5 block text-xs font-bold text-gray-600">{label}</span><select value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm disabled:bg-gray-100">{children}</select></label>;
}

function RequestState({ text, action, onAction, error = false }: { text: string; action?: string; onAction?: () => void; error?: boolean }) {
  return <div className="px-6 py-16 text-center"><p className={`text-sm font-bold ${error ? 'text-red-600' : 'text-gray-500'}`}>{text}</p>{action && <button type="button" onClick={onAction} className="mt-4 rounded-lg bg-[#d40000] px-4 py-2 text-xs font-bold text-white">{action}</button>}</div>;
}

function ConsultationDetailModal({ id, onClose }: { id?: string; onClose: () => void }) {
  const detail = useAdminConsultation(id);
  const updateStatus = useUpdateConsultationStatus();
  const { showToast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<ConsultationStatus>('NEW');
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (detail.data) setSelectedStatus(detail.data.status);
  }, [detail.data]);

  useEffect(() => {
    if (!id) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape' && !updateStatus.isPending) onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id, onClose, updateStatus.isPending]);

  if (!id) return null;
  const unchanged = detail.data?.status === selectedStatus;

  const confirmStatusUpdate = () => {
    if (!detail.data || unchanged || updateStatus.isPending) return;
    updateStatus.mutate({ id: detail.data.id, request: { status: selectedStatus } }, {
      onSuccess: () => {
        showToast('Cập nhật trạng thái yêu cầu tư vấn thành công.');
        setConfirmOpen(false);
      },
      onError: (error) => showToast(getVietnameseApiError(error, 'Không thể cập nhật trạng thái yêu cầu tư vấn.'), 'error'),
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-gray-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="consultation-detail-title" onMouseDown={(event) => { if (event.target === event.currentTarget && !updateStatus.isPending) onClose(); }}>
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-6">
          <div><p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Chi tiết yêu cầu</p><h2 id="consultation-detail-title" className="mt-1 text-xl font-black text-gray-900">Yêu cầu tư vấn</h2></div>
          <button type="button" disabled={updateStatus.isPending} onClick={onClose} aria-label="Đóng" className="rounded-lg px-3 py-2 text-xl font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-50">×</button>
        </div>
        {detail.isPending && <RequestState text="Đang tải chi tiết yêu cầu..." />}
        {detail.isError && <RequestState text={getApiStatus(detail.error) === 404 ? 'Không tìm thấy yêu cầu tư vấn này.' : getVietnameseApiError(detail.error, 'Không thể tải chi tiết yêu cầu tư vấn.')} action="Thử lại" onAction={() => void detail.refetch()} error />}
        {detail.data && (
          <div className="space-y-6 p-5 sm:p-6">
            <dl className="grid gap-5 sm:grid-cols-2">
              <DetailField label="Mã yêu cầu"><span className="break-all font-mono text-xs">{detail.data.id}</span></DetailField>
              <DetailField label="Khách hàng">{detail.data.customerName}</DetailField>
              <DetailField label="Số điện thoại"><a className="text-blue-700 hover:underline" href={`tel:${detail.data.phone}`}>{detail.data.phone}</a></DetailField>
              <DetailField label="Email">{detail.data.email ? <a className="break-all text-blue-700 hover:underline" href={`mailto:${detail.data.email}`}>{detail.data.email}</a> : 'Không cung cấp'}</DetailField>
              <DetailField label="Dịch vụ">{detail.data.serviceTitleSnapshot ?? 'Không xác định'}</DetailField>
              <DetailField label="Mã dịch vụ">{detail.data.serviceId ? <span className="break-all font-mono text-xs">{detail.data.serviceId}</span> : 'Không xác định'}</DetailField>
              <DetailField label="Trạng thái"><ConsultationStatusBadge status={detail.data.status} /></DetailField>
              <DetailField label="Thời gian gửi">{formatDateTime(detail.data.createdAt)}</DetailField>
              <DetailField label="Cập nhật lần cuối">{formatDateTime(detail.data.updatedAt)}</DetailField>
            </dl>
            <div><p className="text-xs font-bold uppercase tracking-wide text-gray-500">Nội dung</p><p className="mt-2 whitespace-pre-wrap rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700">{detail.data.message?.trim() || 'Không có nội dung'}</p></div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <label className="block text-xs font-bold text-gray-600">Cập nhật trạng thái
                <select value={selectedStatus} disabled={updateStatus.isPending} onChange={(event) => setSelectedStatus(event.target.value as ConsultationStatus)} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm disabled:opacity-60">
                  {statuses.map((status) => <option key={status} value={status}>{consultationStatusLabels[status]}</option>)}
                </select>
              </label>
              <button type="button" disabled={unchanged || updateStatus.isPending} onClick={() => setConfirmOpen(true)} className="mt-3 rounded-lg bg-[#d40000] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-40">{updateStatus.isPending ? 'Đang cập nhật...' : 'Cập nhật trạng thái'}</button>
            </div>
          </div>
        )}
      </div>
      <ConfirmDialog open={confirmOpen} title="Xác nhận thay đổi trạng thái" confirmLabel="Cập nhật trạng thái" pending={updateStatus.isPending} onCancel={() => setConfirmOpen(false)} onConfirm={confirmStatusUpdate}>
        Chuyển trạng thái từ <strong>{getConsultationStatusLabel(detail.data?.status ?? '')}</strong> sang <strong>{getConsultationStatusLabel(selectedStatus)}</strong>?
      </ConfirmDialog>
    </div>
  );
}

function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><dt className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</dt><dd className="mt-1.5 text-sm font-semibold text-gray-800">{children}</dd></div>;
}
