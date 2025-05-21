import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";

const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axiosInstance.get(url);
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log("Full error:", err);
        console.log("Error response:", err.response?.data);
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to fetch data"
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    error,
    loading,
  };
};

export default useAxios;
