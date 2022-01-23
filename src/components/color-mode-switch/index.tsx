import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react';

import { MoonIcon } from '../icons/moon-icon';
import { SunIcon } from '../icons/sun-icon';

const ColorModeSwitch = (props: Omit<IconButtonProps, 'aria-label'>) => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <IconButton
      aria-label="Color mode switch"
      variant="ghost"
      onClick={() => toggleColorMode()}
      icon={<SwitchIcon />}
      rounded="full"
      _hover={{
        bg: useColorModeValue('#F2F2F2', '#383A3E'),
      }}
      _active={{ bg: 'transparent' }}
      style={{ boxShadow: 'none' }}
      {...props}
    />
  );
};

export default ColorModeSwitch;
