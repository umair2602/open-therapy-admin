import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  User,
} from "@/lib/api/users";

export const useUsers = () => {
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading: isFetching,
    refetch,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return {
    users,
    isFetching,
    refetch,
    updateUser: updateMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
