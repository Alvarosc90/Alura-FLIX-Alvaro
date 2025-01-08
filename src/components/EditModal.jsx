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
      .then((data) => {
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
        <h2>Editar Video</h2>
        <input
          type="text"
          name="title"
          value={editedVideo.title}
          onChange={handleInputChange}
          placeholder="Título del video"
        />
        <input
          type="text"
          name="category"
          value={editedVideo.category}
          onChange={handleInputChange}
          placeholder="Categoría"
        />
        <input
          type="text"
          name="imageUrl"
          value={editedVideo.imageUrl}
          onChange={handleInputChange}
          placeholder="URL de la imagen"
        />
        <input
          type="text"
          name="videoUrl"
          value={editedVideo.videoUrl}
          onChange={handleInputChange}
          placeholder="URL del video"
        />
        <textarea
          name="description"
          value={editedVideo.description}
          onChange={handleInputChange}
          placeholder="Descripción del video"
        />
        <div>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={handleClear}>Limpiar</button>
          <button className="close" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
