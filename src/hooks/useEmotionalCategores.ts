import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/api/emotionalCategories";
import { EmotionalCategory } from "@/types";

export const useEmotionalCategories = () => {
  const queryClient = useQueryClient();

  // GET
  const {
    data: categories,
    isLoading: isFetching,
    refetch,
  } = useQuery<EmotionalCategory[]>({
    queryKey: ["emotionalCategories"],
    queryFn: () => getCategories(),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: Partial<EmotionalCategory>) => createCategory(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["emotionalCategories"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EmotionalCategory> }) =>
      updateCategory(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["emotionalCategories"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["emotionalCategories"] }),
  });

  return {
    categories,
    isFetching,
    refetch,

    // mutations
    createCategory: createMutation.mutateAsync,
    updateCategory: updateMutation.mutateAsync,
    deleteCategory: deleteMutation.mutateAsync,

    // mutation loading states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    // mutation errors
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
};
