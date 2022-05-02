import { useQuery } from 'react-query';

import { useUser } from '~providers/user-provider';
import { Artists } from '~types/artist';
import fetcher from '~api/fetcher';

const useGetTopArtists = () => {
  const { timePeriod } = useUser();
  const { data, error, isLoading } = useQuery<Artists>(
    [`get-top-artists`, timePeriod],
    () => fetcher(`/api/top-artists?time_range=${timePeriod}`),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useGetTopArtists;
