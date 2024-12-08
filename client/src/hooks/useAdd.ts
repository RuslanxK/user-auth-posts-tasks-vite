import { useMutation, useQueryClient } from 'react-query';
import { postData } from '../api/service';

const useAdd = <T, R>(queryKey: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: { url: string; payload: T }) => postData<T, R>(params.url, params.payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};

export default useAdd;
