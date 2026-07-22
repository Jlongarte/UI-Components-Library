import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Limpia el DOM generado por React Testing Library después de cada test
afterEach(() => {
  cleanup();
});