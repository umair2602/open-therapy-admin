import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSuggestedPrompts,
  createSuggestedPrompt,
  updateSuggestedPrompt,
  deleteSuggestedPrompt,
  SuggestedPrompt,
  ChatType,
  AreaOfLifeSubcategory,
} from "@/lib/api/suggestedPrompts";

export const useSuggestedPrompts = (filters?: {
  chatType?: ChatType;
  subcategory?: AreaOfLifeSubcategory;
  isActive?: boolean;
}) => {
  const queryClient = useQueryClient();

  const {
    data: suggestedPrompts,
    isLoading: isFetching,
    refetch,
  } = useQuery<SuggestedPrompt[]>({
    queryKey: ["suggestedPrompts", filters],
    queryFn: () => getSuggestedPrompts(filters),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<SuggestedPrompt>) => createSuggestedPrompt(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["suggestedPrompts"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<SuggestedPrompt>;
    }) => updateSuggestedPrompt(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["suggestedPrompts"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSuggestedPrompt(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["suggestedPrompts"] }),
  });

  return {
    suggestedPrompts,
    isFetching,
    refetch,
    createSuggestedPrompt: createMutation.mutateAsync,
    updateSuggestedPrompt: updateMutation.mutateAsync,
    deleteSuggestedPrompt: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
};
