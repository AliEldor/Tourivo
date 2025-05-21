import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../router/Routers.jsx";
import ScrollToTop from "../ScrollToTop";

const Layout = () => {
  const location = useLocation();

  const hideFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <div>
      <ScrollToTop />
      <Header />
      <Routers />
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
