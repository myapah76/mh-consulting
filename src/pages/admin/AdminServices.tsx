import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import LucideIcon from '../../components/common/LucideIcon';
import { useToast } from '../../components/common/ToastProvider';
import { useAdminServices, useDeleteService, useUpdateServiceActive } from '../../hooks/useAdminServices';
import { usePublicServiceCategories } from '../../hooks/usePublicServiceCategories';
import type { AdminServiceSummary } from '../../types';
import { getVietnameseApiError } from '../../utils/apiError';

type PendingAction = { type: 'active'; service: AdminServiceSummary } | { type: 'delete'; service: AdminServiceSummary } | null;

export default function AdminServices() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const category = searchParams.get('category') ?? '';
  const activeValue = searchParams.get('active') ?? 'all';
  const sort = searchParams.get('sort') ?? 'displayOrder,asc';
  const parsedPage = Number(searchParams.get('page') ?? '1');
  const uiPage = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const params = useMemo(() => ({
    ...(category ? { category } : {}),
    ...(activeValue === 'true' || activeValue === 'false' ? { active: activeValue === 'true' } : {}),
    page: uiPage - 1,
    size: 20,
    sort,
  }), [activeValue, category, sort, uiPage]);
  const services = useAdminServices(params);
  const categories = usePublicServiceCategories();
  const activeMutation = useUpdateServiceActive();
  const deleteMutation = useDeleteService();
  const { showToast } = useToast();

  const setFilter = (name: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    value ? next.set(name, value) : next.delete(name);
    next.set('page', '1');
    setSearchParams(next);
  };
  const setPage = (page: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(page));
    setSearchParams(next);
  };

  const confirmAction = () => {
    if (!pendingAction) return;
    if (pendingAction.type === 'active') {
      const { service } = pendingAction;
      activeMutation.mutate({ id: service.id, request: { active: !service.active } }, {
        onSuccess: () => { showToast(service.active ? 'Dịch vụ đã được chuyển sang trạng thái không hoạt động.' : 'Dịch vụ đã được kích hoạt.'); setPendingAction(null); },
        onError: (error) => showToast(getVietnameseApiError(error, 'Không thể cập nhật trạng thái dịch vụ.'), 'error'),
      });
    } else {
      deleteMutation.mutate(pendingAction.service.id, {
        onSuccess: (result) => {
          showToast(result.deleted ? 'Dịch vụ đã được xóa thành công.' : 'Dịch vụ đang được sử dụng trong yêu cầu tư vấn nên đã được chuyển sang trạng thái không hoạt động.');
          setPendingAction(null);
        },
        onError: (error) => showToast(getVietnameseApiError(error, 'Không thể xóa dịch vụ.'), 'error'),
      });
    }
  };
  const mutationPending = activeMutation.isPending || deleteMutation.isPending;

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Quản trị nội dung</p><h1 className="mt-1 text-2xl font-black sm:text-3xl">Quản Lý Dịch Vụ</h1></div>
        <Link to="/admin/services/new" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d40000] px-5 py-3 text-sm font-black text-white shadow transition hover:bg-gray-900"><span className="text-lg leading-none">+</span> Thêm Dịch Vụ</Link>
      </div>

      <div className="mt-6 grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-3">
        <label><span className="mb-1.5 block text-xs font-bold text-gray-600">Danh mục</span><select value={category} onChange={(event) => setFilter('category', event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"><option value="">Tất cả danh mục</option>{categories.data?.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}</select></label>
        <label><span className="mb-1.5 block text-xs font-bold text-gray-600">Trạng thái</span><select value={activeValue} onChange={(event) => setFilter('active', event.target.value === 'all' ? '' : event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"><option value="all">Tất cả</option><option value="true">Đang hoạt động</option><option value="false">Không hoạt động</option></select></label>
        <label><span className="mb-1.5 block text-xs font-bold text-gray-600">Sắp xếp</span><select value={sort} onChange={(event) => setFilter('sort', event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"><option value="displayOrder,asc">Thứ tự tăng dần</option><option value="displayOrder,desc">Thứ tự giảm dần</option><option value="title,asc">Tên A–Z</option><option value="title,desc">Tên Z–A</option><option value="createdAt,desc">Mới tạo gần đây</option><option value="updatedAt,desc">Mới cập nhật gần đây</option></select></label>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {services.isPending && <RequestState text="Đang tải danh sách dịch vụ..." />}
        {services.isError && <RequestState text="Không thể tải danh sách dịch vụ." action="Thử lại" onAction={() => void services.refetch()} error />}
        {!services.isPending && !services.isError && services.data?.content.length === 0 && <RequestState text="Chưa có dịch vụ phù hợp với bộ lọc." />}
        {services.data && services.data.content.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-5 py-4">Thứ tự</th><th className="px-5 py-4">Dịch vụ</th><th className="px-5 py-4">Danh mục</th><th className="px-5 py-4">Slug</th><th className="px-5 py-4">Trạng thái</th><th className="px-5 py-4 text-right">Thao tác</th></tr></thead>
              <tbody className="divide-y divide-gray-100">{services.data.content.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50/70"><td className="px-5 py-4 font-bold text-gray-500">{service.displayOrder}</td><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#d40000]/10 text-[#d40000]"><LucideIcon name={service.icon ?? 'Briefcase'} size={18} /></span><span className="max-w-xs font-bold text-gray-900">{service.title}</span></div></td><td className="px-5 py-4 text-gray-600">{service.categoryName}</td><td className="px-5 py-4 font-mono text-xs text-gray-500">{service.slug}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${service.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{service.active ? 'Đang hoạt động' : 'Không hoạt động'}</span></td><td className="px-5 py-4"><div className="flex justify-end gap-2">{service.active && <Link to={`/dich-vu/${service.slug}`} target="_blank" className="rounded-md border border-gray-200 px-2.5 py-1.5 text-xs font-bold text-gray-600 hover:text-[#d40000]">Xem</Link>}<Link to={`/admin/services/${service.id}/edit${searchParams.toString() ? `?return=${encodeURIComponent(searchParams.toString())}` : ''}`} className="rounded-md border border-gray-200 px-2.5 py-1.5 text-xs font-bold text-gray-600 hover:text-[#d40000]">Sửa</Link><button type="button" disabled={mutationPending} onClick={() => setPendingAction({ type: 'active', service })} className="rounded-md border border-gray-200 px-2.5 py-1.5 text-xs font-bold text-gray-600 hover:text-[#d40000] disabled:opacity-50">{service.active ? 'Ẩn' : 'Kích hoạt'}</button><button type="button" disabled={mutationPending} onClick={() => setPendingAction({ type: 'delete', service })} className="rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-50">Xóa</button></div></td></tr>
              ))}</tbody>
            </table>
          </div>
        )}
        {services.data && services.data.totalPages > 1 && <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4"><p className="text-xs font-semibold text-gray-500">Trang {services.data.number + 1} / {services.data.totalPages} · {services.data.totalElements} dịch vụ</p><div className="flex gap-2"><button type="button" disabled={services.data.first} onClick={() => setPage(uiPage - 1)} className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-bold disabled:opacity-40">Trước</button><button type="button" disabled={services.data.last} onClick={() => setPage(uiPage + 1)} className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-bold disabled:opacity-40">Sau</button></div></div>}
      </div>

      <ConfirmDialog open={pendingAction?.type === 'active'} title="Xác nhận thay đổi trạng thái" confirmLabel={pendingAction?.service.active ? 'Ẩn dịch vụ' : 'Kích hoạt'} pending={mutationPending} onCancel={() => setPendingAction(null)} onConfirm={confirmAction}>
        {pendingAction?.service.active ? 'Bạn có chắc muốn ẩn dịch vụ này?' : 'Bạn có chắc muốn kích hoạt dịch vụ này?'}
      </ConfirmDialog>
      <ConfirmDialog open={pendingAction?.type === 'delete'} title="Xác nhận xóa dịch vụ" confirmLabel="Xóa dịch vụ" destructive pending={mutationPending} onCancel={() => setPendingAction(null)} onConfirm={confirmAction}>
        Bạn có chắc muốn xóa dịch vụ này? Nếu dịch vụ đã được sử dụng trong yêu cầu tư vấn, hệ thống sẽ chuyển dịch vụ sang trạng thái không hoạt động thay vì xóa hoàn toàn.
      </ConfirmDialog>
    </section>
  );
}

function RequestState({ text, action, onAction, error = false }: { text: string; action?: string; onAction?: () => void; error?: boolean }) {
  return <div className="px-6 py-16 text-center"><p className={`text-sm font-bold ${error ? 'text-red-600' : 'text-gray-500'}`}>{text}</p>{action && <button type="button" onClick={onAction} className="mt-4 rounded-lg bg-[#d40000] px-4 py-2 text-xs font-bold text-white">{action}</button>}</div>;
}
