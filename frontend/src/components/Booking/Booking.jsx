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

 
};

export default Booking;
