import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useToast } from '../../components/common/ToastProvider';
import { useAdminCategories, useDeleteCategory, useUpdateCategoryActive } from '../../hooks/useAdminCategories';
import type { AdminServiceCategoryResponse } from '../../types';
import { getVietnameseApiError } from '../../utils/apiError';

type PendingAction = { type: 'active' | 'delete'; category: AdminServiceCategoryResponse } | null;

export default function AdminCategories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const activeValue = searchParams.get('active') ?? 'all';
  const parsedPage = Number(searchParams.get('page') ?? '1');
  const uiPage = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const params = useMemo(() => ({
    ...(activeValue === 'true' || activeValue === 'false' ? { active: activeValue === 'true' } : {}),
    page: uiPage - 1,
    size: 20,
  }), [activeValue, uiPage]);
  const categories = useAdminCategories(params);
  const activeMutation = useUpdateCategoryActive();
  const deleteMutation = useDeleteCategory();
  const { showToast } = useToast();
  const mutationPending = activeMutation.isPending || deleteMutation.isPending;

  const setActiveFilter = (value: string) => {
    const next = new URLSearchParams(searchParams);
    value === 'all' ? next.delete('active') : next.set('active', value);
    next.set('page', '1');
    setSearchParams(next);
  };
  const setPage = (page: number) => { const next = new URLSearchParams(searchParams); next.set('page', String(page)); setSearchParams(next); };
  const confirmAction = () => {
    if (!pendingAction) return;
    if (pendingAction.type === 'active') {
      const { category } = pendingAction;
      activeMutation.mutate({ id: category.id, request: { active: !category.active } }, {
        onSuccess: () => { showToast(category.active ? 'Danh mục đã được chuyển sang trạng thái không hoạt động.' : 'Danh mục đã được kích hoạt.'); setPendingAction(null); },
        onError: (error) => showToast(getVietnameseApiError(error, 'Không thể cập nhật trạng thái danh mục.'), 'error'),
      });
    } else {
      deleteMutation.mutate(pendingAction.category.id, {
        onSuccess: (result) => { showToast(result.deleted ? 'Danh mục đã được xóa thành công.' : 'Danh mục đang được sử dụng nên đã được chuyển sang trạng thái không hoạt động.'); setPendingAction(null); },
        onError: (error) => showToast(getVietnameseApiError(error, 'Không thể xóa danh mục.'), 'error'),
      });
    }
  };

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Quản trị nội dung</p><h1 className="mt-1 text-2xl font-black sm:text-3xl">Quản Lý Danh Mục</h1></div><Link to="/admin/categories/new" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d40000] px-5 py-3 text-sm font-black text-white shadow transition hover:bg-gray-900"><span className="text-lg leading-none">+</span> Thêm Danh Mục</Link></div>
      <div className="mt-6 max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"><label><span className="mb-1.5 block text-xs font-bold text-gray-600">Trạng thái</span><select value={activeValue} onChange={(event) => setActiveFilter(event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"><option value="all">Tất cả</option><option value="true">Đang hoạt động</option><option value="false">Không hoạt động</option></select></label></div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {categories.isPending && <RequestState text="Đang tải danh sách danh mục..." />}
        {categories.isError && <RequestState text="Không thể tải danh sách danh mục." action="Thử lại" onAction={() => void categories.refetch()} error />}
        {!categories.isPending && !categories.isError && categories.data?.content.length === 0 && <RequestState text="Chưa có danh mục phù hợp với bộ lọc." />}
        {categories.data && categories.data.content.length > 0 && <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-5 py-4">Tên danh mục</th><th className="px-5 py-4">Slug</th><th className="px-5 py-4">Trạng thái</th><th className="px-5 py-4 text-right">Thao tác</th></tr></thead><tbody className="divide-y divide-gray-100">{categories.data.content.map((category) => <tr key={category.id} className="hover:bg-gray-50/70"><td className="px-5 py-4 font-bold text-gray-900">{category.name}</td><td className="px-5 py-4 font-mono text-xs text-gray-500">{category.slug}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${category.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{category.active ? 'Đang hoạt động' : 'Không hoạt động'}</span></td><td className="px-5 py-4"><div className="flex justify-end gap-2"><Link to={`/admin/categories/${category.id}/edit${searchParams.toString() ? `?return=${encodeURIComponent(searchParams.toString())}` : ''}`} className="rounded-md border border-gray-200 px-2.5 py-1.5 text-xs font-bold text-gray-600 hover:text-[#d40000]">Sửa</Link><button type="button" disabled={mutationPending} onClick={() => setPendingAction({ type: 'active', category })} className="rounded-md border border-gray-200 px-2.5 py-1.5 text-xs font-bold text-gray-600 hover:text-[#d40000] disabled:opacity-50">{category.active ? 'Ẩn' : 'Kích hoạt'}</button><button type="button" disabled={mutationPending} onClick={() => setPendingAction({ type: 'delete', category })} className="rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-50">Xóa</button></div></td></tr>)}</tbody></table></div>}
        {categories.data && categories.data.totalPages > 1 && <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4"><p className="text-xs font-semibold text-gray-500">Trang {categories.data.number + 1} / {categories.data.totalPages} · {categories.data.totalElements} danh mục</p><div className="flex gap-2"><button type="button" disabled={categories.data.first} onClick={() => setPage(uiPage - 1)} className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-bold disabled:opacity-40">Trước</button><button type="button" disabled={categories.data.last} onClick={() => setPage(uiPage + 1)} className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-bold disabled:opacity-40">Sau</button></div></div>}
      </div>
      <ConfirmDialog open={pendingAction?.type === 'active'} title="Xác nhận thay đổi trạng thái" confirmLabel={pendingAction?.category.active ? 'Ẩn danh mục' : 'Kích hoạt'} pending={mutationPending} onCancel={() => setPendingAction(null)} onConfirm={confirmAction}>{pendingAction?.category.active ? 'Bạn có chắc muốn ẩn danh mục này?' : 'Bạn có chắc muốn kích hoạt danh mục này?'}</ConfirmDialog>
      <ConfirmDialog open={pendingAction?.type === 'delete'} title="Xác nhận xóa danh mục" confirmLabel="Xóa danh mục" destructive pending={mutationPending} onCancel={() => setPendingAction(null)} onConfirm={confirmAction}>Bạn có chắc muốn xóa danh mục này? Nếu danh mục đang được sử dụng bởi dịch vụ, hệ thống sẽ chuyển danh mục sang trạng thái không hoạt động thay vì xóa hoàn toàn.</ConfirmDialog>
    </section>
  );
}

function RequestState({ text, action, onAction, error = false }: { text: string; action?: string; onAction?: () => void; error?: boolean }) { return <div className="px-6 py-16 text-center"><p className={`text-sm font-bold ${error ? 'text-red-600' : 'text-gray-500'}`}>{text}</p>{action && <button type="button" onClick={onAction} className="mt-4 rounded-lg bg-[#d40000] px-4 py-2 text-xs font-bold text-white">{action}</button>}</div>; }
