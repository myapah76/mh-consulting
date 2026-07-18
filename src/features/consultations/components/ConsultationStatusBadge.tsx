import type { ConsultationStatus } from '../types/consultation.types';

export const consultationStatusLabels: Record<ConsultationStatus, string> = {
  NEW: 'Mới',
  CONTACTED: 'Đã liên hệ',
  COMPLETED: 'Hoàn thành',
  CANCELLED: 'Đã hủy',
};

const consultationStatusClasses: Record<ConsultationStatus, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-amber-100 text-amber-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-200 text-gray-700',
};

export function getConsultationStatusLabel(status: string): string {
  return consultationStatusLabels[status as ConsultationStatus] ?? status ?? 'Không xác định';
}

export default function ConsultationStatusBadge({ status }: { status: string }) {
  const classes = consultationStatusClasses[status as ConsultationStatus] ?? 'bg-gray-100 text-gray-700';
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${classes}`}>{getConsultationStatusLabel(status)}</span>;
}
