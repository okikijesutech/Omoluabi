import { useState } from "react";
import "./btnsound.css";

interface BtnSoundProps {
  sound: string;
  name: string;
}

const BtnSound: React.FC<BtnSoundProps> = ({ sound, name }) => {
  const [isPlaying, setIsplaying] = useState(false);
  const playSound = () => {
    if (!isPlaying) {
      const audio = new Audio(sound);
      audio.play();
      setIsplaying(true);
      audio.onended = () => {
        setIsplaying(false);
      };
    }
  };

  return (
    <div className='btnsound' onClick={playSound}>
      <p>{name}</p>
    </div>
  );
};

export default BtnSound;
