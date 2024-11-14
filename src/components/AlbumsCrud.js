import React, { useEffect, useState } from 'react';
import { getAllAlbums, createAlbum, updateAlbum, deleteAlbum } from '../services/albumService';
import { getAllArtists } from '../services/artistService';
import './AlbumsCrud.css';

const AlbumsCrud = () => {
  const [albums, setAlbums] = useState([]); //almacena albums y etc
  const [artists, setArtists] = useState([]);
  const [newAlbum, setNewAlbum] = useState({ title: '', artistId: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editMode, setEditMode] = useState(false); // Estado para el modo de edición
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => { //obtiene albums
    const fetchAlbums = async () => {
      try {
        const data = await getAllAlbums();
        setAlbums(data);
      } catch (error) {
        console.error('Error al obtener albums:', error);
      }
    };

    const fetchArtists = async () => {
      try {
        const data = await getAllArtists();
        setArtists(data);
      } catch (error) {
        console.error('Error al obtener artistas:', error);
      }
    };

    fetchAlbums();
    fetchArtists();
  }, []);

  //maneja crear o actualizar
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCreateOrUpdate = async () => {
    const formData = new FormData();
    formData.append('title', newAlbum.title);
    formData.append('artistId', newAlbum.artistId);

    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      if (editMode && selectedAlbum) {
        await updateAlbum(selectedAlbum.id, formData);
      } else {
        await createAlbum(formData);
      }
      setNewAlbum({ title: '', artistId: '' }); //reinicia el formulario
      setSelectedFile(null);
      setEditMode(false);
      setSelectedAlbum(null);
      const updatedAlbums = await getAllAlbums();
      setAlbums(updatedAlbums); //actualiza la lista
    } catch (error) {
      console.error('Error al salvar album:', error);
    }
  };

  const handleEdit = (album) => {
    setNewAlbum({ title: album.title, artistId: album.artistId });
    setSelectedAlbum(album);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAlbum(id);
      const updatedAlbums = await getAllAlbums();
      setAlbums(updatedAlbums);
    } catch (error) {
      console.error('Error al borrar album:', error);
    }
  };

  return (
    <div className="albums-crud-container">
      <h2>Gestión de Álbumes</h2>
      <div className="album-form">
        <input
          type="text"
          placeholder="Título del álbum"
          value={newAlbum.title}
          onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
        />
        <select
          value={newAlbum.artistId}
          onChange={(e) => setNewAlbum({ ...newAlbum, artistId: e.target.value })}
        >
          <option value="">Selecciona un artista</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </select>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleCreateOrUpdate}>
          {editMode ? 'Actualizar Álbum' : 'Agregar Álbum'}
        </button>
      </div>
      <ul className="albums-list">
        {albums.map((album) => (
          <li key={album.id}>
            <div className="album-item">
              <img src={`http://localhost:4000/${album.image}`} alt={album.title} />
              <span>{album.title} - {album.artist ? album.artist.name : 'Sin artista'}</span>
              <button onClick={() => handleEdit(album)}>Editar</button>
              <button onClick={() => handleDelete(album.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumsCrud;
