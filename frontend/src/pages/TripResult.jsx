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
    
  </Form>
);



export default TripResult;
