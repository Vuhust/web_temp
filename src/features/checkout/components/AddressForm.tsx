"use client";

import { useQuery } from "@tanstack/react-query";
import { addressService } from "@/services/payment.service";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { SearchableSelect } from "@/components/common/SearchableSelect";
import { MapPin, ExternalLink } from "lucide-react";
import { useState, useMemo } from "react";
import type { Address } from "@/types";
import {
  buildMapAddress,
  getGoogleMapsEmbedUrlFromAddress,
  getGoogleMapsLinkFromAddress,
} from "@/lib/formatter";
import { validateAddress } from "@/lib/validator";

interface AddressFormProps {
  onSubmit: (address: Omit<Address, "id">) => void;
  loading?: boolean;
}

export function AddressForm({ onSubmit, loading }: AddressFormProps) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    provinceCode: "",
    provinceName: "",
    wardCode: "",
    wardName: "",
    street: "",
    note: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showMap, setShowMap] = useState(false);

  const { data: provinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: addressService.getProvinces,
  });

  const { data: wards } = useQuery({
    queryKey: ["wards", form.provinceCode],
    queryFn: () => addressService.getWards(form.provinceCode),
    enabled: !!form.provinceCode,
  });

  const provinceOptions = useMemo(
    () => provinces?.map((p) => ({ value: p.code, label: p.name })) ?? [],
    [provinces]
  );

  const wardOptions = useMemo(
    () => wards?.map((w) => ({ value: w.code, label: w.name })) ?? [],
    [wards]
  );

  const addressPreview = useMemo(() => {
    const parts = [form.street, form.wardName, form.provinceName].filter(Boolean);
    return parts.join(", ");
  }, [form.street, form.wardName, form.provinceName]);

  const mapAddress = useMemo(
    () => buildMapAddress(form.street, form.wardName, form.provinceName),
    [form.street, form.wardName, form.provinceName]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateAddress(form);
    if (validationErrors.length) {
      const errMap: Record<string, string> = {};
      validationErrors.forEach((err) => {
        errMap[err.field] = err.message;
      });
      setErrors(errMap);
      return;
    }
    setErrors({});
    onSubmit({ ...form });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Họ và tên"
            name="fullName"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            error={errors.fullName}
            placeholder="Nguyễn Văn A"
          />
          <Input
            label="Số điện thoại"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            error={errors.phone}
            placeholder="0901234567"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SearchableSelect
            label="Tỉnh/Thành phố"
            placeholder="Chọn tỉnh/thành"
            searchPlaceholder="Tìm tỉnh/thành phố..."
            value={form.provinceCode}
            options={provinceOptions}
            error={errors.provinceCode}
            onChange={(code, option) => {
              setForm({
                ...form,
                provinceCode: code,
                provinceName: option?.label || "",
                wardCode: "",
                wardName: "",
              });
            }}
          />

          <SearchableSelect
            label="Phường/Xã"
            placeholder="Chọn phường/xã"
            searchPlaceholder="Tìm phường/xã..."
            value={form.wardCode}
            options={wardOptions}
            disabled={!form.provinceCode}
            error={errors.wardCode}
            emptyText={
              form.provinceCode ? "Không tìm thấy phường/xã" : "Chọn tỉnh/thành trước"
            }
            onChange={(code, option) => {
              setForm({
                ...form,
                wardCode: code,
                wardName: option?.label || "",
              });
            }}
          />
        </div>

        <Input
          label="Địa chỉ cụ thể"
          name="street"
          value={form.street}
          onChange={(e) => setForm({ ...form, street: e.target.value })}
          error={errors.street}
          placeholder="Số nhà, tên đường..."
        />

        <Input
          label="Ghi chú (tuỳ chọn)"
          name="note"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          placeholder="Ghi chú thêm cho shipper..."
        />

        {form.wardCode && form.provinceName && (
          <div className="flex items-center gap-3 rounded-xl bg-accent-50 p-4">
            <MapPin className="h-5 w-5 shrink-0 text-accent-600" />
            <div className="flex-1 text-sm text-slate-600">
              {addressPreview || `${form.wardName}, ${form.provinceName}`}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowMap(true)}
            >
              Xem bản đồ
            </Button>
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full">
          Xác nhận địa chỉ
        </Button>
      </form>

      <Modal
        open={showMap}
        onClose={() => setShowMap(false)}
        title="Vị trí giao hàng"
        size="lg"
      >
        {mapAddress && (
          <div>
            <p className="mb-3 text-sm text-slate-600">{mapAddress}</p>
            <iframe
              key={mapAddress}
              src={getGoogleMapsEmbedUrlFromAddress(mapAddress)}
              className="h-80 w-full rounded-xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ giao hàng"
            />
            <a
              href={getGoogleMapsLinkFromAddress(mapAddress)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-600 hover:text-accent-700"
            >
              Mở Google Maps <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </Modal>
    </>
  );
}
