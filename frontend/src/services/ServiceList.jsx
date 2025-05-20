import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Ai Tour Generator",
    desc: "Create custom travel itineraries instantly based on your preferences and interests..",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Explore with our expert local guides who reveal hidden gems and cultural insights.",
  },
  {
    imgUrl: customizationImg,
    title: "Ai Photo Recognition",
    desc: "Identify any Lebanese landmark by uploading a photo and learn its history.",
  },
];



export default ServiceList;
