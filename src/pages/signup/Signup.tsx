import { LanguageCard, NavBar } from "../../components";
import "./signup.css";

const languages = [
  {
    image: "tribelogo1",
    language: "Yoruba",
    subs: "21k subscribed",
  },
  {
    image: "tribelogo2",
    language: "Hausa",
    subs: "21k subscribed",
  },
  {
    image: "tribelogo3",
    language: "Igbo",
    subs: "21k subscribed",
  },
  {
    image: "tribelogo4",
    language: "Fulfulde (Fulani)",
    subs: "21k subscribed",
  },
  {
    image: "tribelogo5",
    language: "Kanuri",
    subs: "21k subscribed",
  },
  {
    image: "tribelogo6",
    language: "Ibibio",
    subs: "21k subscribed",
  },
  {
    image: "tribelogo7",
    language: "Tiv",
    subs: "21k subscribed",
  },
  {
    image: "tribelogo8",
    language: "Ijaw",
    subs: "21k subscribed",
  },
  {
    image: "tribelogo9",
    language: "Edo",
    subs: "21k subscribed",
  },
  {
    image: "tribelogo10",
    language: "Urhobo",
    subs: "21k subscribed",
  },
  {
    image: "tribelogo11",
    language: "Nupe",
    subs: "21k subscribed",
  },
];

const Signup = () => {
  return (
    <div className='signupcontainer'>
      <NavBar />
      <h2>I want to learn...</h2>
      <div className='languagesCardsContainer'>
        {languages.map((language) => (
          <LanguageCard
            language={language.language}
            image={language.image}
            subs={language.subs}
            link='/'
          />
        ))}
      </div>
    </div>
  );
};

export default Signup;
