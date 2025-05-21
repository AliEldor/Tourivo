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

      {/*booking form start*/}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
              value={booking.fullName}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="tel"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
              value={booking.phone}
              pattern="[0-9]*"
            />
          </FormGroup>

          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
              value={booking.bookAt}
              min={new Date().toISOString().split("T")[0]}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
              value={booking.guestSize}
              min="1"
            />
          </FormGroup>
        </Form>
      </div>
      {/*booking form end*/}
      
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-line"></i> 1 person
            </h5>
            <span> ${price}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span> ${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0" total>
            <h5>Total </h5>
            <span> ${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
