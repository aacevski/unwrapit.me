import useMediaQuery from '../../hooks/use-media-query';
import Sidebar from './side-bar';
import Topbar from './top-bar';

const Header = () => {
  const isMobile = useMediaQuery(1020);

  return isMobile ? <Topbar /> : <Sidebar />;
};

export default Header;
