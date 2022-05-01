import { VStack, Spinner as ChakraSpinner } from '@chakra-ui/react';

const Spinner = ({ size = 'xl', ...rest }) => {
  return (
    <VStack flex={1} w="full" align="center" justify="center">
      <ChakraSpinner size="xl" {...rest} />
    </VStack>
  );
};

export default Spinner;
