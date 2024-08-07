import { LanguageCard, NavBar } from "../../components";
import "./getStarted.css";

const languages = [
  {
    image: "tribelogo1",
    language: "Yoruba",
    subs: "21k subscribed",
    link: "/learnlanguage",
  },
  {
    image: "tribelogo2",
    language: "Hausa",
    subs: "21k subscribed",
    link: "/learnlanguage",
  },
  {
    image: "tribelogo3",
    language: "Igbo",
    subs: "21k subscribed",
    link: "/learnlanguage",
  },
  {
    image: "tribelogo4",
    language: "Fulfulde (Fulani)",
    subs: "21k subscribed",
    link: "/learnlanguage",
  },
  {
    image: "tribelogo5",
    language: "Kanuri",
    subs: "21k subscribed",
    link: "/learnlanguage",
  },
  {
    image: "tribelogo6",
    language: "Ibibio",
    subs: "21k subscribed",
    link: "/learnlanguage",
  },
  {
    image: "tribelogo7",
    language: "Tiv",
    subs: "21k subscribed",
    link: "/learnlanguage",
  },
  {
    image: "tribelogo8",
    language: "Ijaw",
    subs: "21k subscribed",
    link: "/learnlanguage",
  },
  {
    image: "tribelogo9",
    language: "Edo",
    subs: "21k subscribed",
    link: "/learnlanguage",
  },
  {
    image: "tribelogo10",
    language: "Urhobo",
    subs: "21k subscribed",
    link: "/learnlanguage",
  },
  {
    image: "tribelogo11",
    language: "Nupe",
    subs: "21k subscribed",
    link: "/learnlanguage",
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
            link={language.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Signup;
