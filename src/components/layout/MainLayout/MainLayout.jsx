import { Outlet } from 'react-router-dom';
import { BottomNav } from '../BottomNav/BottomNav';
import './MainLayout.scss';

export const MainLayout = () => (
  <div className="main-layout">
    <div className="main-layout-content">
      <Outlet />
    </div>
    <BottomNav />
  </div>
);