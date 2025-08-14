import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logout } from '../../slices/user/userActions';
import { clearUser } from '../../slices/user/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logout());
      dispatch(clearUser());
      navigate('/login');
    } catch (err) {}
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
