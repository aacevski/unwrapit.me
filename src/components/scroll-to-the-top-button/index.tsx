import { IconButton, Icon } from '@chakra-ui/react';
import { IoIosArrowDropupCircle } from 'react-icons/io';

const ScrollToTheTopButton = () => {
  const onScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <IconButton
      color="white"
      bg="rgba(0, 0, 0, 0.9)"
      zIndex={5000}
      position="fixed"
      bottom={6}
      left={{ base: 6, lg: '246px' }}
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
  );
};

export default ScrollToTheTopButton;
