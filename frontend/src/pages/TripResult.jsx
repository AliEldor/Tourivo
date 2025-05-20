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



export default TripResult;
