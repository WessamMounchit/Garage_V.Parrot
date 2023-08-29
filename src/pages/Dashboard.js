import React from 'react';
import Layout from '../components/Layout';
import TestimonialAdmin from '../components/UI/TestimonialAdmin';
import CarsAdmin from '../components/UI/CarsAdmin';

const Dashboard = () => {
  return (
    <Layout>
      <section>
        <TestimonialAdmin />
      </section>
      <section>
        <CarsAdmin />
      </section>
    </Layout>
  );
};

export default Dashboard;
