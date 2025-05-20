import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Card,
  CardBody,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/trip-result.css";
import { AuthContext } from "../context/AuthContext";
import CommonSection from "../shared/CommonSection";
import axiosInstance from "../utils/axios";


const BookingForm = ({ formData, onChange }) => (
  <Form>
    <Row>
      <Col md={6}>
        <FormGroup>
          <Label for="fullName">Full Name</Label>
          <Input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Your full name"
            value={formData.fullName || ""}
            onChange={onChange}
            required
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="phone">Phone Number</Label>
          <Input
            type="text"
            name="phone"
            id="phone"
            placeholder="Your phone number"
            value={formData.phone || ""}
            onChange={onChange}
            required
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <FormGroup>
          <Label for="guestSize">Number of Guests</Label>
          <Input
            type="number"
            name="guestSize"
            id="guestSize"
            placeholder="Number of people"
            min="1"
            value={formData.guestSize || 1}
            onChange={onChange}
            required
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="bookAt">Booking Date</Label>
          <Input
            type="date"
            name="bookAt"
            id="bookAt"
            value={formData.bookAt || ""}
            onChange={onChange}
            required
          />
        </FormGroup>
      </Col>
    </Row>
    <FormGroup>
      <Label for="userEmail">Email</Label>
      <Input
        type="email"
        name="userEmail"
        id="userEmail"
        placeholder="Your email address"
        value={formData.userEmail || ""}
        onChange={onChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="note">Special Requests (optional)</Label>
      <Input
        type="textarea"
        name="note"
        id="note"
        placeholder="Any special requests or notes"
        value={formData.note || ""}
        onChange={onChange}
      />
    </FormGroup>
  </Form>
);

const TourCard = ({ tour, day }) => (
  <Card className="tour-card">
    <CardBody>
      <Row>
        <Col md="4">
          <div className="tour-image">
            <img src={tour.photo} alt={tour.title} />
            <span className="tour-day">Day {day}</span>
          </div>
        </Col>
        <Col md="8">
          <div className="tour-details">
            <h4>{tour.title}</h4>
            <div className="tour-info">
              <span>
                <i className="ri-map-pin-line"></i> {tour.city}
              </span>
              <span>
                <i className="ri-time-line"></i> {tour.durationInDays} days
              </span>
              <span>
                <i className="ri-money-dollar-circle-line"></i> ${tour.price}
                /person
              </span>
            </div>
            <p>{tour.note}</p>
            <Link to={`/tours/${tour._id}`} className="btn view-tour-btn">
              View Tour Details
            </Link>
          </div>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

function TripResult() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });
  const [modal, setModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: new Date().toISOString().split("T")[0],
  });
  const [serverResponse, setServerResponse] = useState(null);

  
  const toggle = () => setModal(!modal);

  useEffect(() => {
  
    if (!id) {
      setError("Invalid trip ID");
      setLoading(false);
      return;
    }

    const fetchTripData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/generated-trips/${id}`);

        if (res.data.success) {
          setTrip(res.data.data);

          const username = user?.data?.data?.username || user?.username || "";
          const email = user?.data?.data?.email || user?.email || "";
          setBookingForm((prev) => ({
            ...prev,
            fullName: username,
            userEmail: email,
            guestSize: res.data.data.preferences?.maxGroupSize || 1,
          }));
        } else {
          setError(res.data.message || "Failed to load trip details");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, [id, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm({
      ...bookingForm,
      [name]: name === "guestSize" ? parseInt(value, 10) : value,
    });
  };

  const getAuthToken = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        return (
          parsedUser?.token ||
          parsedUser?.data?.token ||
          parsedUser?.accessToken ||
          parsedUser?.data?.accessToken
        );
      } catch {
        return null;
      }
    }
    return null;
  };

  const handleBookTrip = async () => {
    if (!id || !user) {
      setBookingStatus({
        loading: false,
        error: "Not authenticated or invalid trip",
        success: false,
      });
      return;
    }

    if (!bookingForm.fullName || !bookingForm.phone || !bookingForm.bookAt) {
      setBookingStatus({
        loading: false,
        error: "Please fill in all required fields",
        success: false,
      });
      return;
    }

    setBookingStatus({
      loading: true,
      error: null,
      success: false,
    });
    setServerResponse(null);

    try {
      const formattedDate = new Date(bookingForm.bookAt).toISOString();

      const firstTourId = trip.tourSelections[0]?.tourId?._id;

      if (!firstTourId) {
        setBookingStatus({
          loading: false,
          error: "No valid tour found in the trip",
          success: false,
        });
        return;
      }

      const bookingData = {
        fullName: bookingForm.fullName,
        guestSize: parseInt(bookingForm.guestSize, 10),
        phone: bookingForm.phone,
        bookAt: formattedDate,
        userEmail: bookingForm.userEmail,
        tourId: firstTourId,
      };

      const authToken = getAuthToken();
      const authHeaders = authToken
        ? { Authorization: `Bearer ${authToken}` }
        : {};

      const response = await axiosInstance.post(
        `/generated-trips/${id}/book`,
        bookingData,
        {
          headers: authHeaders,
        }
      );

      setServerResponse(response.data);

      if (response.data.success) {
        setBookingStatus({
          loading: false,
          error: null,
          success: true,
        });

        setTimeout(() => {
          navigate("/thank-you", {
            state: response.data.data?.bookings?.[0] || response.data.data,
          });
        }, 2000);
      } else {
        throw new Error(
          response.data.error || response.data.message || "Failed to book trip"
        );
      }
    } catch (err) {
      setBookingStatus({
        loading: false,
        error:
          err.response?.data?.message || err.message || "Failed to book trip",
        success: false,
      });
      setServerResponse({
        success: false,
        message: err.message,
        error: err.response?.data || err.toString(),
      });
    } finally {
      setLoading(false);
    }
  };

  
}

export default TripResult;
