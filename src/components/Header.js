import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { onLogout } from '../api/auth';
import secureLocalStorage from 'react-secure-storage';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

function Header() {

  const { isAuth } = useSelector((state) => state.auth)
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

  const authButton = isAuth ? (
    <button type="button" className="btn btn-primary m-2" onClick={e => logout(e)}>
      Logout
    </button>
  ) : (
    <Link to="/login">
      <button type="button" className="btn btn-primary m-2">
        Login
      </button>
    </Link>
  );

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/home">Garage Vincent Parrot</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/home" activeClassName="active">Accueil</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home" activeClassName="active">Services</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home" activeClassName="active">À propos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home" activeClassName="active">Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="header-right">
          {authButton}
        </div>
      </nav>
    </header>
  );
}

export default Header;
