import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";




export default ProtectedRoute;
