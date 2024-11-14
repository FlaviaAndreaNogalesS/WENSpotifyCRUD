import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GenresCrud from './components/GenresCrud'; // Asegúrate de que la ruta sea correcta
import ArtistsCrud from './components/ArtistsCrud';
import AlbumsCrud from './components/AlbumsCrud';
import SongsCrud from './components/SongsCrud';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GenresCrud />} />
          <Route path="/artists" element={<ArtistsCrud />} />
          <Route path="/albums" element={<AlbumsCrud />} />
          <Route path="/songs" element={<SongsCrud />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
