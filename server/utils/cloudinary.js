import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dzthl3hye",
  api_key: "475887516768321",
  api_secret: "ymKX0gQKu8hU4sTkGV4zVoRlukY",
});

// file upload to cloud
export const fileUpload = async (path) => {
  const data = await cloudinary.uploader.upload(path);
  return data;
};

// file delete to cloud
export const fileDelete = async (publicId) => {
  const data = await cloudinary.uploader.destroy(publicId);
};
