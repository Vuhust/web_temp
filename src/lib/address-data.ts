import provincesJson from "@/data/address/provinces.json";
import wardsByProvinceJson from "@/data/address/wards-by-province.json";
import type { Province, Ward } from "@/types";

export const addressProvinces = provincesJson as Province[];

const wardsByProvince = wardsByProvinceJson as Record<
  string,
  Array<{ code: string; name: string; type?: string; provinceCode: string }>
>;

export function getWardsByProvince(provinceCode: string): Ward[] {
  const list = wardsByProvince[provinceCode] || [];
  return list.map((w) => ({
    code: w.code,
    name: w.name,
    provinceCode: w.provinceCode,
    type: w.type,
  }));
}

/** Approximate province centers for map preview when ward coords are unavailable */
const provinceCenters: Record<string, { lat: number; lng: number }> = {
  "01": { lat: 21.0285, lng: 105.8542 },
  "79": { lat: 10.8231, lng: 106.6297 },
  "48": { lat: 16.0544, lng: 108.2022 },
  "92": { lat: 10.0452, lng: 105.7469 },
  "31": { lat: 20.8449, lng: 106.6881 },
};

export function getCoordinatesForWard(
  wardCode: string,
  provinceCode?: string
): { lat: number; lng: number } {
  if (provinceCode && provinceCenters[provinceCode]) {
    return provinceCenters[provinceCode];
  }
  return { lat: 21.0285, lng: 105.8542 };
}
