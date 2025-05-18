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

  
};

export default Header;
