import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animation/loader.json";
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
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className='loader'>
      {animationData && (
        <Lottie options={defaultOptions} height={400} width={400} />
      )}
      <div className='counter'>{count}%</div>
    </div>
  );
};

export default Loader;
