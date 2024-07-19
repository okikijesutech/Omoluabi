import { BtnSound } from "../../../components";
import a from "../../../assets/sounds/a.mp3";
import "./learnlanguagenum.css";

const numbers = [
  { name: "Ọ̀kan", sound: a },
  { name: "Èjì", sound: a },
  { name: "Ẹ̀tà", sound: a },
  { name: "Ẹ̀rin", sound: a },
  { name: "Àárùn", sound: a },
  { name: "Ẹ̀fà", sound: a },
  { name: "Èje", sound: a },
  { name: "Ẹ̀jọ", sound: a },
  { name: "Ẹ̀sàn", sound: a },
  { name: "Ẹ̀wá", sound: a },
  { name: "Ọ̀kànlá", sound: a },
  { name: "Ẹ̀jìlá", sound: a },
  // { name: "Ẹ̀tàlá", sound: a },
  // { name: "Ẹ̀rìnlá", sound: a },
  // { name: "Ẹ̀ẹ́dógún", sound: a },
  // { name: "Ẹ̀rìndínlógún", sound: a },
  // { name: "Ẹ̀ẹ́tàdínlógún", sound: a },
  // { name: "Ẹ̀jìdínlógún", sound: a },
  // { name: "Ọ̀kàndínlógún", sound: a },
  // { name: "Ogún", sound: a },
];

const LearnLanguageNum: React.FC = () => {
  return (
    <div className='learnlanguagenumcontainer'>
      <h1>Learn your Numbers</h1>
      <div className='btnsoundcontainer'>
        {numbers.map((number, index) => (
          <BtnSound key={index} name={number.name} sound={number.sound} />
        ))}
      </div>
    </div>
  );
};

export default LearnLanguageNum;
