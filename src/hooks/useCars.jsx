import { useQuery } from "@tanstack/react-query";
import carApi from "../api/carApi";

export function useCars(page = 1, filters = {}) {
  return useQuery({
    queryKey: ["cars", { page, ...filters }],
    queryFn: async () => {
      const res = await carApi.get("/", {
        params: { page, ...filters },
      });
      return res.data;
    },
    staleTime: 30 * 1000,
  });
}
