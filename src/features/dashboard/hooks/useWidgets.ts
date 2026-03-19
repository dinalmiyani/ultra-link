import { api } from './../../../lib/api';
import { queryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export function useWidgets() {
  return useQuery({
    queryKey: queryKeys.widgets.list(),
    queryFn: api.widgets.list,
    staleTime: 30_000
  })
}