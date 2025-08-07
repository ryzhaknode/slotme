// import { useSelector } from 'react-redux';

import AuthNav from '../AuthNav/AuthNav';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';

// import Navigation from '../Navigation/Navigation';
// import UserMenu from '../UserMenu/UserMenu';
// import AuthNav from '../AuthNav/AuthNav';
// import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function AppBar() {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = false;

  return (
    <header className=" bg-white max-w-full">
      <div className="max-w-[1046px] mx-auto flex justify-between items-center px-[15px]">
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </div>
    </header>
  );
}
