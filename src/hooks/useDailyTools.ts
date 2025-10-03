import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDailyTools,
  createDailyToolCategory,
  updateDailyToolCategory,
  deleteDailyToolCategory,
  uploadDailyToolAudio,
} from "@/lib/api/dailyTools";
import { DailyToolCategory } from "@/types";

export const useDailyTools = () => {
  const queryClient = useQueryClient();

  const {
    data: categories,
    isLoading: isFetching,
    refetch,
  } = useQuery<DailyToolCategory[]>({
    queryKey: ["dailyTools"],
    queryFn: getDailyTools,
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<DailyToolCategory>) =>
      createDailyToolCategory(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["dailyTools"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<DailyToolCategory>;
    }) => updateDailyToolCategory(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["dailyTools"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDailyToolCategory(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["dailyTools"] }),
  });

  const uploadAudio = async (file: File) => uploadDailyToolAudio(file);

  return {
    categories,
    isFetching,
    refetch,

    createCategory: createMutation.mutateAsync,
    updateCategory: updateMutation.mutateAsync,
    deleteCategory: deleteMutation.mutateAsync,
    uploadAudio,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
