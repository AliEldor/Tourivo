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

  return (
    <>
      {loading && <TripLoadingScreen />}

      <CommonSection title="Generate Your Dream Trip" />
      <section className="generate-trip">
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="generate-trip__container">
                <h2>Tell us about your dream trip</h2>
                <p>
                  Our AI will create a personalized itinerary based on your
                  preferences
                </p>

                {error && <Alert color="danger">{error}</Alert>}

                {apiResponse && !apiResponse.success && (
                  <Alert color="warning">
                    <h5>API Response Details:</h5>
                    <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} className="generate-trip__form">
                  {/* Basic trip details */}
                  <Row>
                    <Col md="6">
                      <FormField
                        label="Budget ($)"
                        name="budget"
                        type="number"
                        placeholder="Your total budget"
                        value={tripData.budget}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                    <Col md="6">
                      <FormField
                        label="Duration (days)"
                        name="duration"
                        type="number"
                        placeholder="Number of days"
                        value={tripData.duration}
                        onChange={handleChange}
                        min="1"
                        max="30"
                        required
                      />
                    </Col>
                  </Row>

                  {/* Interest options */}
                  <InterestOptions />

                  {/* Season and destination type */}
                  <Row>
                    <Col md="6">
                      <FormField
                        label="Preferred Season"
                        name="season"
                        type="select"
                        value={tripData.season}
                        onChange={handleChange}
                        options={SEASON_OPTIONS}
                      />
                    </Col>
                    <Col md="6">
                      <FormField
                        label="Destination Type"
                        name="destinationType"
                        type="select"
                        value={tripData.destinationType}
                        onChange={handleChange}
                        options={DESTINATION_OPTIONS}
                      />
                    </Col>
                  </Row>

                  {/* Additional options */}
                  <Row>
                    <Col md="4">
                      <FormField
                        label="City (optional)"
                        name="city"
                        type="text"
                        placeholder="Preferred city"
                        value={tripData.city}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md="4">
                      <FormField
                        label="Max Price per Tour ($)"
                        name="maxPrice"
                        type="number"
                        placeholder="Maximum tour price"
                        value={tripData.maxPrice}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md="4">
                      <FormField
                        label="Group Size"
                        name="maxGroupSize"
                        type="number"
                        placeholder="Number of people"
                        value={tripData.maxGroupSize}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    className="generate-btn"
                    disabled={loading}
                  >
                    {loading ? "Generating Your Trip..." : "Generate Trip"}
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default GenerateTrip;
