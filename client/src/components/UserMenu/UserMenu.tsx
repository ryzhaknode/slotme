import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { useAppDispatch } from '../../redux/store';
import { MdLogout } from 'react-icons/md';

export default function UserMenu() {
  const dispatch = useAppDispatch();
  const { name } = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="flex items-center justify-between gap-14 p-4 bg-white ">
      <p className="text-sm text-gray-800 font-semibold tracking-wide">HI, {name}</p>

      <button onClick={handleLogout} className="text-sm text-gray-700 font-normal hover:text-red-600 uppercase">
        <MdLogout size={24} />
      </button>
    </div>
  );
}
