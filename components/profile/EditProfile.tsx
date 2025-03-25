import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";

const EditProfile = () => {
  const [userData, setUserData] = useState<{
    username: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  }>({
    username: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = users[0];
    if (currentUser) {
      setUserData(currentUser);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid JPG or PNG image.");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onCropComplete = (
    _: unknown,
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImage = async (
    imageSrc: string,
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
  ) => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return canvas.toDataURL("image/jpeg");
  };

  const handleSaveCroppedImage = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImage(imageSrc, croppedAreaPixels);
      if (croppedImage) {
        setUserData((prev) => ({
          ...prev,
          profilePicture: croppedImage,
        }));
      }
    }
    setIsModalOpen(false);
  };

  const handleCancelCrop = () => {
    setImageSrc(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user: { username: string }) =>
      user.username === userData.username ? userData : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("Profile updated successfully!");
    navigate(`/profile/${userData.username}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 bg-white shadow rounded-lg mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>
        <div className="flex justify-center mb-6">
          <img
            src={userData.profilePicture || "/assets/default_picture.png"}
            alt={`${userData.username}'s profile`}
            className="w-32 h-32 rounded-full object-cover border-1 border-purple-700"
          />
        </div>
        <div className="flex justify-center mb-6">
          <label className="cursor-pointer bg-purple-700 text-white px-2 py-1 rounded-md hover:bg-purple-800 transition duration-200">
            Choose File
            <input
              type="file"
              accept=".jpg,.png"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
          </label>
          <span className="ml-4 mt-1 text-gray-500">
            {userData.profilePicture ? "File selected" : "No file chosen"}
          </span>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
          >
            Save Changes
          </button>
        </div>
      </main>
      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-100 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-146 h-146">
            <h2 className="text-xl font-bold mb-4 text-center">Crop Image</h2>
            <div className="relative w-full h-110 bg-gray-200">
              <Cropper
                image={imageSrc!}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={handleCancelCrop}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCroppedImage}
                className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
