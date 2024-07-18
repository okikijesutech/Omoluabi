import { useEffect, useState } from "react";
import "./loader.css";

const Loader = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          return prevCount;
        }
      });
    }, 50); // Adjust the speed of the counter here

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='loader'>
      <div className='spinner'></div>
      <div className='counter'>{count}%</div>
    </div>
  );
};

export default Loader;
