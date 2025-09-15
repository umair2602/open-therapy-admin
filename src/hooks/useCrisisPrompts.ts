import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCrisisPrompts,
  createCrisisPrompt,
  updateCrisisPrompt,
  deleteCrisisPrompt,
} from "@/lib/api/crisisPrompts";
import { CrisisPrompt } from "@/types";

export const useCrisisPrompts = () => {
  const queryClient = useQueryClient();

  const {
    data: crisisPrompts,
    isLoading: isFetching,
    refetch,
  } = useQuery<CrisisPrompt[]>({
    queryKey: ["crisisPrompts"],
    queryFn: () => getCrisisPrompts(),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<CrisisPrompt>) => createCrisisPrompt(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["crisisPrompts"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CrisisPrompt> }) =>
      updateCrisisPrompt(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["crisisPrompts"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCrisisPrompt(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["crisisPrompts"] }),
  });

  return {
    crisisPrompts,
    isFetching,
    refetch,

    createCrisisPrompt: createMutation.mutateAsync,
    updateCrisisPrompt: updateMutation.mutateAsync,
    deleteCrisisPrompt: deleteMutation.mutateAsync,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
};
