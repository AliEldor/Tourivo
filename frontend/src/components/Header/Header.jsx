import React, { useEffect, useRef, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

import logo from "../../assets/images/Tourivo2.png";
import "./header.css";
import { AuthContext } from "./../../context/AuthContext.jsx";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
  {
    path: "/generate-trip",
    display: "Generate Trip",
    requiresAuth: true,
  },
  {
    path: "/photo-detection",
    display: "Photo AI",
    requiresAuth: true,
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isAuthPage = isLoginPage || isRegisterPage;

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div
            className="nav__wrapper d-flex align-items-center
        justify-content-between"
          >
            {/*logo*/}
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Tourivo" />
              </Link>
            </div>
            {/*logo end */}

            
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
