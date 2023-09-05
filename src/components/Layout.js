import React, { Fragment } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Routers from "../../src/routers/Routers";

const Layout = () => {
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
