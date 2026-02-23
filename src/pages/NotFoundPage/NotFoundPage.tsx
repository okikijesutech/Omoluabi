import { useEffect } from "react";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 10000); // Redirect after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='not-found-container'>
      <h1>Page Not Found</h1>
      <p>What are you looking for?</p>
      <p className='redirect-message'>
        You will be redirected to the home page shortly.
      </p>
    </div>
  );
};

export default NotFoundPage;
