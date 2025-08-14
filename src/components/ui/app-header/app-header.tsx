import React, { FC } from 'react';
import styles from './app-header.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <BurgerIcon
              type={location.pathname === '/' ? 'primary' : 'secondary'}
            />
            <Link
              to={'/'}
              className={
                location.pathname === '/' ? styles.link_active : styles.link
              }
            >
              <p className={`text text_type_main-default ml-2 mr-10`}>
                Конструктор
              </p>
            </Link>
          </>
          <>
            <ListIcon
              type={location.pathname === '/feed' ? 'primary' : 'secondary'}
            />
            <Link
              to={'/feed'}
              className={
                location.pathname === '/feed' ? styles.link_active : styles.link
              }
            >
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </Link>
          </>
        </div>
        <div className={styles.logo}>
          <Link to='/'>
            <Logo className='' />
          </Link>
        </div>
        <div className={styles.link_position_last}>
          <ProfileIcon
            type={
              location.pathname === '/profile' ||
              location.pathname === '/login' ||
              location.pathname === '/register' ||
              location.pathname === '/profile/orders'
                ? 'primary'
                : 'secondary'
            }
          />
          <Link
            to={'/profile'}
            className={
              location.pathname === '/profile' ||
              location.pathname === '/login' ||
              location.pathname === '/register' ||
              location.pathname === '/profile/orders'
                ? styles.link_active
                : styles.link
            }
          >
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
