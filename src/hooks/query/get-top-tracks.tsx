import { useQuery } from 'react-query';

import { useUser } from '~providers/user-provider';
import { Tracks } from '~types/track';
import fetcher from '~api/fetcher';

const useGetTopTracks = () => {
  const { timePeriod } = useUser();

  const { data, error, isLoading } = useQuery<Tracks>(
    [`get-top-tracks`, timePeriod],
    () => fetcher(`/api/top-tracks?time_range=${timePeriod}`),
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

export default useGetTopTracks;
