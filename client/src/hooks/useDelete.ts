import { useMutation, useQueryClient } from 'react-query';
import { deleteData } from '../api/service';

const useDelete = <R>(queryKey: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: { url: string }) => deleteData<R>(params.url),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};

export default useDelete;
