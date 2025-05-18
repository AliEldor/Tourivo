import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";

import axiosInstance from "../utils/axios";

import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = useRef("");
  const priceRef = useRef("");
  const maxGroupSizeRefRef = useRef("");
  const navigate = useNavigate();

  
};

export default SearchBar;
