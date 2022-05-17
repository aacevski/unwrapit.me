import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import ScrollToTheTopButton from '~components/scroll-to-the-top-button';
import SettingsPopover from '~components/settings-popover';
import Spinner from '~components/spinner';
import useGetTopTracks from '~hooks/query/get-top-tracks';
import { Track } from '~types/track';

const TopTracks = () => {
  const [scrollToTheTopVisible, setScrollToTheTopVisible] = useState(false);
  const { data: tracks, isLoading } = useGetTopTracks();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setScrollToTheTopVisible(true);
      } else {
        setScrollToTheTopVisible(false);
      }
    });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <VStack pt={32} position="relative">
      {scrollToTheTopVisible && <ScrollToTheTopButton />}
      <SettingsPopover
        position="fixed"
        bottom={6}
        right={6}
        bgColor="rgba(0, 0, 0, 0.9)"
        _hover={{
          bgColor: 'rgba(0, 0, 0, 1)',
          transform: 'scale(1.1)',
        }}
      />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          '2xl': 'repeat(3, 1fr)',
        }}
        gap={20}
      >
        {tracks?.items.map((track: Track) => (
          <GridItem
            key={`${track.name}-${track.album.name}-${track.album.images[0].url}`}
            flex={1}
          >
            <LinkBox h="full">
              <Box
                role="group"
                p={6}
                maxW={{ base: '300px', lg: '330px' }}
                h="full"
                w="full"
                bg="rgba(0, 0, 0, 0.9)"
                boxShadow="2xl"
                rounded="lg"
                pos="relative"
                zIndex={1}
                flex={1}
                textAlign="center"
              >
                <Box
                  rounded="lg"
                  mt={-12}
                  pos="relative"
                  _after={{
                    transition: 'all .3s ease',
                    content: '""',
                    w: 'full',
                    h: 'full',
                    pos: 'absolute',
                    top: 5,
                    left: 0,
                    backgroundImage: `url(${track.album.images[0].url})`,
                    filter: 'blur(15px)',
                    zIndex: -1,
                  }}
                  _groupHover={{
                    _after: {
                      filter: 'blur(25px)',
                    },
                  }}
                >
                  <Image
                    rounded="lg"
                    h={80}
                    objectFit="cover"
                    src={track.album.images[0].url}
                    alt={track?.name}
                  />
                </Box>
                <Stack pt={10} align="center">
                  <LinkOverlay
                    href={track.external_urls.spotify}
                    target="_blank"
                  >
                    <Text
                      color="gray.500"
                      fontSize="sm"
                      textTransform="uppercase"
                    >
                      {track?.album.name}
                    </Text>
                  </LinkOverlay>
                  <Heading fontSize="2xl" fontWeight={500}>
                    {track.name}
                  </Heading>
                </Stack>
              </Box>
            </LinkBox>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default TopTracks;
