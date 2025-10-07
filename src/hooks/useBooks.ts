import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
  Book,
  uploadBookImage,
  uploadBookPdf,
} from "@/lib/api/books";

export const useBooks = () => {
  const queryClient = useQueryClient();

  const {
    data: books,
    isLoading: isFetching,
    refetch,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Book>) => createBook(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Book> }) =>
      updateBook(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
  });

  return {
    books,
    isFetching,
    refetch,
    createBook: createMutation.mutateAsync,
    updateBook: updateMutation.mutateAsync,
    deleteBook: deleteMutation.mutateAsync,
    uploadImage: uploadBookImage,
    uploadPdf: uploadBookPdf,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
