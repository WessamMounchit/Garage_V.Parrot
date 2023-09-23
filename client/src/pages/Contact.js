import React, { useEffect } from "react";
import CommonSection from "../components/UI/CommonSection";
import FormContact from "../components/UI/FormContact";
import Helmet from "../components/UI/Helmet";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <FormContact />
    </Helmet>
  );
};

export default Contact;
