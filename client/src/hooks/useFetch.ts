import { useQuery } from 'react-query';
import { getData, getDataById } from '../api/service';

const useFetch = <T>(queryKey: string, url: string, id?: string) => {
  return useQuery<T>(
    id ? [queryKey, id] : [queryKey], // Cache key includes ID if present
    () => (id ? getDataById<T>(`${url}/${id}`) : getData<T>(url)) // Fetch all or by ID
  );
};

export default useFetch;
