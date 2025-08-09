import { useSelector } from 'react-redux';
import { NavLink, useMatch } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const matchHome = useMatch({ path: '/', end: true });
  const matchContacts = useMatch('/chat');

  const currentTab: '/' | '/chat' | null = matchHome ? '/' : matchContacts ? '/chat' : null;

  const getLinkClass = (path: '/' | '/chat') =>
    `uppercase text-sm ${currentTab === path ? 'text-blue-600 font-semibold' : 'text-gray-700'}`;

  return (
    <nav className="flex gap-6 p-4">
      <NavLink to="/" className={getLinkClass('/')}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/chat" className={getLinkClass('/chat')}>
          Chat
        </NavLink>
      )}
    </nav>
  );
}
