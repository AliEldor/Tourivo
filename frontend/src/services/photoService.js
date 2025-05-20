import axiosInstance from "../utils/axios";

export const uploadPhoto = async (formData) => {
  try {
    const response = await axiosInstance.post("/photo-detections", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUserPhotos = async () => {
  try {
    const response = await axiosInstance.get("/photo-detections/my-photos");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


