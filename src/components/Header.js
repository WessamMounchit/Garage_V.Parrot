import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLogout } from '../api/auth';
import secureLocalStorage from 'react-secure-storage';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { Button, Modal, Nav, Navbar, Container, Offcanvas } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'
import './Header.css'

function Header() {

  const { isAuth } = useSelector((state) => state.auth)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const expand = 'xl'; //false, 'sm', 'md', 'lg', 'xl', 'xxl'



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
    <button className="custom__btn" onClick={e => logout(e)}>
      Se déconnecter
    </button>
  ) : (
    //<Link to="/login">
    <button className="custom__btn" onClick={() => setIsLoginModalOpen(true)}>
      Espace professionel
    </button>
    //</Link>
  );



  const closeButton = () => {
    document.querySelector('button.btn-close').click();
  };

  return (
    <header className='w-100 d-flex justify-content-between'>
      <Navbar expand={expand} className="bg-body-tertiary w-100 p-0">
        <Container fluid>
          <Navbar.Brand href="#">
            <Link to="/" className="logo d-flex align-items-center">
              <img src={logo} alt='logo' />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header className='canvas__header' closeButton>
              <Offcanvas.Title className='canvas__title' id={`offcanvasNavbarLabel-expand-${expand}`}>
                <Link to="/" className="logo d-flex align-items-center gap-2">
                  <img src={logo} alt='logo' />
                </Link>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='canvas__body'>
              <Nav className="nav nav__container">
                <NavLink to="/" onClick={closeButton}>Accueil</NavLink>
                <NavLink to="/cars" onClick={closeButton}>Nos voitures</NavLink>
                <NavLink to="/about" onClick={closeButton}>À propos</NavLink>
                <NavLink to="/contact" onClick={closeButton}>Contact</NavLink>
                {isAuth && <NavLink to="/dashboard" onClick={closeButton}>Gestion</NavLink>}
              </Nav>
              <div className="button__container">
                {authButton}
              </div>
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
          <button className='custom__btn' onClick={() => setIsRegisterModalOpen(false)}>Fermer</button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}

export default Header;
