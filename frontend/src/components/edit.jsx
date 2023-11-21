import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


const Edit = ({ task, onClose }) => {
    const formatDateForInput = (dateString) => {
      const dateObject = new Date(dateString);
      const formattedDate = dateObject.toISOString().slice(0, 16);
      return formattedDate;
    };
  
    const [editedTask, setEditedTask] = useState({
      titulo: task.titulo || '',
      descripcion: task.descripcion || '',
      estado: task.estado || '',
      usuario_id: task.usuario_id || '',
      tiempo_inicio: formatDateForInput(task.tiempo_inicio) || '',
      tiempo_final: formatDateForInput(task.tiempo_final) || '',
    });
  
    const [usuarios, setUsuarios] = useState([]);
    const [estados, setEstados] = useState([]);
    const [isValid, setIsValid] = useState(true);
  
    useEffect(() => {
      // Realizar la solicitud HTTP para obtener los usuarios
      fetch('http://localhost:3000/leer/usuarios')
        .then((response) => response.json())
        .then((data) => setUsuarios(data))
        .catch((error) => console.error('Error al obtener usuarios:', error));
  
      // Obtener estados definidos en la enumeración
      const estadosEnumeracion = ['pendiente', 'en_progreso', 'completa'];
      setEstados(estadosEnumeracion);
    }, []);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    };
  
    const handleEdit = async () => {
      // Validar si todos los campos requeridos están llenos
      const formIsValid = Object.values(editedTask).every((value) => value !== '');
      setIsValid(formIsValid);
  
      if (formIsValid) {
        try {
          // Realizar la solicitud HTTP para editar la tarea
          await fetch(`http://localhost:3000/actualizar/tarea/${task._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedTask),
          });
  
          onClose();
  
          console.log('Tarea editada con éxito');
  
          // Recargar la página después de cerrar el modal
          window.location.reload();
        } catch (error) {
          console.error('Error al editar tarea:', error);
        }
      }
    };
  

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='m-2' controlId="formTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el título"
              name="titulo"
              value={editedTask.titulo}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className='m-2' controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese la descripción"
              name="descripcion"
              value={editedTask.descripcion}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className='m-2' controlId="formEstado">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              as="select"
              name="estado"
              value={editedTask.estado}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar Estado</option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className='m-2' controlId="formUsuarioId">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              as="select"
              name="usuario_id"
              value={editedTask.usuario_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar Usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario._id} value={usuario._id}>
                  {usuario.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className='m-2' controlId="formTiempoInicio">
            <Form.Label>Tiempo de Inicio</Form.Label>
            <Form.Control
              type="datetime-local"
              name="tiempo_inicio"
              value={editedTask.tiempo_inicio}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className='m-2' controlId="formTiempoFinal">
            <Form.Label>Tiempo Final</Form.Label>
            <Form.Control
              type="datetime-local"
              name="tiempo_final"
              value={editedTask.tiempo_final}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {!isValid && (
            <div className="alert alert-danger m-3" role="alert">
              Por favor, complete todos los campos.
            </div>
          )}

          <Button variant="primary m-2" onClick={handleEdit}>
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Edit;
