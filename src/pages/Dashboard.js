import React from 'react';
import TestimonialAdmin from '../components/UI/TestimonialAdmin';
import CarsAdmin from '../components/UI/CarsAdmin';
import ServicesAdmin from '../components/UI/ServicesAdmin';
import OpeningHoursAdmin from '../components/UI/OpeningHoursAdmin';
import '../styles/dashboard.css'
import { useSelector } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';

const Dashboard = () => {
  const { isAuth } = useSelector((state) => state.auth)
  const role = secureLocalStorage.getItem('role')

  return (
    <>
      {isAuth && role === 'admin' && (
        <>
          <section>
            <ServicesAdmin />
          </section>

          <section>
            <OpeningHoursAdmin />
          </section>
        </>
      )}

      <section>
        <CarsAdmin />
      </section>

      <section>
        <TestimonialAdmin />
      </section>
    </>
  );
};

export default Dashboard;
