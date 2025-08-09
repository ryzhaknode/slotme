import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { useAppDispatch } from '../../redux/store';

export default function UserMenu() {
  const dispatch = useAppDispatch();
  const { name } = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="flex items-center justify-between gap-6 p-4 bg-white ">
      <p className="text-sm text-gray-800 font-semibold tracking-wide">HI, {name}</p>

      <button onClick={handleLogout} className="text-sm text-gray-700 font-semibold hover:text-red-600 uppercase">
        Log out
      </button>
    </div>
  );
}
