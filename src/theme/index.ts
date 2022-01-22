import {
  extendTheme,
  theme as base,
  ThemeConfig,
  ChakraTheme,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: ChakraTheme) => ({
      body: {
        bg: mode('#F6F6F6', '#0B0B0C')(props),
      },
    }),
  },
  fonts: {
    heading: `Roboto Mono, ${base.fonts.heading}`,
    body: `Roboto Mono, ${base.fonts.body}`,
  },
});

export default theme;
