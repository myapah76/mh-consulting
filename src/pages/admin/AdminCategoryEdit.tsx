import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import CategoryForm from '../../components/admin/CategoryForm';
import { useToast } from '../../components/common/ToastProvider';
import { useAdminCategory, useUpdateCategory } from '../../hooks/useAdminCategories';
import type { ServiceCategoryUpsertRequest } from '../../types';
import { getApiError, getVietnameseApiError } from '../../utils/apiError';

export default function AdminCategoryEdit() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const returnQuery = searchParams.get('return');
  const listPath = returnQuery ? `/admin/categories?${returnQuery}` : '/admin/categories';
  const category = useAdminCategory(id);
  const update = useUpdateCategory();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const apiError = getApiError(update.error);
  if (!id) return <PageError message="Mã danh mục không hợp lệ." listPath={listPath} />;
  if (category.isPending) return <div className="py-20 text-center text-sm font-bold text-gray-500">Đang tải thông tin danh mục...</div>;
  if (category.isError || !category.data) return <PageError message={getVietnameseApiError(category.error, 'Không thể tải thông tin danh mục.')} listPath={listPath} onRetry={() => void category.refetch()} />;
  const submit = (request: ServiceCategoryUpsertRequest) => update.mutate({ id, request }, { onSuccess: () => { showToast('Danh mục đã được cập nhật thành công.'); navigate(listPath); } });
  return <section className="mx-auto max-w-4xl"><div className="mb-6"><p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Quản lý danh mục</p><h1 className="mt-1 text-2xl font-black">Chỉnh Sửa Danh Mục</h1><p className="mt-1 text-sm text-gray-500">{category.data.name}</p></div><CategoryForm initialCategory={category.data} pending={update.isPending} backendErrors={apiError?.fieldErrors} formError={update.isError ? getVietnameseApiError(update.error, 'Không thể cập nhật danh mục. Vui lòng thử lại.') : undefined} cancelTo={listPath} onSubmit={submit} /></section>;
}

function PageError({ message, listPath, onRetry }: { message: string; listPath: string; onRetry?: () => void }) { return <div className="rounded-2xl border border-red-200 bg-white px-6 py-16 text-center"><h1 className="text-lg font-black text-gray-900">Không thể mở danh mục</h1><p className="mt-2 text-sm text-red-600">{message}</p><div className="mt-5 flex justify-center gap-3">{onRetry && <button type="button" onClick={onRetry} className="rounded-lg bg-[#d40000] px-4 py-2 text-sm font-bold text-white">Thử lại</button>}<Link to={listPath} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-bold">Quay lại danh sách</Link></div></div>; }
