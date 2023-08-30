import React from 'react';
import Layout from '../components/Layout';
import TestimonialAdmin from '../components/UI/TestimonialAdmin';
import CarsAdmin from '../components/UI/CarsAdmin';
import ServicesAdmin from '../components/UI/ServicesAdmin';

const Dashboard = () => {
  return (
    <Layout>
      <section>
        <TestimonialAdmin />
      </section>

      <section>
        <CarsAdmin />
      </section>

      <section>
        <ServicesAdmin />
      </section>
    </Layout>
  );
};

export default Dashboard;
