import { AiFillSound } from "react-icons/ai";
import "./btnsound2.css";

interface BtnSound2Props {
  rate?: number;
  sound: string;
}

const BtnSound2: React.FC<BtnSound2Props> = ({ sound, rate }) => {
  const playSound = () => {
    const audio = new Audio(sound);
    audio.playbackRate = rate;
    audio.play();
  };
  return (
    <button className='btnSoundContainer' onClick={playSound}>
      <AiFillSound size={36} color='#131f24' />
    </button>
  );
};

export default BtnSound2;
