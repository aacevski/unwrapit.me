import { AiFillHome, AiFillStar } from 'react-icons/ai';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';

const menu = [
  {
    title: 'Home',
    path: '/',
    icon: AiFillHome,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: FaUserAlt,
  },
  {
    title: 'Top Artists',
    path: '/top-artists',
    icon: AiFillStar,
  },
  {
    title: 'Top Tracks',
    path: '/top-tracks',
    icon: BsMusicNoteBeamed,
  },
];

export default menu;
