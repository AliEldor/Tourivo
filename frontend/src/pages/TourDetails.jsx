import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../context/AuthContext.jsx";
import axiosInstance from "../utils/axios";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    data: tour,
    loading,
    error,
  } = useAxios(`/tours/${id}`, null, [refreshKey]);

  const { photo, title, desc, price, address, reviews, city, maxGroupSize } =
    tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!tourRating) {
      alert("Please select a rating");
      return;
    }

    setSubmitting(true);
    setSuccessMessage("");

    try {
      if (!user || user === undefined || user === null) {
        alert("Please sign in");
        return;
      }

      const username = user?.data?.data?.username || "Anonymous";

      const reviewObj = {
        username: username,
        reviewText,
        rating: tourRating,
      };

      await axiosInstance.post(`/reviews/${id}`, reviewObj);

      reviewMsgRef.current.value = "";
      setTourRating(null);
      setSelectedRating(0);

      setSuccessMessage("Review submitted successfully!");

      setRefreshKey((prev) => prev + 1);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to submit review"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleRatingClick = (rating) => {
    setTourRating(rating);
    setSelectedRating(rating);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading....</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />

                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>

                    
                  </div>

                  
                </div>
              </Col>

              
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
