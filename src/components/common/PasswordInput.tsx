import { useState } from 'react';

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: 'current-password' | 'new-password';
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
  invalid?: boolean;
  ariaDescribedBy?: string;
}

export default function PasswordInput({ id, value, onChange, autoComplete, disabled = false, maxLength = 200, placeholder, invalid = false, ariaDescribedBy }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input id={id} type={visible ? 'text' : 'password'} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} maxLength={maxLength} placeholder={placeholder} disabled={disabled} aria-invalid={invalid} aria-describedby={ariaDescribedBy} className="w-full rounded-lg border border-gray-300 py-2.5 pl-3.5 pr-16 text-sm outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10 disabled:bg-gray-100" />
      <button type="button" onClick={() => setVisible((current) => !current)} disabled={disabled} className="absolute inset-y-0 right-0 px-3 text-xs font-bold text-gray-500 hover:text-[#d40000] disabled:opacity-50" aria-label={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>{visible ? 'Ẩn' : 'Hiện'}</button>
    </div>
  );
}
