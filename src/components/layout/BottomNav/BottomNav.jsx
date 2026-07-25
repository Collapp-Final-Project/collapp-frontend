import { NavLink } from 'react-router-dom';
import { Home, PlusSquare, ClipboardList, User } from 'lucide-react';
import './BottomNav.scss';

const NAV_ITEMS = [
  { to: '/feed', label: 'Feed', icon: Home },
  { to: '/offers/new', label: 'Publica.', icon: PlusSquare },
  { to: '/applications', label: 'Postul.', icon: ClipboardList },
  { to: '/profile', label: 'Perfil', icon: User },
];

export const BottomNav = () => (
  <nav className="bottom-nav" aria-label="Navegación principal">
    {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'bottom-nav-active' : ''}`}
      >
        <Icon size={20} aria-hidden="true" />
        <span>{label}</span>
      </NavLink>
    ))}
  </nav>
);