import { useEffect, useState } from "react";
import { obtenerTickets, actualizarTicket, agregarTicket,eliminarTicket } from "../api/api";

const Tickets = () => {
   const [modalOpenM, setModalOpenM] = useState(false);
  const [tickets, setTickets] = useState([]);
   const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    estado: "",
    prioridad: "",
    usuario_id:1,
    id: 0
  });


  useEffect(() => {
    obtenerTickets2();
  }, []);

  const obtenerTickets2 = async () => {
    try {
      const respuesta = await obtenerTickets();
      console.log("asdasdasd", respuesta.data);
      setTickets(respuesta.data);
    } catch (error) {
      console.error("Hubo un error al obtener los tickets:", error);
    }
  };

  const agregarTicket2 = async () => {
    try {
      await agregarTicket(form);
      alert('ticket almacenado')
      setForm({
        titulo: "",
        descripcion: "",
        estado: "",
        prioridad: "",
        usuario_id:1,
        id: 0
      })
      obtenerTickets2()
      setModalOpen(false)
      // Recargar la lista de tickets
    } catch (error) {
      console.error("Hubo un error al agregar el ticket:", error);
    }
  };

  const modificarTicket = async () => {
    try {
      await actualizarTicket(form.id, form);
      obtenerTickets(); // Recargar la lista de tickets
      alert('ticket almacenado')
      setForm({
        titulo: "",
        descripcion: "",
        estado: "",
        prioridad: "",
        usuario_id:1,
        id: 0
      })
      obtenerTickets2()
      setModalOpenM(false)
    } catch (error) {
      console.error("Hubo un error al modificar el ticket:", error);
    }
  };

  const eliminarTicket2 = async (id: any) => {
    try {
      await eliminarTicket(id);
      alert('ticket Eliminado')
      obtenerTickets2()// Recargar la lista de tickets
    } catch (error) {
      console.error("Hubo un error al eliminar el ticket:", error);
    }
  };

 

  const agregarNuevoTicket = () => {
    setModalOpen(true);
  };

  const guardarTicket = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log('frome',form)
  return (
    <div>
      <h2>Lista de Tickets</h2>
      <button onClick={agregarNuevoTicket}>Agregar Ticket</button>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Prioridad</th>
            {/* Añade más columnas según sea necesario */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.titulo}</td>
              <td>{ticket.descripcion}</td>
              <td>{ticket.estado}</td>
              <td>{ticket.prioridad}</td>
              {/* Añade más celdas según sea necesario */}
              <td>
                {/* Botones o enlaces para editar y eliminar */}
                <button onClick={() => {
                  setModalOpenM(true)
                  console.log('ti',ticket.id, ticket)
                  setForm(tickets.filter((t:any)=>t.id===ticket.id)[0])
                }}>
                  Editar
                </button>
                <button onClick={() => eliminarTicket2(ticket.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen || modalOpenM ? (
        <div className="modalOverlay">
          <div className="modal">
            <div className="column-gap">
              <h3>Agregar Nuevo Ticket</h3>
              <label>Título:</label>
              <input type="text" value={form.titulo} name='titulo'onChange={guardarTicket} />
              <label>Descripción:</label>
              <input
              name='descripcion'
                type="text"
                value={form.descripcion}
                onChange={guardarTicket}
              />
              <label>Estado:</label>
              <input type="text"  name='estado'value={form.estado} onChange={guardarTicket} />
              <label>Prioridad:</label>
              <input
              name='prioridad'
                type="text"
                value={form.prioridad}
                onChange={guardarTicket}
              />
              {modalOpen ? 
              <button onClick={()=>agregarTicket2()}>Guardar</button>:
              <button onClick={()=>modificarTicket()}>Guardar</button>
              }
              
            </div>
          </div>
        </div>
      ):null}
    </div>
  );
};

export default Tickets;
