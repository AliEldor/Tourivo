import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";

import "../styles/tour.css";

import TourCard from "./../shared/TourCard";
import SearchBar from "./../shared/SearchBar";
import Newsletter from "./../shared/Newsletter";
import { Col, Container, Row } from "reactstrap";

import useAxios from "../hooks/useAxios";

const Tour = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: toursData, loading, error } = useAxios(`/tours?page=${page}`);
  const { data: tourCount } = useAxios("/tours/search/getTourCount");

  const tours = Array.isArray(toursData?.data) ? toursData.data : [];

  
};

export default Tour;
