import {
  isValidVietnamPhone,
  normalizeVietnamPhone,
  VIETNAM_PHONE_ERROR,
} from "@/lib/vietnam-phone";

export function isValidPhone(phone: string): boolean {
  return isValidVietnamPhone(phone);
}

export { normalizeVietnamPhone, VIETNAM_PHONE_ERROR };

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export interface ValidationError {
  field: string;
  message: string;
}

export function validateAddress(data: {
  fullName: string;
  phone: string;
  street: string;
  provinceCode: string;
  wardCode: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.fullName.trim()) {
    errors.push({ field: "fullName", message: "Vui lòng nhập họ tên" });
  }
  if (!isValidPhone(data.phone)) {
    errors.push({ field: "phone", message: VIETNAM_PHONE_ERROR });
  }
  if (!data.provinceCode) {
    errors.push({ field: "provinceCode", message: "Vui lòng chọn tỉnh/thành" });
  }
  if (!data.wardCode) {
    errors.push({ field: "wardCode", message: "Vui lòng chọn phường/xã" });
  }
  if (!data.street.trim()) {
    errors.push({ field: "street", message: "Vui lòng nhập địa chỉ cụ thể" });
  }

  return errors;
}
