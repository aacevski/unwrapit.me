import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import useSound from 'use-sound';

import { MoonIcon } from '../icons/moon-icon';
import { SunIcon } from '../icons/sun-icon';
import switchOn from '../../../public/switch_on.mp3';
import switchOff from '../../../public/switch_off.mp3';

const ColorModeSwitch = (props: Omit<IconButtonProps, 'aria-label'>) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const [play] = useSound(colorMode === 'light' ? switchOn : switchOff);

  const onClick = () => {
    toggleColorMode();
    play();
  };

  return (
    <IconButton
      aria-label="Color mode switch"
      variant="ghost"
      onClick={onClick}
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
