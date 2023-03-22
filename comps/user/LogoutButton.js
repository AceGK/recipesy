import { useLogout } from '../../hooks/useLogout';

export default function LogoutButton() {
  const { logoutUser } = useLogout();
  return <button onClick={logoutUser}>Logout</button>
}