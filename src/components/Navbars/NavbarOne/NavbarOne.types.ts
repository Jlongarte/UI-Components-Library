import { ReactNode } from 'react';

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  items?: {
    label: string;
    href?: string;
    onClick?: () => void;
  }[];
}

export interface NavbarOneProps {
  /** Lista de enlaces principales con sus submenús opcionales */
  items: NavItem[];
  /** Slot para el Logo o Isotipo izquierdo */
  logo?: ReactNode;
  /** Slot opcional para el contenido derecho (Avatar, Badge, Botón) */
  rightElement?: ReactNode;
  /** Callback al hacer clic en un elemento del submenú */
  onSelectSubitem?: (parentLabel: string, subItemLabel: string) => void;
}