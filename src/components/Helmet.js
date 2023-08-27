import React from "react";

const Helmet = ({ children, title }) => {
  document.title = "Rent Car Service - " + title;
  return <div className="w-100">{children}</div>;
};

export default Helmet;
