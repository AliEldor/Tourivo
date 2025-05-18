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

  const searchHandler = async () => {
    const location = locationRef.current.value || "";
    const price = priceRef.current.value || "0";
    const maxGroupSize = maxGroupSizeRefRef.current.value || "0";

    const queryString = `city=${location}&price=${price}&maxGroupSize=${maxGroupSize}`;

    try {
      const response = await axiosInstance.get(
        `/tours/search/getTourBySearch?${queryString}`
      );

      navigate(`/tours/search/?${queryString}`, { state: response.data.data });
    } catch (error) {
      console.log("Error during search:", error);
    }
  };

  
};

export default SearchBar;
