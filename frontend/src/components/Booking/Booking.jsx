import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import axiosInstance from "../../utils/axios";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const getUserEmail = () => {
    return user?.data?.data?.email;
  };

  const [booking, setBooking] = useState({
    userId: user?.data?.data?._id,
    userEmail: getUserEmail(),
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prev) => ({ ...prev, [id]: value }));
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!user || user === undefined || user === null) {
        return alert("Please sign in");
      }

      if (!booking.fullName.trim()) {
        return alert("Full name is required");
      }
      if (!booking.phone.trim()) {
        return alert("Phone number is required");
      }
      if (!booking.bookAt) {
        return alert("Booking date is required");
      }
      if (!booking.guestSize || booking.guestSize < 1) {
        return alert("Guest size must be at least 1");
      }

      const userEmail = getUserEmail();

      if (!userEmail) {
        return alert("User email is required. Please sign in again.");
      }

      const bookingData = {
        tourName: booking.tourName,
        fullName: booking.fullName.trim(),
        guestSize: parseInt(booking.guestSize),
        phone: booking.phone.toString(),
        bookAt: new Date(booking.bookAt).toISOString(),
        userEmail: userEmail,
      };

      console.log("Sending booking data:", bookingData);

      const response = await axiosInstance.post("/booking", bookingData);

      if (response.data) {
        const bookingWithTotalAmount = { ...bookingData, totalAmount };
        navigate("/thank-you", { state: bookingWithTotalAmount });
      }
    } catch (err) {
      console.log("Full error:", err);
      console.log("Error response:", err.response?.data);
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to book tour"
      );
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>

        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      
    </div>
  );
};

export default Booking;
