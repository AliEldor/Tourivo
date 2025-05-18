import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";

import axiosInstance from "../utils/axios";

import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = useRef("");
  const priceRef = useRef("");
  const maxGroupSizeRefRef = useRef("");
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value || "";
    const price = priceRef.current.value || "0";
    const maxGroupSize = maxGroupSizeRefRef.current.value || "0";

    const queryString = `city=${location}&price=${price}&maxGroupSize=${maxGroupSize}`;

    try {
      const response = await axiosInstance.get(
        `/tours/search/getTourBySearch?${queryString}`
      );

      navigate(`/tours/search/?${queryString}`, { state: response.data.data });
    } catch (error) {
      console.log("Error during search:", error);
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form
          className="d-flex align-items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <FormGroup className="d-flex gap-2 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input type="text" placeholder="Where to?" ref={locationRef} />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-2 form__group form__group-fast">
            <span>
              <i className="ri-money-dollar-circle-fill"></i>
            </span>
            <div>
              <h6>Price</h6>
              <input type="number" placeholder="Budget" ref={priceRef} />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-2 form__group">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Group Size</h6>
              <input
                type="number"
                placeholder="People"
                ref={maxGroupSizeRefRef}
              />
            </div>
          </FormGroup>

         
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
