import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import Edit from './edit';
import '../css/list.css';

const List = () => {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);
  // Estado para almacenar los usuarios
  const [users, setUsers] = useState({});
  // Estado para manejar la tarea expandida
  const [expandedTask, setExpandedTask] = useState(null);
  // Estado para manejar la paginación
  const [currentPage, setCurrentPage] = useState(1);
  // Estado para la tarea seleccionada para editar
  const [selectedTask, setSelectedTask] = useState(null);

  // Cantidad de tareas por página
  const tasksPerPage = 10;

  // Efecto para cargar las tareas y los usuarios al montar el componente
  useEffect(() => {
    // Obtener tareas
    fetch('http://localhost:3000/leer/tareas')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error al obtener tareas:', error));

    // Obtener usuarios y mapearlos por ID
    fetch('http://localhost:3000/leer/usuarios')
      .then((response) => response.json())
      .then((data) => {
        const usersMap = {};
        data.forEach((user) => {
          usersMap[user._id] = user.nombre;
        });
        setUsers(usersMap);
      })
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []);

  // Manejar la expansión de la tarea al hacer clic
  const handleToggle = (taskId) => {
    setExpandedTask((prevTask) => (prevTask === taskId ? null : taskId));
  };

  // Manejar la edición de la tarea
  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  // Manejar la eliminación de la tarea
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta tarea?');

    if (confirmDelete) {
      try {
        // Realizar solicitud HTTP para eliminar la tarea por ID
        await fetch(`http://localhost:3000/eliminar/tarea/${taskId}`, {
          method: 'DELETE',
        });

        // Recargar la página después de la eliminación
        window.location.reload();

        console.log('Tarea eliminada con ID:', taskId);
      } catch (error) {
        console.error('Error al eliminar tarea:', error);
      }
    }
  };

  // Calcular el índice de la última tarea en la página actual
  const indexOfLastTask = currentPage * tasksPerPage;
  // Calcular el índice de la primera tarea en la página actual
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  // Obtener las tareas actuales para mostrar en la página
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Función para cambiar la página actual
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='center formulario' style={{ position: 'relative', width: '90%' }}>
      <h1 style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '10px', zIndex: 1 }}>
        Lista de Tareas
      </h1>
  
      <ul className="list-group" style={{ position: 'relative', marginTop: '50px' }}>
  {currentTasks.map((task) => (
    <li
      key={task._id}
      className={`list-group-item ${expandedTask === task._id ? 'expanded' : ''}`}
      style={{
        maxHeight: expandedTask === task._id ? '600px' : '200px',
        overflow: 'hidden',
        transition: 'max-height 0.5s ease, transform 0.2s ease',
      }}
    >
      <div
        className={`d-flex justify-content-between align-items-center p-2 rounded text-white ${expandedTask === task._id ? 'expanded' : ''}`}
        style={{
          cursor: 'pointer',
          position: 'relative',
          backgroundColor: expandedTask === task._id ? 'rgba(0, 123, 255, 0.7)' : 'rgba(0, 123, 255, 0.5)',
          transition: 'background-color 0.5s ease',
        }}
        onClick={() => handleToggle(task._id)}
      >
        <span className='hove' style={{ color: expandedTask === task._id ? 'white' : 'black' }}>
          {task.titulo}
        </span>
        <div className="d-flex justify-content-end mt-2 align-items-center flex-column flex-sm-row">
          <button className="btn btn-warning m-2 rounded-top" onClick={() => handleEdit(task)}>
            Editar
          </button>
          <button className="btn btn-danger ml-2 m-2 rounded-top" onClick={() => handleDelete(task._id)}>
            Eliminar
          </button>
        </div>
      </div>

      {expandedTask === task._id && (
        <div
          className='contenidolit m-3 fadeInUpAnimation'
          style={{
            position: 'relative',
            overflow: 'hidden',
            transition: 'max-height 0.5s ease',
            maxHeight: '500px',
            textAlign: 'justify',
          }}
        >
          <br />
          <div className="container bg-light p-3 rounded">
            <strong className="font-weight-bold">Descripción:</strong>
            <p>{task.descripcion}</p>
          </div>
          <div className='container'>
            <strong>Estado:</strong> {task.estado} <br />
            <strong>Usuario:</strong> {users[task.usuario_id] || 'Sin asignar'} <br />
            <strong>Tiempo Inicio:</strong> {new Date(task.tiempo_inicio).toLocaleString()} <br />
            <strong>Tiempo Final:</strong> {new Date(task.tiempo_final).toLocaleString()} <br />
          </div>
        </div>
      )}
    </li>
  ))}
</ul>
  
      <Pagination className="mt-3 d-flex justify-content-center" style={{ backgroundColor: expandedTask ? 'rgba(0, 123, 255, 0.7)' : 'rgba(0, 123, 255, 0.5)' }}>
      {[...Array(Math.ceil(tasks.length / tasksPerPage)).keys()].map((number) => (
        <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
          {number + 1}
        </Pagination.Item>
      ))}
    </Pagination>

    {selectedTask && (
      <Edit
        task={selectedTask}
        onClose={() => {
          setSelectedTask(null);
        }}
      />
    )}
  </div>
  );
};

export default List;