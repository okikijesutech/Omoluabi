import { BtnSound } from "../../../components";
import a from "../../../assets/sounds/a.mp3";
import "./learnlanguagechar.css";

const alphabets = [
  { name: "A", sound: a },
  { name: "B", sound: a },
  { name: "D", sound: a },
  { name: "E", sound: a },
  { name: "Ẹ", sound: a },
  { name: "F", sound: a },
  { name: "G", sound: a },
  { name: "GB", sound: a },
  { name: "H", sound: a },
  { name: "I", sound: a },
  { name: "J", sound: a },
  { name: "K", sound: a },
  { name: "L", sound: a },
  { name: "M", sound: a },
  { name: "N", sound: a },
  { name: "O", sound: a },
  { name: "Ọ", sound: a },
  { name: "P", sound: a },
  { name: "R", sound: a },
  { name: "S", sound: a },
  { name: "Ṣ", sound: a },
  { name: "T", sound: a },
  { name: "U", sound: a },
  { name: "W", sound: a },
  { name: "Y", sound: a },
];

const LearnLanguageChar: React.FC = () => {
  return (
    <div className='learnlanguagecharcontainer'>
      <h1>Learn your Yoruba Alphabets</h1>
      <div className='btnsoundcontainer'>
        {alphabets.map((alphabet, index) => (
          <BtnSound key={index} name={alphabet.name} sound={alphabet.sound} />
        ))}
      </div>
    </div>
  );
};

export default LearnLanguageChar;
