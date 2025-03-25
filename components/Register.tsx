import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    birthDate: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    gender: "Male",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState<{
    label: string;
    color: string;
    progress: number;
    missingRequirements: string[];
  }>({
    label: "Very Weak",
    color: "red",
    progress: 0,
    missingRequirements: [],
  });

  const [passwordMatchProgress, setPasswordMatchProgress] = useState({
    label: "Passwords do not match",
    color: "red",
    progress: 0,
  });

  const isPasswordStrong = (password: string) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    const missingRequirements: string[] = [];

    if (password.length >= 8) {
      strength += 1;
    } else {
      missingRequirements.push(
        "Password should be at least 8 characters long or more."
      );
    }

    if (/[a-z]/.test(password)) {
      strength += 1;
    } else {
      missingRequirements.push(
        "Password should have at least 1 lowercase letter 'a-z'."
      );
    }

    if (/[A-Z]/.test(password)) {
      strength += 1;
    } else {
      missingRequirements.push(
        "Password should have at least 1 uppercase letter 'A-Z'."
      );
    }

    if (/\d/.test(password)) {
      strength += 1;
    } else {
      missingRequirements.push("Password should have at least 1 number '1-0'.");
    }

    if (/[!@#$%^&*()]/.test(password)) {
      strength += 1;
    } else {
      missingRequirements.push(
        "Password should have at least 1 symbol '!@#$%^&*()'."
      );
    }

    if (password.length === 0) {
      return {
        label: "",
        color: "",
        progress: 0,
        missingRequirements: [],
      };
    }

    let label = "Very Weak";
    let color = "red";
    let progress = 0;

    switch (strength) {
      case 1:
        label = "Very Weak";
        color = "#ff3300";
        progress = 5;
        break;
      case 2:
        label = "Weak";
        color = "#cc6600";
        progress = 40;
        break;
      case 3:
        label = "Moderate";
        color = "#e6b800";
        progress = 60;
        break;
      case 4:
        label = "Strong";
        color = "#00b33c";
        progress = 80;
        break;
      case 5:
        label = "Very Strong";
        color = "#006600";
        progress = 100;
        break;
      default:
        break;
    }

    return { label, color, progress, missingRequirements };
  };

  const calculatePasswordMatch = (
    password: string,
    confirmPassword: string
  ) => {
    if (password === "" || confirmPassword === "") {
      return { label: "Passwords do not match", color: "red", progress: 0 };
    }

    const match = password === confirmPassword;
    return {
      label: match ? "Passwords match" : "Passwords do not match",
      color: match ? "green" : "red",
      progress: match ? 100 : 0,
    };
  };

  const isLeap = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const daysInMonth = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  const generateDays = (month: keyof typeof daysInMonth, year: number) => {
    const adjustedDaysInMonth = {
      ...daysInMonth,
      February: isLeap(year) ? 29 : 28,
    };
    return Array.from(
      { length: adjustedDaysInMonth[month] || 0 },
      (_, i) => i + 1
    );
  };

  const generateYears = (startYear: number) => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    console.log(`Updating ${name} to ${value}`);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
      setPasswordMatchProgress(
        calculatePasswordMatch(value, formData.confirmPassword)
      );
    }

    if (name === "confirmPassword") {
      setPasswordMatchProgress(
        calculatePasswordMatch(formData.password, value)
      );
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, "");

    const trimmedValue = numericValue.slice(0, 10);

    const formattedValue = trimmedValue.replace(
      /(\d{3})(\d{3})(\d{0,4})/,
      (_, p1, p2, p3) => `${p1}-${p2}${p3 ? `-${p3}` : ""}`
    );

    return formattedValue;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      phone: formattedPhone,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "username",
      "birthMonth",
      "birthDay",
      "birthYear",
      "gender",
      "email",
      "phone",
      "password",
      "confirmPassword",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please fill out the remaining fields.`);
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!isPasswordStrong(formData.password)) {
      alert(
        "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/-/g, ""))) {
      alert(
        "Please enter a valid Philippine phone number consisting of 10 digits."
      );
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    interface User {
      email: string;
      username: string;
      firstName: string;
      lastName: string;
      phone: string;
      password: string;
    }

    const userExists = users.some(
      (user: User) =>
        user.email === formData.email ||
        user.username.toLowerCase() === formData.username.toLowerCase()
    );

    if (userExists) {
      alert("A user with this email or username already exists.");
      return;
    }

    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    navigate("/register/complete", { state: { username: formData.username } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <main className="flex-grow flex justify-left items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Registration</h2>

          <p className="text-xs font-semibold mb-2 text-gray-500">Name:</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="p-2 border rounded-lg w-full hover:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 border rounded-lg w-full hover:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
            />
          </div>

          <p className="text-xs font-semibold mb-2 text-gray-500">Birthday:</p>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <select
              name="birthMonth"
              value={formData.birthMonth}
              onChange={(e) => {
                handleChange(e);
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  birthDay: "",
                }));
              }}
              className="p-2 border rounded-lg w-full hover:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
            >
              <option value="">Month</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            <select
              name="birthDay"
              value={formData.birthDay}
              onChange={handleChange}
              className="p-2 border rounded-lg w-full hover:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
            >
              <option value="">Day</option>
              {generateDays(
                formData.birthMonth as keyof typeof daysInMonth,
                parseInt(formData.birthYear) || new Date().getFullYear()
              ).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>

            <select
              name="birthYear"
              value={formData.birthYear}
              onChange={(e) => {
                const { value } = e.target;
                const year = parseInt(value) || new Date().getFullYear();

                setFormData((prevFormData) => {
                  const daysInSelectedMonth = generateDays(
                    prevFormData.birthMonth as keyof typeof daysInMonth,
                    year
                  );

                  const isDayValid =
                    prevFormData.birthDay &&
                    daysInSelectedMonth.includes(
                      parseInt(prevFormData.birthDay)
                    );

                  return {
                    ...prevFormData,
                    birthYear: value,
                    birthDay: isDayValid ? prevFormData.birthDay : "",
                  };
                });
              }}
              className="p-2 border rounded-lg w-full hover:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
            >
              <option value="">Year</option>
              {generateYears(1905).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <p className="text-xs font-semibold mb-2 text-gray-500">Gender:</p>

          <div className="mb-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-2 border rounded-lg w-full hover:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <p className="text-xs font-semibold mb-2 text-gray-500">
            Email and Phone Number:
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded-lg w-full hover:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
            />
            <div className="relative w-full">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                +63
              </span>
              <input
                type="tel"
                name="phone"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="p-2 pl-10 border rounded-lg w-full hover:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
              />
            </div>
          </div>
          <p className="text-xs font-semibold mb-2 text-gray-500">Username:</p>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full mb-4 hover:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
          />

          <p className="text-xs font-semibold mb-2 text-gray-500">Password:</p>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full mb-2 hover:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
          />
          <div className="mb-2">
            {formData.password && (
              <>
                <div
                  className="h-2 rounded-lg mb-1"
                  style={{
                    backgroundColor: "#c0c0c0",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${passwordStrength.progress}%`,
                      backgroundColor: passwordStrength.color,
                      height: "100%",
                      transition: "width 0.5s ease, background-color 0.5s ease",
                    }}
                  ></div>
                </div>
                <span
                  style={{
                    color: passwordStrength.color,
                    fontWeight: "500",
                    transition: "color 0.5s ease",
                  }}
                >
                  {passwordStrength.label}
                </span>
                {passwordStrength.missingRequirements.length > 0 && (
                  <ul className="text-sm text-red-500 mt-2">
                    {passwordStrength.missingRequirements.map((req, index) => (
                      <li key={index}>- {req}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
          <p className="text-xs font-semibold mb-2 text-gray-500">
            Confirm Password:
          </p>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full mb-0.5"
          />
          <div className="mb-4">
            {formData.confirmPassword && (
              <>
                <span
                  style={{
                    color: passwordMatchProgress.color,
                    fontWeight: "500",
                    transition: "color 0.5s ease",
                  }}
                >
                  {passwordMatchProgress.label}
                </span>
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white font-bold py-2 rounded-lg hover:bg-purple-800"
          >
            Register
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-700 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
