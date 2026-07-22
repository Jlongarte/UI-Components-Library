import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CustomCursor } from './CustomCursor1';

describe('CustomCursor', () => {
  beforeEach(() => {
    // Limpiamos los estilos e historial entre tests si hiciera falta
  });

  it('debe usar el texto por defecto si no se le pasa la prop text', () => {
    render(<CustomCursor />);

    expect(
      screen.getByText(/• DISEÑO • FULLSTACK • DEVELOPER/i)
    ).toBeInTheDocument();
  });

  it('debe renderizar el texto personalizado recibido por props', () => {
    const customText = '• FRONTEND • ARCHITECT •';
    render(<CustomCursor text={customText} />);

    expect(screen.getByText(customText)).toBeInTheDocument();
  });

  it('debe estar oculto (opacity 0) antes de mover el ratón', () => {
    const { container } = render(<CustomCursor />);
    const cursorElement = container.firstChild as HTMLElement;

    expect(cursorElement).toHaveStyle({ opacity: '0' });
  });

  it('debe actualizar la posición y volverse visible al mover el ratón', () => {
    const { container } = render(<CustomCursor />);
    const cursorElement = container.firstChild as HTMLElement;

    // Simulamos el movimiento del cursor en window
    fireEvent.mouseMove(window, { clientX: 250, clientY: 400 });

    // Verificamos que sea visible
    expect(cursorElement).toHaveStyle({ opacity: '1' });

    // Verificamos las coordenadas transform en el estilo inline
    expect(cursorElement).toHaveStyle({
      transform: 'translate3d(250px, 400px, 0)',
    });
  });

  it('debe ocultarse (opacity 0) cuando el ratón sale de la pantalla (mouseleave)', () => {
    const { container } = render(<CustomCursor />);
    const cursorElement = container.firstChild as HTMLElement;

    // 1. Movemos el ratón para hacerlo visible
    fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });
    expect(cursorElement).toHaveStyle({ opacity: '1' });

    // 2. Simulamos la salida del cursor de la ventana
    fireEvent.mouseLeave(document);

    // 3. Debe volver a estar oculto
    expect(cursorElement).toHaveStyle({ opacity: '0' });
  });

  it('debe aplicar la velocidad de rotación personalizada (spinDuration)', () => {
    const { container } = render(<CustomCursor spinDuration={5} />);
    const svgElement = container.querySelector('.custom-cursor-svg');

    expect(svgElement).toHaveStyle({ animationDuration: '5s' });
  });
});