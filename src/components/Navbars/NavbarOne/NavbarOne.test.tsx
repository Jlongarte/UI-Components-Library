import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { NavbarOne } from './NavbarOne';
import { NavItem } from './NavbarOne.types';

const mockItems: NavItem[] = [
  {
    id: 'bio',
    label: 'Biography',
    items: [{ label: 'About' }, { label: 'Education' }],
  },
  {
    id: 'contact',
    label: 'Contact',
  },
];

describe('NavbarOne', () => {
  it('debe renderizar los elementos principales del menú y el logo', () => {
    const { container } = render(
      <NavbarOne
        items={mockItems}
        logo={<span data-testid="custom-logo">Logo Test</span>}
      />
    );

    // Acotamos la búsqueda solo al menú Desktop para evitar colisiones con la versión móvil
    const desktopMenu = container.querySelector('.desktop-menu')!;
    
    expect(within(desktopMenu).getByText('Biography')).toBeInTheDocument();
    expect(within(desktopMenu).getByText('Contact')).toBeInTheDocument();
    expect(screen.getByTestId('custom-logo')).toBeInTheDocument();
  });

  it('debe mostrar el submenú flotante al hacer hover sobre un ítem con hijos (Desktop)', async () => {
    const { container } = render(<NavbarOne items={mockItems} />);

    // Buscamos "Biography" de la versión Desktop
    const desktopMenu = container.querySelector('.desktop-menu')!;
    const mainNavItem = within(desktopMenu).getByText('Biography');

    // Simulamos hover del usuario
    await userEvent.hover(mainNavItem);

    // Verificamos el submenú de escritorio
    const desktopSubmenu = container.querySelector('.submenu')!;
    expect(within(desktopSubmenu).getByText('About')).toBeInTheDocument();
    expect(within(desktopSubmenu).getByText('Education')).toBeInTheDocument();
  });

  it('debe abrir y cerrar el menú hamburguesa al pulsar el botón (Móvil)', async () => {
    render(<NavbarOne items={mockItems} />);

    const hamburgerBtn = screen.getByRole('button', {
      name: /abrir menú de navegación/i,
    });

    // Inicialmente el drawer móvil no tiene la clase open/active
    expect(hamburgerBtn).not.toHaveClass('active');

    // Hacemos click para abrir
    await userEvent.click(hamburgerBtn);

    // Verificamos que el botón reciba la clase activa
    expect(hamburgerBtn).toHaveClass('active');
  });

  it('debe desplegar el acordeón interno al hacer click en un item en modo móvil', async () => {
    const { container } = render(<NavbarOne items={mockItems} />);

    // 1. Abrimos el drawer móvil
    const hamburgerBtn = screen.getByRole('button', {
      name: /abrir menú de navegación/i,
    });
    await userEvent.click(hamburgerBtn);

    // 2. Acotamos las búsquedas al drawer móvil exclusivamente
    const mobileDrawer = container.querySelector('.mobile-menu-drawer')!;
    const mobileHeader = within(mobileDrawer).getByText('Biography');

    // 3. Hacemos click en el header "Biography" dentro del móvil
    await userEvent.click(mobileHeader);

    // 4. Verificamos que el subítem "About" exista DENTRO del drawer móvil
    expect(within(mobileDrawer).getByText('About')).toBeInTheDocument();
  });
});