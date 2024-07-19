import { render, screen } from '@testing-library/react';
import ListaUsuarios from '../../pages/ListaUsuarios';
import { obtenerUsuarios } from '../../api/api';

jest.mock('../api/api', () => ({
  obtenerUsuarios: jest.fn(),
}));

describe('ListaUsuarios', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and render users', async () => {
    const mockUsuarios = [
      { id: 1, nombre: 'John Doe', correo_electronico: 'john@example.com' },
      { id: 2, nombre: 'Jane Smith', correo_electronico: 'jane@example.com' },
    ];
    obtenerUsuarios.mockResolvedValueOnce({ data: mockUsuarios });

    render(<ListaUsuarios />);

    expect(obtenerUsuarios).toHaveBeenCalledTimes(1);
    expect(screen.getByText('John Doe - john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith - jane@example.com')).toBeInTheDocument();
  });

  it('should handle error when fetching users', async () => {
    const errorMessage = 'Failed to fetch users';
    obtenerUsuarios.mockRejectedValueOnce(new Error(errorMessage));

    render(<ListaUsuarios />);

    expect(obtenerUsuarios).toHaveBeenCalledTimes(1);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});