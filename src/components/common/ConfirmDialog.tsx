import type { ReactNode } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  pending?: boolean;
  destructive?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({ open, title, children, confirmLabel, pending = false, destructive = false, onCancel, onConfirm }: ConfirmDialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-gray-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 id="confirm-title" className="text-lg font-black text-gray-900">{title}</h2>
        <div className="mt-3 text-sm leading-6 text-gray-600">{children}</div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" disabled={pending} onClick={onCancel} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-bold text-gray-700 disabled:opacity-50">Hủy</button>
          <button type="button" disabled={pending} onClick={onConfirm} className={`rounded-lg px-4 py-2 text-sm font-bold text-white disabled:opacity-50 ${destructive ? 'bg-red-600 hover:bg-red-700' : 'bg-[#d40000] hover:bg-gray-900'}`}>
            {pending ? 'Đang xử lý...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
