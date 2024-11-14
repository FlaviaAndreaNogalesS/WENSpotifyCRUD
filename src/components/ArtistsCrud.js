import React, { useEffect, useState } from 'react';
import { getAllArtists, createArtist, updateArtist, deleteArtist } from '../services/artistService';
import { getAllGenres } from '../services/genreService'; // Para obtener los géneros
import './ArtistsCrud.css';

const ArtistsCrud = () => {
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [newArtist, setNewArtist] = useState({ name: '', genre_id: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getAllArtists();
        setArtists(data);
      } catch (error) {
        console.error('Error al obtener artists:', error);
      }
    };

    const fetchGenres = async () => {
      try {
        const data = await getAllGenres();
        setGenres(data);
      } catch (error) {
        console.error('Error al obtener generos:', error);
      }
    };

    fetchArtists();
    fetchGenres();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCreateOrUpdate = async () => {
    const formData = new FormData();
    formData.append('name', newArtist.name);
    formData.append('genre_id', newArtist.genre_id);

    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      if (editMode && selectedArtist) {
        await updateArtist(selectedArtist.id, formData);
      } else {
        await createArtist(formData);
      }
      setNewArtist({ name: '', genre_id: '' });
      setSelectedFile(null);
      setEditMode(false);
      setSelectedArtist(null);
      const updatedArtists = await getAllArtists();
      setArtists(updatedArtists);
    } catch (error) {
      console.error('Error al salvar artista:', error);
    }
  };

  const handleEdit = (artist) => {
    setNewArtist({ name: artist.name, genre_id: artist.genre_id });
    setSelectedArtist(artist);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteArtist(id);
      const updatedArtists = await getAllArtists();
      setArtists(updatedArtists);
    } catch (error) {
      console.error('Error al borrar artista:', error);
    }
  };

  return (
    <div className="artists-crud-container">
      <h2>Gestión de Artistas</h2>
      <div className="artist-form">
        <input
          type="text"
          placeholder="Nombre del artista"
          value={newArtist.name}
          onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
        />
        <select
          value={newArtist.genre_id}
          onChange={(e) => setNewArtist({ ...newArtist, genre_id: e.target.value })}
        >
          <option value="">Selecciona un género</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleCreateOrUpdate}>
          {editMode ? 'Actualizar Artista' : 'Agregar Artista'}
        </button>
      </div>
      <ul className="artists-list">
        {artists.map((artist) => (
          <li key={artist.id}>
            <div className="artist-item">
              <img src={`http://localhost:4000/${artist.image}`} alt={artist.name} />
              <span>{artist.name} - {artist.genre ? artist.genre.name : 'Sin género'}</span>
              <button onClick={() => handleEdit(artist)}>Editar</button>
              <button onClick={() => handleDelete(artist.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistsCrud;
