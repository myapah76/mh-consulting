import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { usePublicServiceCategories } from '../../hooks/usePublicServiceCategories';
import type { AdminService, ServiceUpsertRequest } from '../../types';
import LucideIcon, { supportedIconNames } from '../common/LucideIcon';

interface FormValues {
  slug: string;
  title: string;
  categoryId: string;
  shortDesc: string;
  icon: string;
  fullContent: string;
  active: boolean;
  displayOrder: string;
  detailedPoints: string[];
  benefits: string[];
  processSteps: string[];
}

interface ServiceFormProps {
  initialService?: AdminService;
  backendErrors?: Record<string, string>;
  formError?: string;
  pending: boolean;
  cancelTo: string;
  onSubmit: (request: ServiceUpsertRequest) => void;
}

const emptyValues: FormValues = { slug: '', title: '', categoryId: '', shortDesc: '', icon: '', fullContent: '', active: true, displayOrder: '0', detailedPoints: [], benefits: [], processSteps: [] };
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const htmlPattern = /<[^>]+>/;

export default function ServiceForm({ initialService, backendErrors = {}, formError, pending, cancelTo, onSubmit }: ServiceFormProps) {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const categories = usePublicServiceCategories();

  useEffect(() => {
    if (!initialService) return;
    setValues({ slug: initialService.slug, title: initialService.title, categoryId: initialService.categoryId, shortDesc: initialService.shortDesc, icon: initialService.icon ?? '', fullContent: initialService.fullContent ?? '', active: initialService.active, displayOrder: String(initialService.displayOrder), detailedPoints: [...initialService.detailedPoints], benefits: [...initialService.benefits], processSteps: [...initialService.processSteps] });
  }, [initialService]);

  const errors = { ...backendErrors, ...clientErrors };
  const setField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setClientErrors((current) => { const next = { ...current }; delete next[field]; return next; });
  };
  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.slug.trim()) next.slug = 'Vui lòng nhập slug.';
    else if (values.slug.length > 200) next.slug = 'Slug không được vượt quá 200 ký tự.';
    else if (!slugPattern.test(values.slug)) next.slug = 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang.';
    if (!values.title.trim()) next.title = 'Vui lòng nhập tên dịch vụ.';
    else if (values.title.length > 200) next.title = 'Tên dịch vụ không được vượt quá 200 ký tự.';
    else if (htmlPattern.test(values.title)) next.title = 'Tên dịch vụ không được chứa thẻ HTML.';
    if (!values.categoryId) next.categoryId = 'Vui lòng chọn danh mục.';
    if (!values.shortDesc.trim()) next.shortDesc = 'Vui lòng nhập mô tả ngắn.';
    else if (values.shortDesc.length > 1000) next.shortDesc = 'Mô tả ngắn không được vượt quá 1.000 ký tự.';
    else if (htmlPattern.test(values.shortDesc)) next.shortDesc = 'Mô tả ngắn không được chứa thẻ HTML.';
    if (values.icon.length > 100) next.icon = 'Tên biểu tượng không được vượt quá 100 ký tự.';
    if (values.fullContent.length > 20000) next.fullContent = 'Nội dung không được vượt quá 20.000 ký tự.';
    else if (htmlPattern.test(values.fullContent)) next.fullContent = 'Nội dung không được chứa thẻ HTML.';
    const order = Number(values.displayOrder);
    if (!Number.isInteger(order) || order < 0) next.displayOrder = 'Thứ tự hiển thị phải là số nguyên không âm.';
    (['detailedPoints', 'benefits', 'processSteps'] as const).forEach((field) => {
      const nonBlank = values[field].filter((item) => item.trim());
      if (nonBlank.length > 100) next[field] = 'Danh sách không được vượt quá 100 mục.';
      else if (nonBlank.some((item) => item.length > 2000)) next[field] = 'Mỗi mục không được vượt quá 2.000 ký tự.';
      else if (nonBlank.some((item) => htmlPattern.test(item))) next[field] = 'Các mục không được chứa thẻ HTML.';
    });
    setClientErrors(next);
    return Object.keys(next).length === 0;
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    const clean = (items: string[]) => items.map((item) => item.trim()).filter(Boolean);
    onSubmit({ slug: values.slug.trim(), title: values.title.trim(), categoryId: values.categoryId, shortDesc: values.shortDesc.trim(), icon: values.icon || null, fullContent: values.fullContent.trim() || null, active: values.active, displayOrder: Number(values.displayOrder), detailedPoints: clean(values.detailedPoints), benefits: clean(values.benefits), processSteps: clean(values.processSteps) });
  };

  const inputClass = 'w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10 disabled:bg-gray-100';
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {(formError || categories.isError) && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{formError ?? 'Không thể tải danh mục dịch vụ. Vui lòng thử lại.'}</div>}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-black">Thông tin cơ bản</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field label="Slug" required error={errors.slug}><input value={values.slug} onChange={(event) => setField('slug', event.target.value)} maxLength={200} disabled={pending} className={inputClass} placeholder="vi-du-dich-vu" /></Field>
          <Field label="Tên dịch vụ" required error={errors.title}><input value={values.title} onChange={(event) => setField('title', event.target.value)} maxLength={200} disabled={pending} className={inputClass} /></Field>
          <Field label="Danh mục" required error={errors.categoryId ?? errors.category}><select value={values.categoryId} onChange={(event) => setField('categoryId', event.target.value)} disabled={pending || categories.isPending} className={inputClass}><option value="">{categories.isPending ? 'Đang tải danh mục...' : 'Chọn danh mục'}</option>{categories.data?.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></Field>
          <Field label="Thứ tự hiển thị" error={errors.displayOrder}><input type="number" min="0" step="1" value={values.displayOrder} onChange={(event) => setField('displayOrder', event.target.value)} disabled={pending} className={inputClass} /></Field>
          <div className="md:col-span-2"><Field label="Mô tả ngắn" required error={errors.shortDesc}><textarea value={values.shortDesc} onChange={(event) => setField('shortDesc', event.target.value)} maxLength={1000} rows={4} disabled={pending} className={inputClass} /><CharacterCount value={values.shortDesc} max={1000} /></Field></div>
          <Field label="Biểu tượng" error={errors.icon}><div className="flex gap-3"><select value={values.icon} onChange={(event) => setField('icon', event.target.value)} disabled={pending} className={inputClass}><option value="">Mặc định (Briefcase)</option>{values.icon && !supportedIconNames.includes(values.icon as (typeof supportedIconNames)[number]) && <option value={values.icon}>{values.icon} (không hỗ trợ, dùng biểu tượng mặc định)</option>}{supportedIconNames.map((name) => <option key={name} value={name}>{name}</option>)}</select><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#d40000]/10 text-[#d40000]" title="Xem trước biểu tượng"><LucideIcon name={values.icon || 'Briefcase'} size={22} /></span></div></Field>
          <label className="flex items-center gap-3 self-end rounded-lg bg-gray-50 px-4 py-3 text-sm font-bold"><input type="checkbox" checked={values.active} onChange={(event) => setField('active', event.target.checked)} disabled={pending} className="h-4 w-4 accent-[#d40000]" /> Đang hoạt động</label>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"><h2 className="text-base font-black">Nội dung chi tiết</h2><div className="mt-5"><Field label="Nội dung đầy đủ (văn bản hoặc Markdown)" error={errors.fullContent}><textarea value={values.fullContent} onChange={(event) => setField('fullContent', event.target.value)} maxLength={20000} rows={10} disabled={pending} className={inputClass} /><CharacterCount value={values.fullContent} max={20000} /></Field></div></div>

      <ListEditor title="Các điểm chi tiết" items={values.detailedPoints} error={findListError(errors, 'detailedPoints')} pending={pending} onChange={(items) => setField('detailedPoints', items)} />
      <ListEditor title="Lợi ích" items={values.benefits} error={findListError(errors, 'benefits')} pending={pending} onChange={(items) => setField('benefits', items)} />
      <ListEditor title="Các bước thực hiện" items={values.processSteps} error={findListError(errors, 'processSteps')} pending={pending} onChange={(items) => setField('processSteps', items)} />

      <div className="sticky bottom-0 z-10 flex justify-end gap-3 rounded-xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur"><Link to={cancelTo} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700">Hủy</Link><button type="submit" disabled={pending || categories.isPending || categories.isError} className="rounded-lg bg-[#d40000] px-6 py-2.5 text-sm font-black text-white hover:bg-gray-900 disabled:opacity-50">{pending ? 'Đang lưu...' : 'Lưu dịch vụ'}</button></div>
    </form>
  );
}

