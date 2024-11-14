import axios from 'axios';

const API_URL = 'http://localhost:4000/songs';

export const getAllSongs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener canciones:', error);
    throw error;
  }
};

//CRUD

export const createSong = async (songData) => {
  try {
    const response = await axios.post(API_URL, songData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear la song:', error);
    throw error;
  }
};

export const updateSong = async (id, songData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, songData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la song:', error);
    throw error;
  }
};

export const deleteSong = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al elimiar la song:', error);
    throw error;
  }
};
