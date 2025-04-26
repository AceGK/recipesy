import { useLogout } from '@/hooks/useLogout';

export default function LogoutButton() {
  const { logoutUser } = useLogout();
  return <button className="btn" onClick={logoutUser}>Logout</button>
}