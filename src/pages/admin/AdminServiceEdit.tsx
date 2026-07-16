import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ServiceForm from '../../components/admin/ServiceForm';
import { useToast } from '../../components/common/ToastProvider';
import { useAdminService, useUpdateService } from '../../hooks/useAdminServices';
import type { ServiceUpsertRequest } from '../../types';
import { getApiError, getVietnameseApiError } from '../../utils/apiError';

export default function AdminServiceEdit() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const returnQuery = searchParams.get('return');
  const listPath = returnQuery ? `/admin/services?${returnQuery}` : '/admin/services';
  const service = useAdminService(id);
  const update = useUpdateService();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const apiError = getApiError(update.error);

  if (!id) return <PageError message="Mã dịch vụ không hợp lệ." listPath={listPath} />;
  if (service.isPending) return <div className="py-20 text-center text-sm font-bold text-gray-500">Đang tải thông tin dịch vụ...</div>;
  if (service.isError || !service.data) return <PageError message={getVietnameseApiError(service.error, 'Không thể tải thông tin dịch vụ.')} listPath={listPath} onRetry={() => void service.refetch()} />;

  const submit = (request: ServiceUpsertRequest) => update.mutate({ id, request }, {
    onSuccess: () => { showToast('Dịch vụ đã được cập nhật thành công.'); navigate(listPath); },
  });

  return (
    <section className="mx-auto max-w-5xl"><div className="mb-6"><p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Quản lý dịch vụ</p><h1 className="mt-1 text-2xl font-black">Chỉnh Sửa Dịch Vụ</h1><p className="mt-1 text-sm text-gray-500">{service.data.title}</p></div><ServiceForm initialService={service.data} pending={update.isPending} backendErrors={apiError?.fieldErrors} formError={update.isError ? getVietnameseApiError(update.error, 'Không thể cập nhật dịch vụ. Vui lòng thử lại.') : undefined} cancelTo={listPath} onSubmit={submit} /></section>
  );
}

function PageError({ message, listPath, onRetry }: { message: string; listPath: string; onRetry?: () => void }) {
  return <div className="rounded-2xl border border-red-200 bg-white px-6 py-16 text-center"><h1 className="text-lg font-black text-gray-900">Không thể mở dịch vụ</h1><p className="mt-2 text-sm text-red-600">{message}</p><div className="mt-5 flex justify-center gap-3">{onRetry && <button type="button" onClick={onRetry} className="rounded-lg bg-[#d40000] px-4 py-2 text-sm font-bold text-white">Thử lại</button>}<Link to={listPath} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-bold">Quay lại danh sách</Link></div></div>;
}
