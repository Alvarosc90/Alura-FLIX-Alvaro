import React, { useState, useEffect } from 'react';
import '../css/Categories.css';
import EditModal from './EditModal';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importar íconos

const Categories = ({ categories, onEdit, onDelete }) => {
  const [selectedVideo, setSelectedVideo] = useState(null); // Video seleccionado para editar
  const [isModalOpen, setIsModalOpen] = useState(false); // Controlar la visibilidad del modal
  const [visibleIndices, setVisibleIndices] = useState(
    Object.keys(categories).reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
  ); // Índices visibles por categoría
  const [videosToShow, setVideosToShow] = useState(3); // Inicialmente mostrar hasta 3 videos por carrusel

  // Cargar y filtrar los videos de la base de datos (sin duplicados por id)
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch('http://localhost:3001/videos');
      const data = await response.json();
      setVideosData(data); // Guardamos los videos en el estado
    };

    fetchVideos();

    // Ajustar el número de videos a mostrar según el tamaño de la ventana
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setVideosToShow(1); // En pantallas pequeñas, mostrar 1 video
      } else if (window.innerWidth < 768) {
        setVideosToShow(2); // En pantallas medianas, mostrar 2 videos
      } else {
        setVideosToShow(3); // En pantallas grandes, mostrar 3 videos
      }
    };

    handleResize(); // Inicializar el número de videos al cargar la página
    window.addEventListener('resize', handleResize); // Escuchar cambios en el tamaño de la ventana

    return () => {
      window.removeEventListener('resize', handleResize); // Limpiar el listener al desmontar
    };
  }, []);

  const handleNext = (category) => {
    setVisibleIndices((prev) => ({
      ...prev,
      [category]: (prev[category] + videosToShow) % categories[category].length,
    }));
  };

  const handlePrev = (category) => {
    setVisibleIndices((prev) => ({
      ...prev,
      [category]:
        (prev[category] - videosToShow + categories[category].length) % categories[category].length,
    }));
  };

  const handleVideoClick = (videoUrl) => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  const handleEdit = (video) => {
    setSelectedVideo(video); // Establecer el video seleccionado para editar
    setIsModalOpen(true); // Abrir el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  return (
    <section className="categories">
      {Object.keys(categories).map((category) => {
        const visibleIndex = visibleIndices[category];
        
        // Aseguramos que los videos mostrados sean únicos por ID
        const uniqueVideos = [];
        const seenIds = new Set();

        const visibleVideos = categories[category]
          .slice(visibleIndex, visibleIndex + videosToShow)
          .concat(
            categories[category].slice(0, Math.max(0, visibleIndex + videosToShow - categories[category].length))
          )
          .filter((video) => {
            if (!seenIds.has(video.id)) {
              seenIds.add(video.id);
              uniqueVideos.push(video);
              return true;
            }
            return false;
          });

        let categoryClass = '';
        let cardClass = '';

        if (category === 'FRONT END') {
          categoryClass = 'frontend';
          cardClass = 'frontend-card';
        } else if (category === 'BACK END') {
          categoryClass = 'backend';
          cardClass = 'backend-card';
        } else if (category === 'INNOVACION Y GESTIÓN') {
          categoryClass = 'innovacion';
          cardClass = 'innovacion-card';
        }

        return (
          <div className="category" key={category}>
            <div className="categorias">
              <h2 className={categoryClass}>{category}</h2>
            </div>

            <div className="carousel">
              <button
                className="carousel-btn prev-btn"
                onClick={() => handlePrev(category)}
                aria-label="Anterior video"
              >
                ⬅
              </button>
              <div className="video-list">
                {uniqueVideos.map((video) => (
                  <div className={`video-card ${cardClass}`} key={video.id}>
                    <img
                      className="video-card-image"
                      src={video.imageUrl}
                      alt={video.title}
                      onClick={() => handleVideoClick(video.videoUrl)}
                      style={{ cursor: 'pointer' }}
                    />
                    <div className="video-footer">
                      <button onClick={() => handleEdit(video)}>
                        <FaEdit /> Editar{/* Ícono de editar */}
                      </button>
                      <button onClick={() => onDelete(video)}>
                        <FaTrashAlt /> Borrar{/* Ícono de eliminar */}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-btn next-btn"
                onClick={() => handleNext(category)}
                aria-label="Siguiente video"
              >
                ➡
              </button>
            </div>
          </div>
        );
      })}
      {isModalOpen && (
        <EditModal
          video={selectedVideo}
          onClose={handleCloseModal}
          onEdit={onEdit}
        />
      )}
    </section>
  );
};

export default Categories;
