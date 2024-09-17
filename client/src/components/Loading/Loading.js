import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal';
export default function Loading() {
  const [count, setCount] = useState(5);
  const nav = useNavigate();
  const cookies = Cookie();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 700);

    if (count === 0) {
      nav('/login');
      cookies.remove("EComerce")
    }

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [count, nav]);

  return (
    <div className="center-container">
      <div className="spinner-grow text-info text-center "style={{width:'200px',height:'200px',color:"red"}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div> <h1 style={{color:"black"}}>You do not Login Redirected after {count} seconds</h1>
    </div>
  );
}
