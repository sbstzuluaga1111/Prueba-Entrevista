import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Form, Alert } from 'react-bootstrap';
import '../App.css';

const Usuarios = ({ onClose }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: '',
    nombre: '',
    correo: '',
  });
  const [error, setError] = useState('');
  const [errorAgregarUsuario, setErrorAgregarUsuario] = useState('');

  useEffect(() => {
    // Realiza la solicitud HTTP para obtener la lista de usuarios
    fetch('http://localhost:3000/leer/usuarios')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []);

  const handleEliminarUsuario = async (id) => {
    try {
      // Realiza la solicitud HTTP para eliminar un usuario por ID
      await fetch(`http://localhost:3000/eliminar/usuario/${id}`, {
        method: 'DELETE',
      });

      // Actualiza la lista de usuarios después de la eliminación
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario._id !== id));
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const handleAgregarUsuario = async () => {
    try {
      // Validar si hay campos vacíos
      if (!nuevoUsuario.username || !nuevoUsuario.nombre || !nuevoUsuario.correo) {
        setErrorAgregarUsuario('Todos los campos son obligatorios.');
        return;
      }

      // Validar el formato del correo
      const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!correoRegex.test(nuevoUsuario.correo)) {
        setErrorAgregarUsuario('El formato del correo electrónico no es válido.');
        return;
      }

      // Validar si ya existe un usuario con el mismo correo
      const usuarioExistente = usuarios.find((usuario) => usuario.correo === nuevoUsuario.correo);
      if (usuarioExistente) {
        setErrorAgregarUsuario('Ya existe un usuario con ese correo electrónico.');
        return;
      }

      // Realiza la solicitud HTTP para crear un nuevo usuario
      const response = await fetch('http://localhost:3000/crear/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (response.ok) {
        // Actualiza la lista de usuarios después de la creación
        const nuevoUsuarioCreado = await response.json();
        setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuarioCreado]);

        // Cierra el modal de agregar usuario
        setShowAgregarModal(false);
      } else {
        setErrorAgregarUsuario('Error al crear usuario');
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const handleShowAgregarModal = () => {
    setShowAgregarModal(true);
    setError('');
    setErrorAgregarUsuario('');
  };

  const handleCloseAgregarModal = () => {
    setShowAgregarModal(false);
    setError('');
    setErrorAgregarUsuario('');
  };

  const handleNuevoUsuarioChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  return (
    <div className='container'>
      <div className='App-header'>
        {/* Modal para mostrar la lista de usuarios */}
        <Modal show={true} onHide={onClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Lista de Usuarios</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo Electrónico</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario._id}>
                      <td>{usuario._id}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.correo}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleEliminarUsuario(usuario._id)}>
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleShowAgregarModal}>
              Agregar Usuario
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para agregar usuario */}
        <Modal show={showAgregarModal} onHide={handleCloseAgregarModal}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorAgregarUsuario && <Alert variant="danger">{errorAgregarUsuario}</Alert>}
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre de usuario"
                  name="username"
                  value={nuevoUsuario.username}
                  onChange={handleNuevoUsuarioChange}
                />
              </Form.Group>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre completo"
                  name="nombre"
                  value={nuevoUsuario.nombre}
                  onChange={handleNuevoUsuarioChange}
                />
              </Form.Group>
              <Form.Group controlId="formCorreo">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese el correo electrónico"
                  name="correo"
                  value={nuevoUsuario.correo}
                  onChange={handleNuevoUsuarioChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAgregarModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleAgregarUsuario}>
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Usuarios;
