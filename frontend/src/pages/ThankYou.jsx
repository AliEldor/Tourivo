import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/thank-you.css";

const ThankYou = () => {
  const location = useLocation();
  const booking = location.state;

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Thank You</h1>
              <h3 className="mb-4">Your tour is booked</h3>

              {booking && (
                <div className="booking-details">
                  <h4>Booking Details</h4>
                  <table>
                    <tbody>
                      <tr>
                        <td>Tour Name:</td>
                        <td>{booking.tourName}</td>
                      </tr>
                      <tr>
                        <td>Full Name:</td>
                        <td>{booking.fullName}</td>
                      </tr>
                      <tr>
                        <td>Phone:</td>
                        <td>{booking.phone}</td>
                      </tr>
                      <tr>
                        <td>Guest Size:</td>
                        <td>{booking.guestSize}</td>
                      </tr>
                      <tr>
                        <td>Booked At:</td>
                        <td>{booking.bookAt}</td>
                      </tr>
                      <tr>
                        <td>Total Amount:</td>
                        <td>${booking.totalAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              <Button className="btn primary__btn w-25">
                <Link to="/home">Back to Home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
