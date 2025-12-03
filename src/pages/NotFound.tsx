import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="page">
      <h1>404 - Page Not Found 🚫</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go back Home</Link>
    </div>
  );
};

export default NotFound;
