// Importa React y useState desde React
import React, { useState } from 'react';

// Importa los estilos de Bootstrap y los estilos locales
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Importa los componentes necesarios
import List from './components/list';
import Create from './components/create';
import Usuarios from './components/usuarios';

// Función principal del componente App
function App() {
  // Estados para controlar la apertura y cierre de los modales
  const [modalcrear, setmodalcrear] = useState(false);
  const [showUsuariosModal, setShowUsuariosModal] = useState(false);

  // Función para manejar la apertura del modal de creación
  const handlemodalcrear = () => {
    setmodalcrear(true);
  };

  // Función para cerrar el modal de creación
  const cierremodalcrear = () => {
    setmodalcrear(false);
  };

  // Función para manejar la apertura del modal de usuarios
  const handleShowUsuariosModal = () => {
    setShowUsuariosModal(true);
  };

  // Función para cerrar el modal de usuarios
  const cierremodalusers = () => {
    setShowUsuariosModal(false);
  };

  // Renderizado del componente App
  return (
    <div className="hero App-Header">
      <div className="hero__title fadeInUpAnimation">
        {/* Botones para mostrar los modales */}
        <div className="d-flex justify-content-start superior">
          <button className="custom-button m-1" onClick={handleShowUsuariosModal}>
            Usuarios
          </button>
          <button className="custom-button m-1" onClick={handlemodalcrear}>
            Agregar tarea
          </button>
        </div>

        {/* Contenedor de la lista de tareas */}
        <div className="scroll-container lista rounded">
          <List></List>
        </div>

        {/* Condicional para renderizar el modal de creación */}
        {modalcrear && <Create onClose={cierremodalcrear} />}
        {/* Condicional para renderizar el modal de usuarios */}
        {showUsuariosModal && <Usuarios onClose={cierremodalusers} />}
      </div>

    </div>
  );
}

// Exporta el componente App como predeterminado
export default App;
