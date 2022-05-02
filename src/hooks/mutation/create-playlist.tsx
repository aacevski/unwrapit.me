import { useMutation } from 'react-query';

import { useUser } from '../../providers/user-provider';
import fetcher from '../../api/fetcher';

const useCreatePlaylist = (trackUris: string[] | undefined) => {
  const { timePeriod } = useUser();

  const { mutate } = useMutation('create-playlist', () =>
    fetcher('/api/create-playlist', {
      method: 'POST',
      body: JSON.stringify({
        trackUris,
        timePeriod,
      }),
    })
  );

  return { mutate };
};

export default useCreatePlaylist;
