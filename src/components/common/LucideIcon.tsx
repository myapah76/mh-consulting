import {
  Briefcase, 
  Edit3, 
  UserCheck, 
  Calculator, 
  FileText, 
  BarChart2, 
  ShieldAlert, 
  Percent, 
  HeartHandshake, 
  UserX,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Check,
  Quote,
  Calendar,
  MessageCircle,
  ArrowUp
} from 'lucide-react';

const iconMap = {
  Briefcase,
  Edit3,
  UserCheck,
  Calculator,
  FileText,
  BarChart2,
  ShieldAlert,
  Percent,
  HeartHandshake,
  UserX,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Check,
  Quote,
  Calendar,
  MessageCircle,
  ArrowUp
};

export type IconName = keyof typeof iconMap;
export const supportedIconNames = Object.keys(iconMap) as IconName[];

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = '', size }: LucideIconProps) {
  const IconComponent = iconMap[name as IconName] || Briefcase;
  return <IconComponent className={className} size={size} />;
}
