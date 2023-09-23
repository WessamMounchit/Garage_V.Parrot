import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../api/auth";
import secureLocalStorage from "react-secure-storage";
import { unauthenticateUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap";
import Login from "../Administration/Employee/Login";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.css";
import CustomModal from "../UI/CustomModal";

function Header() {
  const { isAuth } = useSelector((state) => state.auth);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const expand = "xl"; //false, 'sm', 'md', 'lg', 'xl', 'xxl'

  const dispatch = useDispatch();

  const logout = async (e) => {
    try {
      e.preventDefault();

      const response = await onLogout();
      secureLocalStorage.clear();
      dispatch(unauthenticateUser());

      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);

  const authButton = isAuth ? (
    <button className="custom__btn" onClick={(e) => logout(e)}>
      Se déconnecter
    </button>
  ) : (
    <button className="custom__btn" onClick={() => setIsLoginModalOpen(true)}>
      Espace professionel
    </button>
  );

  const closeButton = () => {
    document.querySelector("button.btn-close").click();
  };

  return (
    <header className="w-100 d-flex justify-content-between">
      <Navbar expand={expand} className="bg-body-tertiary w-100 p-0">
        <Container fluid style={{ backgroundColor: "white" }}>
          <Navbar.Brand>
            <Link to="/" className="logo d-flex align-items-center">
              <img src={logo} alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header className="canvas__header" closeButton>
              <Offcanvas.Title
                className="canvas__title"
                id={`offcanvasNavbarLabel-expand-${expand}`}
              >
                <Link to="/" className="logo d-flex align-items-center gap-2">
                  <img src={logo} alt="logo" />
                </Link>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="canvas__body">
              <Nav className="nav nav__container">
                <NavLink to="/" onClick={closeButton}>
                  Accueil
                </NavLink>
                <NavLink to="/cars" onClick={closeButton}>
                  Nos voitures
                </NavLink>
                <NavLink to="/about" onClick={closeButton}>
                  À propos
                </NavLink>
                <NavLink to="/contact" onClick={closeButton}>
                  Contact
                </NavLink>
                {isAuth && (
                  <NavLink to="/dashboard" onClick={closeButton}>
                    Gestion
                  </NavLink>
                )}
              </Nav>
              <div className="button__container">{authButton}</div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <CustomModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Se connecter à son espace professionel"
      >
        <Login closeLoginModal={closeLoginModal} />
      </CustomModal>
    </header>
  );
}

export default Header;
