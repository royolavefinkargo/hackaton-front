import React, { useEffect, useState } from 'react';
import { obtenerUsuarios, eliminarUsuario } from '../api/api';

const ListaUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      const respuesta = await obtenerUsuarios();
      setUsuarios(respuesta.data);
    };
    cargarUsuarios();
  }, []);

  const handleEliminar = async (id: string) => {
    await eliminarUsuario(id);
    setUsuarios(usuarios.filter((usuario: any) => usuario.id !== id));
  };

  const handleModificar = async (id: string) => {
    // Aquí debes implementar la lógica para redirigir a la página de modificación del usuario con el id correspondiente
    // Puedes utilizar el método history.push() de react-router-dom para redirigir a la página de modificación
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {usuarios.map((usuario: any) => (
        <div key={usuario.id} className='line-gap'>
          {usuario.nombre} - {usuario.correo_electronico}
          <button onClick={() => handleModificar(usuario.id)}>Modificar</button>
          <button onClick={() => handleEliminar(usuario.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default ListaUsuarios;