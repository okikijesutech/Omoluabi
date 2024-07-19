import { useEffect, useState } from "react";
import Lottie from "react-lottie";
// import animationData from "./path/to/your/lottie/file.json";
import "./loader.css";

const Loader = () => {
  const [count, setCount] = useState(0);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(
      "https://lottie.host/0bff0ab5-2148-4fec-9b53-da68f98a89e9/iqCfPd2Qen.json"
    )
      .then((response) => response.json())
      .then((data) => setAnimationData(data));

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
      {/* <div className='spinner'></div> */}
      <div className='counter'>{count}%</div>
    </div>
  );
};

export default Loader;
