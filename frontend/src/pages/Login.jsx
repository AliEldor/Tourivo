import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import loginImg from "../assets/images/login-img.png";

import { AuthContext } from "./../context/AuthContext.jsx";
import axiosInstance from "../utils/axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  
};

export default Login;
