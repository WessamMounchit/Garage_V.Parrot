import React from 'react';
import TestimonialAdmin from '../components/UI/TestimonialAdmin';
import CarsAdmin from '../components/UI/CarsAdmin';
import ServicesAdmin from '../components/UI/ServicesAdmin';

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
    </>
  );
};

export default Dashboard;
