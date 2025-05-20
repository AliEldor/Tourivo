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

  const handleInterestChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setTripData({
        ...tripData,
        interests: [...tripData.interests, value],
      });
    } else {
      setTripData({
        ...tripData,
        interests: tripData.interests.filter((interest) => interest !== value),
      });
    }
  };

  const extractTripId = (responseData) => {
    if (responseData?.data?._id) {
      return responseData.data._id;
    }

    if (responseData?.data?.data?._id) {
      return responseData.data.data._id;
    }

    if (responseData?.data && typeof responseData.data === "object") {
      for (const key in responseData.data) {
        if (responseData.data[key]?._id) {
          return responseData.data[key]._id;
        }
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tripData.interests.length === 0) {
      setError("Please select at least one interest");
      return;
    }

    setLoading(true);
    setError(null);
    setApiResponse(null);

    try {
    
      const processedData = {
        ...tripData,
        budget: Number(tripData.budget),
        duration: Number(tripData.duration),
        maxPrice: tripData.maxPrice ? Number(tripData.maxPrice) : undefined,
        maxGroupSize: tripData.maxGroupSize
          ? Number(tripData.maxGroupSize)
          : undefined,
      };

      const res = await axiosInstance.post("/generated-trips", processedData);
      setApiResponse(res.data);

      if (res.data.success) {
        const tripId = extractTripId(res.data);

        if (tripId) {
          navigate(`/trip/${tripId}`);
        } else {
          setError("Trip created but ID not found in response");
        }
      } else {
        setError(res.data.message || "Failed to generate trip");
      }
    } catch (err) {
      console.error("Error generating trip:", err);

      if (err.response?.data?.errors) {
        const validationErrors = err.response.data.errors
          .map((e) => e.msg)
          .join(", ");
        setError(`Validation errors: ${validationErrors}`);
      } else if (err.response) {
        setError(err.response.data?.message || "Server error");
      } else if (err.request) {
        setError("No response received from server");
      } else {
        setError("Error setting up request: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const InterestOptions = () => (
    <FormGroup>
      <Label>Interests (select at least one)</Label>
      <div className="interest-options">
        {INTEREST_OPTIONS.map((interest, index) => (
          <div key={index} className="interest-option">
            <Input
              type="checkbox"
              id={`interest-${index}`}
              name="interests"
              value={interest.toLowerCase()}
              onChange={handleInterestChange}
              checked={tripData.interests.includes(interest.toLowerCase())}
            />
            <Label for={`interest-${index}`}>{interest}</Label>
          </div>
        ))}
      </div>
    </FormGroup>
  );

 
}

export default GenerateTrip;
