import React, { useEffect, useState } from 'react';
import { getAllGenres, createGenre, updateGenre, deleteGenre } from '../services/genreService';
import './GenresCrud.css';

const GenresCrud = () => {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState({ name: '' });
  const [selectedFile, setSelectedFile] = useState(null); // Nuevo estado para el archivo
  const [editMode, setEditMode] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAllGenres();
        setGenres(data);
      } catch (error) {
        console.error('Error al obtener generos:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCreateOrUpdate = async () => {
    const formData = new FormData();
    formData.append('name', newGenre.name);

    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      if (editMode && selectedGenre) {
        await updateGenre(selectedGenre.id, formData);
      } else {
        await createGenre(formData);
      }
      setNewGenre({ name: '' });
      setSelectedFile(null);
      setEditMode(false);
      setSelectedGenre(null);
      const updatedGenres = await getAllGenres();
      setGenres(updatedGenres);
    } catch (error) {
      console.error('Error al salvar genero:', error);
    }
  };

  const handleEdit = (genre) => {
    setNewGenre({ name: genre.name });
    setSelectedGenre(genre);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteGenre(id);
      const updatedGenres = await getAllGenres();
      setGenres(updatedGenres);
    } catch (error) {
      console.error('Error al borrar genero:', error);
    }
  };

  return (
    <div className="genres-crud-container">
      <h2>Gestión de Géneros</h2>
      <div className="genre-form">
        <input
          type="text"
          placeholder="Nombre del género"
          value={newGenre.name}
          onChange={(e) => setNewGenre({ ...newGenre, name: e.target.value })}
        />
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleCreateOrUpdate}>
          {editMode ? 'Actualizar Género' : 'Agregar Género'}
        </button>
      </div>
      <ul className="genres-list">
        {genres.map((genre) => (
          <li key={genre.id}>
            <div className="genre-item">
              <img src={`http://localhost:4000/${genre.image}`} alt={genre.name} />
              <span>{genre.name}</span>
              <button onClick={() => handleEdit(genre)}>Editar</button>
              <button onClick={() => handleDelete(genre.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenresCrud;
