import { useNavigate } from 'react-router-dom';
import CategoryForm from '../../components/admin/CategoryForm';
import { useToast } from '../../components/common/ToastProvider';
import { useCreateCategory } from '../../hooks/useAdminCategories';
import type { ServiceCategoryUpsertRequest } from '../../types';
import { getApiError, getVietnameseApiError } from '../../utils/apiError';

export default function AdminCategoryCreate() {
  const create = useCreateCategory();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const apiError = getApiError(create.error);
  const submit = (request: ServiceCategoryUpsertRequest) => create.mutate(request, { onSuccess: () => { showToast('Danh mục đã được tạo thành công.'); navigate('/admin/categories'); } });
  return <section className="mx-auto max-w-4xl"><div className="mb-6"><p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Quản lý danh mục</p><h1 className="mt-1 text-2xl font-black">Thêm Danh Mục</h1></div><CategoryForm pending={create.isPending} backendErrors={apiError?.fieldErrors} formError={create.isError ? getVietnameseApiError(create.error, 'Không thể tạo danh mục. Vui lòng thử lại.') : undefined} cancelTo="/admin/categories" onSubmit={submit} /></section>;
}
