import { api } from "./axios";
import type { ApiResponse, Province, Ward } from "@/types";

export const addressService = {
  getProvinces: () =>
    api.get<ApiResponse<Province[]>>("/address/provinces").then((r) => r.data.data),

  getWards: (provinceCode: string) =>
    api
      .get<ApiResponse<Ward[]>>("/address/wards", { params: { provinceCode } })
      .then((r) => r.data.data),

  getCoordinates: (wardCode: string, provinceCode?: string) =>
    api
      .get<ApiResponse<{ lat: number; lng: number }>>("/address/coordinates", {
        params: { wardCode, provinceCode },
      })
      .then((r) => r.data.data),
};
