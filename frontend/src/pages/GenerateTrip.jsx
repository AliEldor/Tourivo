import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Input,
  Label,
  Alert,
} from "reactstrap";
import "../styles/generate-trip.css";
import { useNavigate } from "react-router-dom";
import CommonSection from "../shared/CommonSection";
import axiosInstance from "../utils/axios";
import TripLoadingScreen from "../components/TripLoadingScreen";


const INTEREST_OPTIONS = [
  "History",
  "Nature",
  "Adventure",
  "Culture",
  "Food",
  "Architecture",
  "Beaches",
  "Mountains",
  "Relaxation",
  "Shopping",
  "Art",
  "Nightlife",
  "Village",
];



export default GenerateTrip;
