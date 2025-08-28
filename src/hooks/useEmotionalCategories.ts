// hooks/useEmotionalCategories.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, createCategory, updateCategory, deleteCategory, EmotionalCategory } from "@/lib/api/emotionalCategories";

export const useEmotionalCategories = () => {
  const token = "123"
  const queryClient = useQueryClient();

  // GET
  const { data: categories, isLoading, refetch } = useQuery<EmotionalCategory[]>({
    queryKey: ["emotionalCategories"],
    queryFn: () => getCategories(token),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: Partial<EmotionalCategory>) => createCategory(data, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["emotionalCategories"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EmotionalCategory> }) =>
      updateCategory(id, data, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["emotionalCategories"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["emotionalCategories"] }),
  });

  return {
    categories,
    isLoading,
    refetch,
    createCategory: createMutation.mutateAsync,
    updateCategory: updateMutation.mutateAsync,
    deleteCategory: deleteMutation.mutateAsync,
  };
};
