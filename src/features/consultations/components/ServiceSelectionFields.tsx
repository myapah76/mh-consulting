import { usePublicServiceCategories } from '../../categories';
import { usePublicServices, type PublicServiceSummary } from '../../services';

interface ServiceSelectionFieldsProps {
  categorySlug: string;
  serviceId: string;
  onCategoryChange: (categorySlug: string) => void;
  onServiceChange: (serviceId: string) => void;
  disabled?: boolean;
  categoryError?: string;
  serviceError?: string;
  currentService?: Pick<PublicServiceSummary, 'id' | 'title' | 'category'>;
  stacked?: boolean;
}

const selectClassName =
  'w-full px-4 py-2.5 rounded-lg border bg-white text-gray-900 focus:outline-none focus:ring-2 transition-all disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:opacity-60';

export default function ServiceSelectionFields({
  categorySlug,
  serviceId,
  onCategoryChange,
  onServiceChange,
  disabled = false,
  categoryError,
  serviceError,
  currentService,
  stacked = false,
}: ServiceSelectionFieldsProps) {
  const categoriesQuery = usePublicServiceCategories();
  const servicesQuery = usePublicServices(
    {
      category: categorySlug,
      active: true,
      page: 0,
      size: 100,
    },
    categorySlug.length > 0,
  );

  const categories = categoriesQuery.data ?? [];
  const services = servicesQuery.data?.content ?? [];
  const categoryUnavailable =
    categoriesQuery.isPending || categoriesQuery.isError || categories.length === 0;
  const serviceUnavailable =
    !categorySlug || servicesQuery.isPending || servicesQuery.isError || services.length === 0;

  const categoryPlaceholder = categoriesQuery.isPending
    ? 'Đang tải danh mục...'
    : categoriesQuery.isError
      ? 'Không thể tải danh mục dịch vụ'
      : categories.length === 0
        ? 'Không có danh mục dịch vụ'
        : 'Chọn danh mục dịch vụ';

  const servicePlaceholder = !categorySlug
    ? 'Vui lòng chọn danh mục trước'
    : servicesQuery.isPending
      ? 'Đang tải dịch vụ...'
      : servicesQuery.isError
        ? 'Không thể tải danh sách dịch vụ'
        : services.length === 0
          ? 'Không có dịch vụ trong danh mục này'
          : 'Chọn dịch vụ cần tư vấn';

  const hasCurrentServiceOption = Boolean(
    currentService &&
      currentService.category === categorySlug &&
      currentService.id === serviceId &&
      !services.some((service) => service.id === currentService.id),
  );

  return (
    <div
      className={`grid grid-cols-1 gap-4 ${
        stacked ? '' : 'md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]'
      }`}
    >
      <div className="min-w-0">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Danh Mục Dịch Vụ <span className="text-[#d40000]">*</span>
        </label>
        <select
          value={categorySlug}
          onChange={(event) => onCategoryChange(event.target.value)}
          disabled={disabled || categoryUnavailable}
          className={`${selectClassName} ${
            categoryError
              ? 'border-[#d40000] focus:ring-[#d40000]/20'
              : 'border-gray-300 focus:border-[#d40000] focus:ring-[#d40000]/20'
          }`}
        >
          <option value="">{categoryPlaceholder}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        {categoryError && (
          <p className="text-[#d40000] text-xs mt-1 flex items-center gap-1">
            <span>⚠️</span> {categoryError}
          </p>
        )}
      </div>

      <div className="min-w-0">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Dịch Vụ Cần Tư Vấn <span className="text-[#d40000]">*</span>
        </label>
        <select
          value={serviceId}
          onChange={(event) => onServiceChange(event.target.value)}
          disabled={disabled || serviceUnavailable}
          className={`${selectClassName} ${
            serviceError
              ? 'border-[#d40000] focus:ring-[#d40000]/20'
              : 'border-gray-300 focus:border-[#d40000] focus:ring-[#d40000]/20'
          }`}
        >
          <option value="">{servicePlaceholder}</option>
          {hasCurrentServiceOption && currentService && (
            <option value={currentService.id}>{currentService.title}</option>
          )}
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
        {serviceError && (
          <p className="text-[#d40000] text-xs mt-1 flex items-center gap-1">
            <span>⚠️</span> {serviceError}
          </p>
        )}
      </div>
    </div>
  );
}
