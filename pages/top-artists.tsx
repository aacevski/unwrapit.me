import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Stack,
  Image,
  VStack,
  IconButton,
  Icon,
  Text,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { IoIosArrowDropupCircle } from 'react-icons/io';

import { useUser } from '../src/providers/user-provider';
import { Artist, Artists } from '../src/types/artist';
import fetcher from '../src/utils/fetcher';

const TopArtists = () => {
  const { timePeriod } = useUser();
  const [scrollToTheTopVisible, setScrollToTheTopVisible] = useState(false);

  const { data: artists } = useQuery<Artists>(
    `get-top-artists-${timePeriod}`,
    () => fetcher(`/api/top-artists?time_range=${timePeriod}`),
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setScrollToTheTopVisible(true);
      } else {
        setScrollToTheTopVisible(false);
      }
    });
  }, []);

  const onScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <VStack pt={32}>
      {scrollToTheTopVisible && (
        <IconButton
          color="white"
          bg="rgba(0, 0, 0, 0.9)"
          zIndex={5000}
          size="lg"
          position="fixed"
          bottom={6}
          right={6}
          aria-label="Scroll to the top"
          icon={<Icon as={IoIosArrowDropupCircle} />}
          onClick={onScrollUp}
          _hover={{
            bgColor: 'rgba(0, 0, 0, 1)',
            transform: 'scale(1.1)',
          }}
          _focus={{
            bgColor: 'rgba(0, 0, 0, 1)',
            transform: 'scale(1.1)',
          }}
        />
      )}
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={20}
      >
        {artists?.items.map((artist: Artist) => (
          <GridItem key={artist.name} flex={1}>
            <LinkBox>
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
                    backgroundImage: `url(${artist?.images[0]?.url})`,
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
                    src={artist?.images[0].url}
                    alt={artist?.name}
                  />
                </Box>
                <Stack pt={10} align="center">
                  <LinkOverlay
                    href={artist.external_urls.spotify}
                    target="_blank"
                  >
                    <Text
                      color="gray.500"
                      fontSize="sm"
                      textTransform="uppercase"
                    >
                      {artist?.genres[0]}
                    </Text>
                  </LinkOverlay>
                  <Heading fontSize="2xl" fontWeight={500}>
                    {artist.name}
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

export default TopArtists;
