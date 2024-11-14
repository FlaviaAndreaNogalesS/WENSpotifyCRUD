import axios from 'axios';

const API_URL = 'http://localhost:4000/genres';

export const getAllGenres = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

//CRUD 
export const createGenre = async (genreData) => {
  try {
    const response = await axios.post(API_URL, genreData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear genero:', error);
    throw error;
  }
};

export const updateGenre = async (id, genreData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, genreData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar genero:', error);
    throw error;
  }
};

export const deleteGenre = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al elimiar genre:', error);
    throw error;
  }
};
