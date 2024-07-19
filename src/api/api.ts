import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Asegúrate de que la URL coincida con tu servidor FastAPI

// Usuarios
export const agregarUsuario = async (usuario: any) => {
  return await axios.post(`${API_URL}/usuarios/`, usuario);
};

export const obtenerUsuarios = async () => {
  return await axios.get(`${API_URL}/usuarios/`);
};

export const obtenerUsuario = async (id: string) => {
  return await axios.get(`${API_URL}/usuarios/${id}`);
};

export const actualizarUsuario = async (id: string, usuario: any) => {
  return await axios.put(`${API_URL}/usuarios/${id}`, usuario);
};

export const eliminarUsuario = async (id: string) => {
  return await axios.delete(`${API_URL}/usuarios/${id}`);
};

// Tickets
export const agregarTicket = async (ticket: any) => {
  return await axios.post(`${API_URL}/tickets/`, ticket);
};

export const obtenerTickets = async () => {
  return await axios.get(`${API_URL}/tickets/`);
};

export const obtenerTicket = async (id: string) => {
  return await axios.get(`${API_URL}/tickets/${id}`);
};

export const actualizarTicket = async (id: string, ticket: any) => {
  return await axios.put(`${API_URL}/tickets/${id}`, ticket);
};

export const eliminarTicket = async (id: string) => {
  return await axios.delete(`${API_URL}/tickets/${id}`);
};

// Agrega más funciones según sea necesario para interactuar con tu API