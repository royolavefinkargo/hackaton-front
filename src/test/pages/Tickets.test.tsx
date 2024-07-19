import { render, screen, fireEvent } from '@testing-library/react';
import Tickets from '../../pages/Tickets';
import { obtenerTickets, agregarTicket, actualizarTicket, eliminarTicket } from '../../api/api';

jest.mock('../api/api', () => ({
  obtenerTickets: jest.fn(),
  agregarTicket: jest.fn(),
  actualizarTicket: jest.fn(),
  eliminarTicket: jest.fn(),
}));

describe('Tickets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and render tickets', async () => {
    const mockTickets = [
      { id: 1, titulo: 'Ticket 1', descripcion: 'Descripción 1', estado: 'Abierto', prioridad: 'Alta' },
      { id: 2, titulo: 'Ticket 2', descripcion: 'Descripción 2', estado: 'Cerrado', prioridad: 'Baja' },
    ];
    obtenerTickets.mockResolvedValueOnce({ data: mockTickets });

    render(<Tickets />);

    expect(obtenerTickets).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Ticket 1')).toBeInTheDocument();
    expect(screen.getByText('Ticket 2')).toBeInTheDocument();
  });

  it('should add a new ticket', async () => {
    agregarTicket.mockResolvedValueOnce();

    render(<Tickets />);

    fireEvent.click(screen.getByText('Agregar Ticket'));
    fireEvent.change(screen.getByLabelText('Título:'), { target: { value: 'New Ticket' } });
    fireEvent.change(screen.getByLabelText('Descripción:'), { target: { value: 'New Description' } });
    fireEvent.change(screen.getByLabelText('Estado:'), { target: { value: 'Abierto' } });
    fireEvent.change(screen.getByLabelText('Prioridad:'), { target: { value: 'Alta' } });
    fireEvent.click(screen.getByText('Guardar'));

    expect(agregarTicket).toHaveBeenCalledTimes(1);
    expect(agregarTicket).toHaveBeenCalledWith({
      titulo: 'New Ticket',
      descripcion: 'New Description',
      estado: 'Abierto',
      prioridad: 'Alta',
      usuario_id: 1,
      id: 0,
    });
  });

  it('should update a ticket', async () => {
    actualizarTicket.mockResolvedValueOnce();

    render(<Tickets />);

    fireEvent.click(screen.getByText('Editar'));
    fireEvent.change(screen.getByLabelText('Título:'), { target: { value: 'Updated Ticket' } });
    fireEvent.change(screen.getByLabelText('Descripción:'), { target: { value: 'Updated Description' } });
    fireEvent.change(screen.getByLabelText('Estado:'), { target: { value: 'Cerrado' } });
    fireEvent.change(screen.getByLabelText('Prioridad:'), { target: { value: 'Baja' } });
    fireEvent.click(screen.getByText('Guardar'));

    expect(actualizarTicket).toHaveBeenCalledTimes(1);
    expect(actualizarTicket).toHaveBeenCalledWith(1, {
      titulo: 'Updated Ticket',
      descripcion: 'Updated Description',
      estado: 'Cerrado',
      prioridad: 'Baja',
      usuario_id: 1,
      id: 0,
    });
  });

  it('should delete a ticket', async () => {
    eliminarTicket.mockResolvedValueOnce();

    render(<Tickets />);

    fireEvent.click(screen.getByText('Eliminar'));

    expect(eliminarTicket).toHaveBeenCalledTimes(1);
    expect(eliminarTicket).toHaveBeenCalledWith(1);
  });
});