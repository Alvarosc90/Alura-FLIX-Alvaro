import React from 'react';
import '../css/Home.css';
import Categories from './Categories';

const Home = ({ categories, onEdit, onDelete }) => {

    // Obtener el primer video de la categoría "FRONT END"
    const firstVideo = categories['FRONT END'] && categories['FRONT END'].length > 0 ? categories['FRONT END'][0] : null;

    // Función para manejar el clic en la imagen del video y redirigir al enlace del video
    const handleVideoClick = (videoUrl) => {
        if (videoUrl) {
            window.open(videoUrl, '_blank'); // Abre el enlace del video en una nueva pestaña
        }
    };

    return (
        <div>
            {/* Banner */}
            <div className="home">
                <section className="banner">
                    <div className="banner-content">
                        <div className="left-column">
                            <div className="category-link">
                                <h3 className='category-link-button'>{firstVideo ? firstVideo.category : 'Categoria'}</h3>
                            </div>
                            <h1 className="title-medium">Challenge React</h1>
                            <p className="body-medium">
                                Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.
                            </p>
                        </div>
                        <div className="right-column">
                            {firstVideo && firstVideo.imageUrl ? (
                                <div 
                                    className="video-thumbnail" 
                                    onClick={() => handleVideoClick(firstVideo.videoUrl)} // Llamada correcta solo al hacer clic en la imagen
                                >
                                    <img 
                                        src={firstVideo.imageUrl} 
                                        alt={firstVideo.title} 
                                        className="video-thumbnail-image" 
                                    />
                                </div>
                            ) : (
                                <div className="video-thumbnail">
                                    <p>No hay videos disponibles</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            {/* Categorías y botones de edición/eliminación */}
            <Categories 
                categories={categories} 
                onEdit={onEdit} // Botón de editar sin cambiar comportamiento
                onDelete={onDelete} // Botón de eliminar sin cambiar comportamiento
            />
        </div>
    );
};

export default Home;
