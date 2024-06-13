import React, { useState, useEffect } from 'react';
import '../style/Presentacion.css';
import { faFilm, faVideo, faPlayCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Presentacion = () => {
  const [presentaciones, setPresentaciones] = useState([]);
  const [selectedPresentacion, setSelectedPresentacion] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [buttonIcon, setButtonIcon] = useState(faFilm);

  useEffect(() => {
    fetch('http://localhost:3000/presentar')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPresentaciones(data);
          if (data.length > 0) {
            setSelectedPresentacion(data[0]); // Seleccionar la primera presentación por defecto
          }
        } else {
          console.error('La respuesta de la API no es un array:', data);
        }
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  const handleSelectChange = (event) => {
    const selectedNombre = event.target.value;
    const presentacion = presentaciones.find(p => p.nombre === selectedNombre);
    setSelectedPresentacion(presentacion);
    setSelectedVideoIndex(0); // Reset video index when a new presentation is selected
  };

  const botonver = () => {
    setIsTitleVisible(!isTitleVisible);
    setButtonIcon(isTitleVisible ? faTimes : faFilm);
  };

  const handleButtonClick = (index) => {
    setSelectedVideoIndex(index);
  };

  return (
    <div className='cuerpo_general'>
      <div className='cuerpo_general_interno'>

        <div className='palabra-es'>
          <div className='texto_sele'>
            <p>Cambiar Palabra :</p>
          </div>
          <div className='seleccionador'>
            <select onChange={handleSelectChange}>
              {presentaciones.map((presentacion, index) => (
                <option key={index} value={presentacion.nombre}>
                  {presentacion.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedPresentacion ? (
          <div className='padre__'>
            <div className='contenedor_images'>
              <div className='images_con'>
                <div className='imagen__'>
                  <img className='imagen_servid' src={`http://localhost:3000${selectedPresentacion.imagen}`} alt={selectedPresentacion.nombre} />
                </div>
                <div className='titulo_images'>
                  {isTitleVisible && (
                    <h2>{selectedPresentacion.nombre}</h2>
                  )}
                </div>
                <div className='boton_ver'>
                  <button onClick={botonver}>
                    <FontAwesomeIcon icon={buttonIcon} />
                  </button>
                </div>
              </div>
            </div>
            <div className='contendor_generalvideo'>
              <div className='contendor_hijo_video'>
                <div className='video-container'>
                  <div className='video_con'>
                    <h3>{selectedPresentacion.titulos[selectedVideoIndex].titulo}</h3>
                    <video className='custom-video' controls>
                    <p>{`http://localhost:3000/${selectedPresentacion.titulos[selectedVideoIndex].video}`}</p>
                    <source src={`http://localhost:3000${selectedPresentacion.titulos[selectedVideoIndex].video}`} type="video/mp4" />
                      Tu navegador no soporta la reproducción de videos.
                    </video>
                  </div>
                </div>
                <div className='button-container'>
                  {selectedPresentacion.titulos.map((titulo, index) => (
                    <button 
                      key={index}
                      onClick={() => handleButtonClick(index)}
                      className={`video-button ${selectedVideoIndex === index ? 'active' : ''}`}
                    >
                      <FontAwesomeIcon icon={index === 0 ? faVideo : index === 1 ? faPlayCircle : faFilm} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
};

export default Presentacion;
