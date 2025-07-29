import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './Register.css';

interface IUser {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: Date | null;
}

const Register = () => {
  const [user, setUser] = useState<IUser>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: name === "birthday" ? new Date(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:7056/api/register", user);
      console.log("User registered:", response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-overlay">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={user.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="birthday"
            onChange={handleChange}
          />

          <button type="submit" className="btn-register">Sign Up</button>

          <p className="switch-auth">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
