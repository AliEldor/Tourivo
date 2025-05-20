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




export default TripResult;
