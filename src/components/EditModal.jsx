import React, { useState, useEffect } from 'react';
import '../css/EditModal.css';

const EditModal = ({ video, onClose, onEdit }) => {
  const [editedVideo, setEditedVideo] = useState(video);

  useEffect(() => {
    setEditedVideo(video); // Cuando el modal se abra, seteamos el video a editar
  }, [video]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVideo((prevVideo) => ({
      ...prevVideo,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Enviar la solicitud PUT para actualizar el video en db.json
    fetch(`http://localhost:3001/videos/${editedVideo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedVideo),
    })
      .then((response) => response.json())
      .then(() => {
        onEdit(editedVideo); // Actualizamos el estado en el componente principal
        onClose(); // Cerramos el modal
      })
      .catch((error) => {
        console.error('Error al guardar el video:', error);
      });
  };

  const handleClear = () => {
    // Limpiar los campos del formulario
    setEditedVideo({
      title: '',
      category: '',
      imageUrl: '',
      videoUrl: '',
      description: '',
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-show">
        <h2>Editar Card</h2>
        <form className="edit-video-form">
          <label>
            Título:
            <input
              type="text"
              name="title"
              value={editedVideo.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Categoría:
            <select
              name="category"
              value={editedVideo.category}
              onChange={handleInputChange}
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
              value={editedVideo.imageUrl}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Enlace del Video:
            <input
              type="url"
              name="videoUrl"
              value={editedVideo.videoUrl}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="description"
              value={editedVideo.description}
              onChange={handleInputChange}
              required
            />
          </label>
        </form>
        <div className="modal-buttons">
          <button className="save" onClick={handleSave}>Guardar</button>
          <button className="clean" onClick={handleClear}>Limpiar</button>
          <button className="close" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
