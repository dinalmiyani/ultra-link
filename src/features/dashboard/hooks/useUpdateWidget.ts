import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type Widget } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import toast from "react-hot-toast";

export function useUpdateWidget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<Widget> }) =>
      api.widgets.update(id, patch),

    onMutate: async ({ id, patch }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.widgets.list() });

      const previous = queryClient.getQueryData<Widget[]>(queryKeys.widgets.list());

      queryClient.setQueryData<Widget[]>(queryKeys.widgets.list(), (old) =>
        old?.map((w) => (w.id === id ? { ...w, ...patch } : w)) ?? []
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.widgets.list(), context.previous);
      }
      toast.error("Failed to update widget — change reverted");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.widgets.list() });
    },
  });
}