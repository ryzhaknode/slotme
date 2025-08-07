import { NavLink, useMatch } from 'react-router-dom';

export default function AuthNav() {
  const matchRegister = useMatch('/register');
  const matchLogin = useMatch('/login');

  const currentTab: '/register' | '/login' | null = matchRegister ? '/register' : matchLogin ? '/login' : null;

  const getLinkClass = (path: '/register' | '/login') =>
    `uppercase text-sm ${currentTab === path ? 'text-blue-600 font-semibold' : 'text-gray-700'}`;

  return (
    <nav className="flex gap-6 p-4">
      <NavLink to="/register" className={getLinkClass('/register')}>
        Register
      </NavLink>
      <NavLink to="/login" className={getLinkClass('/login')}>
        Log In
      </NavLink>
    </nav>
  );
}
