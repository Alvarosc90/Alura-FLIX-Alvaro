import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/NewVideo.css';

const NewVideo = ({ addVideo }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'FRONT END', // Valor por defecto
    imageUrl: '',
    videoUrl: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar la solicitud para agregar el video
    fetch('http://localhost:3001/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Video guardado:', data);
        addVideo(data); // Asegúrate de actualizar el estado del componente padre
        navigate('/'); // Redirige al Home
      })
      .catch((error) => {
        console.error('Error al guardar el video:', error);
      });
  };

  return (
    <div className="new-video">
      <h1>Registrar Nuevo Video</h1>
      <form className="new-video-form" onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Categoría:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="FRONT END">FRONT END</option>
            <option value="BACK END">BACK END</option>
            <option value="INNOVACION Y GESTIÓN">INNOVACION Y GESTIÓN</option>
          </select>
        </label>
        <label>
          Enlace de la Imagen:
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Enlace del Video:
          <input
            type="url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default NewVideo;
