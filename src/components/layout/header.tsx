import { useMediaQuery } from '@chakra-ui/react';
import Sidebar from './side-bar';
import Topbar from './top-bar';

const Header = () => {
  const [isMobile] = useMediaQuery('(max-width: 1020px)');

  return isMobile ? <Topbar /> : <Sidebar />;
};

export default Header;
