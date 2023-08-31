import React, { Fragment } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Routers from "../../src/routers/Routers";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Layout = () => {

  const PrivateRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth)
    return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
  }

  const RestrictedRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth)

    return <>{!isAuth ? <Outlet /> : <Navigate to='/' />}</>
  }


  return (
    <Fragment>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
