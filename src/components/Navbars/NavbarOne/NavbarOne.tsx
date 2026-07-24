import React, { useState, MouseEvent } from 'react';
import { NavbarOneProps, NavItem } from './NavbarOne.types';
import './NavbarOne.css';

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    id: 'bio',
    label: 'Biography',
    items: [{ label: 'About' }, { label: 'Early Life' }, { label: 'Education' }],
  },
  {
    id: 'projects',
    label: 'Projects',
    items: [{ label: 'Chatbot' }, { label: 'Calculator' }, { label: 'Weather' }],
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    items: [{ label: 'Projects' }, { label: 'Testimonials' }, { label: 'GitHub' }],
  },
  { id: 'contact', label: 'Contact' },
];

export const NavbarOne: React.FC<NavbarOneProps> = ({
  items = DEFAULT_NAV_ITEMS,
  logo,
  rightElement,
}) => {
  const [activeItem, setActiveItem] = useState<NavItem | null>(null);
  const [subMenuItem, setSubMenuItem] = useState<NavItem | null>(null);
  const [translateX, setTranslateX] = useState<string>('0px');
  
  // Estado para el menú hamburguesa en móvil
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // Estado para desplegables acordeón en móvil
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);

  const isOpen = Boolean(activeItem?.items && activeItem.items.length > 0);

  const handleHover = (item: NavItem, event: MouseEvent<HTMLLIElement>) => {
    setActiveItem(item);
    if (!item.items || item.items.length === 0) {
      setSubMenuItem(null);
      return;
    }
    setSubMenuItem(item);
    const rect = event.currentTarget.getBoundingClientRect();
    setTranslateX(`${rect.left}px`);
  };

  const toggleMobileAccordion = (id: string) => {
    setMobileExpandedId(mobileExpandedId === id ? null : id);
  };

  return (
    <div className="nav-wrapper">
      <nav className="nav">
        {/* Logo */}
        <div className="logo">
          {logo || (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {/* Menú Central (Desktop/Tablet) */}
        <div className="menu desktop-menu" onMouseLeave={() => setActiveItem(null)}>
          <ul>
            {items.map((item) => (
              <li key={item.id} onMouseEnter={(e) => handleHover(item, e)}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Elementos Derecha (Avatar + Botón Hamburguesa) */}
        <div className="avatar-container">
          {rightElement || (
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Perfil"
              className="avatar"
            />
          )}

          {/* Botón Hamburguesa (Solo Móvil) */}
          <button
            type="button"
            className={`hamburger-btn ${isMobileOpen ? 'active' : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Abrir menú de navegación"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Submenú Flotante (Desktop) */}
      <div
        style={{ transform: `translateX(${translateX})` }}
        className={`submenu ${isOpen ? 'open' : ''}`}
        onMouseEnter={() => subMenuItem && setActiveItem(subMenuItem)}
        onMouseLeave={() => setActiveItem(null)}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={item.label === subMenuItem?.label ? 'visible' : ''}
          >
            <ul>
              {item.items?.map((link, i) => (
                <li key={i}>{link.label}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Menú Desplegable Móvil */}
      <div className={`mobile-menu-drawer ${isMobileOpen ? 'open' : ''}`}>
        <ul className="mobile-menu-list">
          {items.map((item) => {
            const hasSubitems = Boolean(item.items && item.items.length > 0);
            const isExpanded = mobileExpandedId === item.id;

            return (
              <li key={item.id} className="mobile-menu-item">
                <div
                  className="mobile-item-header"
                  onClick={() => hasSubitems && toggleMobileAccordion(item.id)}
                >
                  <span>{item.label}</span>
                  {hasSubitems && (
                    <span className={`mobile-arrow ${isExpanded ? 'rotated' : ''}`}>
                      ▾
                    </span>
                  )}
                </div>

                {hasSubitems && isExpanded && (
                  <ul className="mobile-submenu-list">
                    {item.items?.map((sub, i) => (
                      <li key={i} className="mobile-submenu-item">
                        {sub.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NavbarOne;