function Field({ label, required = false, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-bold text-gray-700">{label}{required && <span className="text-[#d40000]"> *</span>}</span>{children}{error && <span className="mt-1.5 block text-xs font-semibold text-red-600">{error}</span>}</label>;
}
function CharacterCount({ value, max }: { value: string; max: number }) { return <span className="mt-1 block text-right text-[11px] text-gray-400">{value.length.toLocaleString('vi-VN')} / {max.toLocaleString('vi-VN')}</span>; }
function findListError(errors: Record<string, string>, field: string) { return Object.entries(errors).find(([key]) => key === field || key.startsWith(`${field}[`))?.[1]; }

function ListEditor({ title, items, error, pending, onChange }: { title: string; items: string[]; error?: string; pending: boolean; onChange: (items: string[]) => void }) {
  const update = (index: number, value: string) => onChange(items.map((item, itemIndex) => itemIndex === index ? value : item));
  const remove = (index: number) => onChange(items.filter((_, itemIndex) => itemIndex !== index));
  const move = (index: number, offset: number) => { const target = index + offset; if (target < 0 || target >= items.length) return; const next = [...items]; [next[index], next[target]] = [next[target], next[index]]; onChange(next); };
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-center justify-between"><div><h2 className="text-base font-black">{title}</h2><p className="mt-1 text-xs text-gray-500">Tối đa 100 mục, mỗi mục 2.000 ký tự.</p></div><button type="button" disabled={pending || items.length >= 100} onClick={() => onChange([...items, ''])} className="rounded-lg border border-[#d40000] px-3 py-2 text-xs font-black text-[#d40000] disabled:opacity-50">+ Thêm mục</button></div>{error && <p className="mt-3 text-xs font-semibold text-red-600">{error}</p>}<div className="mt-4 space-y-3">{items.length === 0 && <p className="rounded-lg bg-gray-50 px-4 py-5 text-center text-xs text-gray-500">Chưa có mục nào.</p>}{items.map((item, index) => <div key={index} className="flex items-start gap-2"><span className="mt-3 w-6 shrink-0 text-center text-xs font-bold text-gray-400">{index + 1}</span><textarea value={item} onChange={(event) => update(index, event.target.value)} maxLength={2000} rows={2} disabled={pending} className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#d40000]" /><div className="grid shrink-0 grid-cols-2 gap-1"><button type="button" disabled={pending || index === 0} onClick={() => move(index, -1)} className="rounded border border-gray-200 px-2 py-1 text-xs disabled:opacity-30" aria-label="Di chuyển lên">↑</button><button type="button" disabled={pending || index === items.length - 1} onClick={() => move(index, 1)} className="rounded border border-gray-200 px-2 py-1 text-xs disabled:opacity-30" aria-label="Di chuyển xuống">↓</button><button type="button" disabled={pending} onClick={() => remove(index)} className="col-span-2 rounded border border-red-200 px-2 py-1 text-xs font-bold text-red-600 disabled:opacity-30">Xóa</button></div></div>)}</div></div>
  );
}
