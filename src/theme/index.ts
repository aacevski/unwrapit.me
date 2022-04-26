import { extendTheme, theme as base, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bgColor: 'hsla(0,100%,50%,1)',
        bg: 'radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)',
      },
    },
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
