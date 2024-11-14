import axios from 'axios';

const API_URL = 'http://localhost:4000/albums';

export const getAllAlbums = async () => {
  try {
    const response = await axios.get(API_URL); //soli get
    return response.data; //devuelve los datos
  } catch (error) {
    console.error('Error al recuperar álbumes:', error);
    throw error;
  }
};

//CRUD FUNCIONES
export const createAlbum = async (albumData) => {
  try {
    const response = await axios.post(API_URL, albumData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear album:', error);
    throw error;
  }
};

export const updateAlbum = async (id, albumData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, albumData, {
      headers: { //encabezado http pa indiar al servidor el tipo de dato
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar album:', error);
    throw error;
  }
};

export const deleteAlbum = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al borrar album:', error);
    throw error;
  }
};
