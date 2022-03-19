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

  semanticTokens: {
    colors: {
      'header-bg': {
        default: 'white',
        _dark: 'black',
      },
      'icon-hover': {
        default: '#F2F2F2',
        _dark: '#383A3E',
      },
    },
  },

  components: {
    Container: {
      variants: {
        sidebar: {
          maxWidth: '240px',
          height: 'full',
          position: 'absolute',
          top: 0,
          left: 0,
        },
      },
    },
  },
});

export default theme;
