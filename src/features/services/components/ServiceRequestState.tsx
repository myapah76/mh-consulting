import LucideIcon from '../../../components/common/LucideIcon';

interface ServiceRequestStateProps {
  title: string;
  message: string;
  loading?: boolean;
  onRetry?: () => void;
}

export default function ServiceRequestState({
  title,
  message,
  loading = false,
  onRetry,
}: ServiceRequestStateProps) {
  return (
    <div className="col-span-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-12 text-center">
      <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${loading ? 'bg-[#d40000]/10 text-[#d40000] animate-pulse' : 'bg-white text-gray-500 shadow-sm'}`}>
        <LucideIcon name={loading ? 'Clock' : 'ShieldAlert'} size={22} />
      </div>
      <h2 className="text-base font-extrabold text-gray-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-lg text-xs font-medium leading-relaxed text-gray-500">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-full bg-[#d40000] px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-gray-900"
        >
          Thử lại
        </button>
      )}
    </div>
  );
}
