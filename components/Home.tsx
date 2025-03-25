import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<{ username: string } | null>(
    null
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!user) {
      navigate("/");
    } else {
      setLoggedInUser(user);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-6 bg-white mt-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-purple-800">
          Welcome to LYNKS
        </h1>
        <p className="text-center">
          Hello, {loggedInUser?.username}!{" "}
          <a
            href={`/profile/${loggedInUser?.username.toLowerCase()}`}
            className="text-purple-700 hover:underline"
          >
            View your profile
          </a>
        </p>
        <br />
        <h1 className="text-9xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
          commodi dignissimos? Alias quidem, voluptate delectus nemo minima, hic
          optio dolore nam facere dignissimos et, eos quibusdam impedit modi.
          Earum, laudantium.
        </h1>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
