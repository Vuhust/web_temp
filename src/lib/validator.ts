export function isValidPhone(phone: string): boolean {
  return /^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(phone.replace(/\s/g, ""));
}

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
    errors.push({ field: "phone", message: "Số điện thoại không hợp lệ" });
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
