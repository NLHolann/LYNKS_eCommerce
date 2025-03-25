import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const ViewProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<{
    username: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    wishlist?: string[];
  } | null>(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (user: { username?: string }) =>
        user.username && user.username.toLowerCase() === username?.toLowerCase()
    );

    if (user) {
      setUserData(user);
    } else {
      setUserData(null);
    }
  }, [username]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 bg-white shadow rounded-lg mt-8">
        {userData ? (
          <>
            <div className="flex justify-center mb-6">
              <img
                src={
                  userData.profilePicture ||
                  "../components/assets/default_picture.png"
                }
                alt={`${userData.username}'s profile`}
                className="w-32 h-32 rounded-full object-cover border-1 border-purple-700"
              />
            </div>

            <h1 className="text-3xl font-bold mb-2 text-center">
              {userData.firstName} {userData.lastName}
            </h1>

            <p className="text-center text-black mb-4">@{userData.username}</p>

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4 text-purple-800">
                Wishlist
              </h2>
              {userData.wishlist && userData.wishlist.length > 0 ? (
                <ul className="list-disc list-inside text-black">
                  {userData.wishlist.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No items in wishlist.</p>
              )}
            </div>
          </>
        ) : (
          <h1 className="text-3xl font-semibold mb-4 text-center">
            User not found.
          </h1>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ViewProfile;
