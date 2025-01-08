import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import NewVideo from './components/NewVideo';
import Footer from './components/Footer';

const App = () => {
  const [categories, setCategories] = useState({
    'FRONT END': [],
    'BACK END': [],
    'INNOVACION Y GESTIÓN': [],
  });

  // Función para cargar los videos desde la API
  const loadVideos = () => {
    axios.get('http://localhost:3001/videos')
      .then((response) => {
        const videos = response.data;
        const updatedCategories = {
          'FRONT END': videos.filter(video => video.category === 'FRONT END'),
          'BACK END': videos.filter(video => video.category === 'BACK END'),
          'INNOVACION Y GESTIÓN': videos.filter(video => video.category === 'INNOVACION Y GESTIÓN'),
        };
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.error('Error al cargar los videos', error);
      });
  };

  // Cargar videos al inicio
  useEffect(() => {
    loadVideos();
  }, []);

  const addVideo = (video) => {
    axios.post('http://localhost:3001/videos', video)
      .then(() => {
        loadVideos();  // Recargar los videos después de agregar uno nuevo
      })
      .catch((error) => {
        console.error('Error al agregar el video', error);
      });
  };

  const editVideo = (video) => {
    axios.put(`http://localhost:3001/videos/${video.id}`, video)
      .then(() => {
        loadVideos(); // Recargar después de editar
      })
      .catch((error) => {
        console.error('Error al editar el video', error);
      });
  };

  const deleteVideo = (video) => {
    axios.delete(`http://localhost:3001/videos/${video.id}`)
      .then(() => {
        loadVideos(); // Recargar después de eliminar
      })
      .catch((error) => {
        console.error('Error al eliminar el video', error);
      });
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                categories={categories}  // Pasa el estado actualizado aquí
                onEdit={editVideo}
                onDelete={deleteVideo}
              />
            }
          />
          <Route path="/new-video" element={<NewVideo addVideo={addVideo} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
