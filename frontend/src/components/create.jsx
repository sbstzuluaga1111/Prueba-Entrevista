import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Create = ({ onClose }) => {
  const [newTask, setNewTask] = useState({
    titulo: '',
    descripcion: '',
    estado: '',
    usuario_id: '',
    tiempo_inicio: '',
    tiempo_final: '',
  });

  const [usuarios, setUsuarios] = useState([]);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    // Realiza la solicitud HTTP para obtener los usuarios
    fetch('http://localhost:3000/leer/usuarios')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    // Validar si todos los campos requeridos están llenos
    const formIsValid = Object.values(newTask).every((value) => value !== '');
    setIsValid(formIsValid);

    if (formIsValid) {
      try {
        // Realiza la solicitud HTTP para crear la tarea
        await fetch('http://localhost:3000/crear/tarea', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });

        onClose();

        console.log('Tarea creada con éxito');

        // Recarga la página después de cerrar el modal
        window.location.reload();
      } catch (error) {
        console.error('Error al crear tarea:', error);
      }
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='m-2' controlId="formTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el título"
              name="titulo"
              value={newTask.titulo}
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
              value={newTask.descripcion}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className='m-2' controlId="formEstado">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              as="select"
              name="estado"
              value={newTask.estado}
              onChange={handleInputChange}
              required
            >
            <option value="Estado">Seleciona un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_progreso">En Progreso</option>
              <option value="completa">Completa</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className='m-2' controlId="formUsuarioId">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              as="select"
              name="usuario_id"
              value={newTask.usuario_id}
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
              value={newTask.tiempo_inicio}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className='m-2' controlId="formTiempoFinal">
            <Form.Label>Tiempo Final</Form.Label>
            <Form.Control
              type="datetime-local"
              name="tiempo_final"
              value={newTask.tiempo_final}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {!isValid && (
            <div className="alert alert-danger m-3" role="alert">
              Por favor, complete todos los campos.
            </div>
          )}

          <Button variant="primary m-2" onClick={handleCreate}>
            Guardar Tarea
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Create;
