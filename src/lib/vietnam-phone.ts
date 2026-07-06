/**
 * Vietnam mobile phone validation (domestic format).
 * Accepts 0xxxxxxxxx (10 digits). +84 / 84 prefix is normalized but not required.
 *
 * Prefixes follow Vietnamese carrier allocations (Viettel, Vinaphone, Mobifone, etc.).
 */
const VN_MOBILE_PREFIXES =
  "32|33|34|35|36|37|38|39|52|56|58|59|55|70|76|77|78|79|81|82|83|84|85|86|87|88|89|90|91|92|93|94|96|97|98|99";

const VN_MOBILE_REGEX = new RegExp(`^0(${VN_MOBILE_PREFIXES})\\d{7}$`);

export function normalizeVietnamPhone(phone: string): string {
  let normalized = phone.trim().replace(/[\s.\-()]/g, "");

  if (normalized.startsWith("+84")) {
    normalized = `0${normalized.slice(3)}`;
  } else if (/^84\d{9}$/.test(normalized)) {
    normalized = `0${normalized.slice(2)}`;
  }

  return normalized;
}

export function isValidVietnamPhone(phone: string): boolean {
  return VN_MOBILE_REGEX.test(normalizeVietnamPhone(phone));
}

export const VIETNAM_PHONE_ERROR =
  "Số điện thoại không hợp lệ. Nhập 10 số bắt đầu bằng 0 (ví dụ: 0901234567)";

export const VIETNAM_PHONE_PLACEHOLDER = "0901234567";
