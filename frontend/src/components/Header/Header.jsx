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

  const closeMenu = () => {
    if (menuRef.current.classList.contains("show__menu")) {
      menuRef.current.classList.remove("show__menu");
    }
  };

  const handleNavClick = () => {
    closeMenu();
  };

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

            {/*menu*/}
            <div className="navigation" ref={menuRef}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    {item.requiresAuth && !user ? (
                      <Link
                        to="/login"
                        className="nav-link login-required"
                        title="Login required"
                      >
                        {item.display} <i className="ri-lock-line"></i>
                      </Link>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active__link" : ""
                        }
                        onClick={handleNavClick}
                      >
                        {item.display}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
              <div className="menu-backdrop" onClick={closeMenu}></div>
            </div>
            {/*menu end*/}

            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-3">
                {user ? (
                  <>
                    <h5 className="mb-0">
                      {user?.data?.data?.username || "User"}
                    </h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  // Only show auth buttons if not on an auth page
                  !isAuthPage && (
                    <div className="auth-buttons d-flex align-items-center gap-3">
                      <Button className="btn primary__btn auth-btn">
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button className="btn outline-btn auth-btn">
                        <Link to="/register">Register</Link>
                      </Button>
                    </div>
                  )
                )}
              </div>

              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
