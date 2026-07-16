import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import type { AdminServiceCategoryResponse, ServiceCategoryUpsertRequest } from '../../types';

interface CategoryFormProps {
  initialCategory?: AdminServiceCategoryResponse;
  backendErrors?: Record<string, string>;
  formError?: string;
  pending: boolean;
  cancelTo: string;
  onSubmit: (request: ServiceCategoryUpsertRequest) => void;
}

interface CategoryFormValues {
  name: string;
  slug: string;
  active: boolean;
}

const emptyValues: CategoryFormValues = { name: '', slug: '', active: true };
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export default function CategoryForm({ initialCategory, backendErrors = {}, formError, pending, cancelTo, onSubmit }: CategoryFormProps) {
  const [values, setValues] = useState(emptyValues);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!initialCategory) return;
    setValues({ name: initialCategory.name, slug: initialCategory.slug, active: initialCategory.active });
  }, [initialCategory]);

  const errors = { ...backendErrors, ...clientErrors };
  const setField = <K extends keyof CategoryFormValues>(field: K, value: CategoryFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setClientErrors((current) => { const next = { ...current }; delete next[field]; return next; });
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!values.name.trim()) nextErrors.name = 'Vui lòng nhập tên danh mục.';
    else if (values.name.length > 200) nextErrors.name = 'Tên danh mục không được vượt quá 200 ký tự.';
    if (!values.slug.trim()) nextErrors.slug = 'Vui lòng nhập slug.';
    else if (values.slug.length > 200) nextErrors.slug = 'Slug không được vượt quá 200 ký tự.';
    else if (!slugPattern.test(values.slug)) nextErrors.slug = 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang.';
    setClientErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onSubmit({ name: values.name.trim(), slug: values.slug.trim(), active: values.active });
  };
  const inputClass = 'w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10 disabled:bg-gray-100';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {formError && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{formError}</div>}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-black">Thông tin danh mục</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field label="Tên danh mục" required error={errors.name}><input value={values.name} onChange={(event) => setField('name', event.target.value)} maxLength={200} disabled={pending} className={inputClass} /></Field>
          <Field label="Slug" required error={errors.slug}><input value={values.slug} onChange={(event) => setField('slug', event.target.value)} maxLength={200} disabled={pending} className={inputClass} placeholder="vi-du-danh-muc" /></Field>
          <label className="flex items-center gap-3 self-end rounded-lg bg-gray-50 px-4 py-3 text-sm font-bold"><input type="checkbox" checked={values.active} onChange={(event) => setField('active', event.target.checked)} disabled={pending} className="h-4 w-4 accent-[#d40000]" /> Trạng thái hoạt động</label>
        </div>
      </div>
      <div className="sticky bottom-0 z-10 flex justify-end gap-3 rounded-xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur"><Link to={cancelTo} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700">Hủy</Link><button type="submit" disabled={pending} className="rounded-lg bg-[#d40000] px-6 py-2.5 text-sm font-black text-white hover:bg-gray-900 disabled:opacity-50">{pending ? 'Đang lưu...' : 'Lưu danh mục'}</button></div>
    </form>
  );
}

function Field({ label, required = false, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-bold text-gray-700">{label}{required && <span className="text-[#d40000]"> *</span>}</span>{children}{error && <span className="mt-1.5 block text-xs font-semibold text-red-600">{error}</span>}</label>;
}
