import axios from 'axios';

const API_URL = 'http://localhost:4000/artists';

export const getAllArtists = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
};

//CRUD
export const createArtist = async (artistData) => {
  try {
    const response = await axios.post(API_URL, artistData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear artista:', error);
    throw error;
  }
};

export const updateArtist = async (id, artistData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, artistData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar artista:', error);
    throw error;
  }
};

export const deleteArtist = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al borrar artista:', error);
    throw error;
  }
};
