import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../components/common/ToastProvider';
import { getApiError, getVietnameseApiError } from '../../../utils/apiError';
import ServiceForm from '../components/ServiceForm';
import { useCreateService } from '../hooks/useAdminServices';
import type { ServiceUpsertRequest } from '../types/service.types';

export default function AdminServiceCreate() {
  const create = useCreateService();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const apiError = getApiError(create.error);

  const submit = (request: ServiceUpsertRequest) => create.mutate(request, {
    onSuccess: () => { showToast('Dịch vụ đã được tạo thành công.'); navigate('/admin/services'); },
  });

  return (
    <section className="mx-auto max-w-5xl"><div className="mb-6"><p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Quản lý dịch vụ</p><h1 className="mt-1 text-2xl font-black">Thêm Dịch Vụ</h1></div><ServiceForm pending={create.isPending} backendErrors={apiError?.fieldErrors} formError={create.isError ? getVietnameseApiError(create.error, 'Không thể tạo dịch vụ. Vui lòng thử lại.') : undefined} cancelTo="/admin/services" onSubmit={submit} /></section>
  );
}
