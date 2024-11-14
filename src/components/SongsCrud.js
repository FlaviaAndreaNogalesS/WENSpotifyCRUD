import React, { useEffect, useState } from 'react';
import { getAllSongs, createSong, updateSong, deleteSong } from '../services/songService';
import { getAllAlbums } from '../services/albumService'; // Para obtener los álbumes
import './SongsCrud.css';

const SongsCrud = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [newSong, setNewSong] = useState({ title: '', albumId: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getAllSongs();
        setSongs(data);
      } catch (error) {
        console.error('Error obtener songs:', error);
      }
    };

    const fetchAlbums = async () => {
      try {
        const data = await getAllAlbums();
        setAlbums(data);
      } catch (error) {
        console.error('Error al obtener albums:', error);
      }
    };

    fetchSongs();
    fetchAlbums();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCreateOrUpdate = async () => {
    const formData = new FormData();
    formData.append('title', newSong.title);
    formData.append('albumId', newSong.albumId);

    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      if (editMode && selectedSong) {
        await updateSong(selectedSong.id, formData);
      } else {
        await createSong(formData);
      }
      setNewSong({ title: '', albumId: '' });
      setSelectedFile(null);
      setEditMode(false);
      setSelectedSong(null);
      const updatedSongs = await getAllSongs();
      setSongs(updatedSongs);
    } catch (error) {
      console.error('Error al salvar la musica:', error);
    }
  };

  const handleEdit = (song) => {
    setNewSong({ title: song.title, albumId: song.albumId });
    setSelectedSong(song);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSong(id);
      const updatedSongs = await getAllSongs();
      setSongs(updatedSongs);
    } catch (error) {
      console.error('Error al borrar la song:', error);
    }
  };

  return (
    <div className="songs-crud-container">
      <h2>Gestión de Canciones</h2>
      <div className="song-form">
        <input
          type="text"
          placeholder="Título de la canción"
          value={newSong.title}
          onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
        />
        <select
          value={newSong.albumId}
          onChange={(e) => setNewSong({ ...newSong, albumId: e.target.value })}
        >
          <option value="">Selecciona un álbum</option>
          {albums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.title}
            </option>
          ))}
        </select>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleCreateOrUpdate}>
          {editMode ? 'Actualizar Canción' : 'Agregar Canción'}
        </button>
      </div>
      <ul className="songs-list">
        {songs.map((song) => (
          <li key={song.id}>
            <div className="song-item">
              <span>{song.title} - {song.album ? song.album.title : 'Sin álbum'}</span>
              <button onClick={() => handleEdit(song)}>Editar</button>
              <button onClick={() => handleDelete(song.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsCrud;
