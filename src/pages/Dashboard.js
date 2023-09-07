import React from 'react';
import TestimonialAdmin from '../components/UI/TestimonialAdmin';
import CarsAdmin from '../components/UI/CarsAdmin';
import ServicesAdmin from '../components/UI/ServicesAdmin';
import OpeningHoursAdmin from '../components/UI/OpeningHoursAdmin';
import '../styles/dashboard.css'
import { useSelector } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
import Helmet from '../components/Helmet';
import CommonSection from '../components/UI/CommonSection';
import EmployeeAdmin from '../components/UI/EmployeeAdmin'
import { Col } from 'react-bootstrap';

const Dashboard = () => {
  const { isAuth } = useSelector((state) => state.auth)
  const role = secureLocalStorage.getItem('role')
  const name = secureLocalStorage.getItem('name')

  return (
    <Helmet title="Gestion">
      <CommonSection title={isAuth && role === 'admin' ? 'Gestion Administrateur' : 'Gestion Employé'} />

      <div className='welcome-container'>
        <p className='welcome'>
          Bienvenue dans votre espace {name}
        </p>
      </div>

      {isAuth && role === 'admin' && (
        <>
          <section>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Gestion des</h6>
              <h2 className="section__title">Services</h2>
            </Col>
            <ServicesAdmin />
          </section>

          <section>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Gestion des</h6>
              <h2 className="section__title">Horraires</h2>
            </Col>
            <OpeningHoursAdmin />
          </section>

          <section>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Gestion des</h6>
              <h2 className="section__title">Employés</h2>
            </Col>
            <EmployeeAdmin />
          </section>
        </>
      )}

      <section>
        <Col lg="12" className="mb-4 text-center">
          <h6 className="section__subtitle">Gestion des</h6>
          <h2 className="section__title">Voitures</h2>
        </Col>
        <CarsAdmin />
      </section>

      <section>
        <Col lg="12" className="mb-4 text-center">
          <h6 className="section__subtitle">Gestion des</h6>
          <h2 className="section__title">Avis</h2>
        </Col>
        <TestimonialAdmin />
      </section>
    </Helmet>
  );
};

export default Dashboard;
