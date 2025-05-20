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

const SEASON_OPTIONS = ["spring", "summer", "fall", "winter", "any"];

const DESTINATION_OPTIONS = [
  "cities",
  "countryside",
  "beach",
  "mountains",
  "any",
];

const FormField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  min,
  max,
  required,
  options,
}) => {
  if (type === "select") {
    return (
      <FormGroup>
        <Label>{label}</Label>
        <Input
          type="select"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </Input>
      </FormGroup>
    );
  }

  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        required={required}
      />
    </FormGroup>
  );
};

function GenerateTrip() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const [tripData, setTripData] = useState({
    budget: "",
    duration: "",
    interests: [],
    destinationType: "",
    season: "",
    city: "",
    maxPrice: "",
    maxGroupSize: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData({
      ...tripData,
      [name]: value,
    });
  };

  
}

export default GenerateTrip;
