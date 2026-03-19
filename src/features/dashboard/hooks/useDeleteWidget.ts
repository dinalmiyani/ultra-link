import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type Widget } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import toast from "react-hot-toast";

export function useDeleteWidget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.widgets.delete(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.widgets.list() });
      const previous = queryClient.getQueryData<Widget[]>(queryKeys.widgets.list());

      queryClient.setQueryData<Widget[]>(queryKeys.widgets.list(), (old) =>
        old?.filter((w) => w.id !== id) ?? []
      );

      return { previous };
    },

    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.widgets.list(), context.previous);
      }
      toast.error("Failed to delete widget — restored");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.widgets.list() });
    },
  });
}