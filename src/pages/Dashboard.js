import React from 'react';
import TestimonialAdmin from '../components/UI/TestimonialAdmin';
import CarsAdmin from '../components/UI/CarsAdmin';
import ServicesAdmin from '../components/UI/ServicesAdmin';
import OpeningHoursAdmin from '../components/UI/OpeningHoursAdmin';
import '../styles/dashboard.css'

const Dashboard = () => {
  return (
    <>
      <section>
        <TestimonialAdmin />
      </section>

      <section>
        <CarsAdmin />
      </section>

      <section>
        <ServicesAdmin />
      </section>

      <section>
        <OpeningHoursAdmin />
      </section>
    </>
  );
};

export default Dashboard;
