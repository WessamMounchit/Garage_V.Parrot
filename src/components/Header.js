import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onLogout } from '../api/auth';
import secureLocalStorage from 'react-secure-storage';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { Button, Modal, Nav, Navbar, Container, Offcanvas } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';

function Header() {

  const { isAuth } = useSelector((state) => state.auth)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const expand = 'xl'; //false, 'sm', 'md', 'lg', 'xl', 'xxl'
  const role = secureLocalStorage.getItem('role')



  const dispatch = useDispatch()

  const logout = async e => {
    try {
      e.preventDefault()

      const response = await onLogout()
      console.log(response)
      secureLocalStorage.clear()
      dispatch(unauthenticateUser())

      toast.success(response.data.message)

    } catch (error) {
      console.error(error.message);
    }
  }

  const closeLoginModal = () => setIsLoginModalOpen(false);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const authButton = isAuth ? (
    <button type="button" className="btn btn-primary m-2" onClick={e => logout(e)}>
      Se déconnecter
    </button>
  ) : (
    //<Link to="/login">
    <button type="button" className="btn btn-primary m-2" onClick={() => setIsLoginModalOpen(true)}>
      Espace professionel
    </button>
    //</Link>
  );

  return (
    <header>
      <Navbar expand={expand} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Garage Vincent Parrot</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Garage Vincent Parrot
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Accueil</Nav.Link>
                <Nav.Link href="#action2">Services</Nav.Link>
                <Nav.Link href="#action3">À propos</Nav.Link>
                <Nav.Link href="#action4">Contact</Nav.Link>
                <Nav.Item>{authButton}</Nav.Item>
                {isAuth && role === 'admin' && <Nav.Item>
                  <button
                    type="button"
                    className="btn btn-primary m-2"
                    onClick={() => setIsRegisterModalOpen(true)}>
                    Créer un compte employé
                  </button>
                </Nav.Item>}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Modal show={isLoginModalOpen} onHide={() => setIsLoginModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Se connecter à son espace professionel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login closeLoginModal={closeLoginModal} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setIsLoginModalOpen(false)}>Fermer</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isRegisterModalOpen} onHide={() => setIsRegisterModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Créer un compte employé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register closeRegisterModal={closeRegisterModal} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setIsRegisterModalOpen(false)}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}

export default Header;
