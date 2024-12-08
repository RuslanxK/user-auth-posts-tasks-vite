import { useMutation, useQueryClient } from 'react-query';
import { updateData } from '../api/service';

const useEdit = <T, R>(queryKey: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: { url: string; payload: T }) => updateData<T, R>(params.url, params.payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};

export default useEdit;
