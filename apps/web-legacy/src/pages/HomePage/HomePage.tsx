import { Hero, Features, Mission, Community } from "../../containers";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className='container'>
      <Hero />
      <Features />
      <Mission />
      <Community />
    </div>
  );
};

export default HomePage;
