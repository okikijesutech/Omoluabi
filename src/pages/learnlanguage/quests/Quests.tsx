// import { useState } from "react";
// // import { fetchNameMeaning } from "../../../services/api";
// // import  {generateText}  from "@google/generative-ai";
// import "./quests.css";

// const NameMeaning = () => {
//   const [name, setName] = useState("");
//   const [meaning, setMeaning] = useState("");
//   const [loading, setLoading] = useState(false);

//   const generateText = async ({
//     prompt,
//   }: {
//     prompt: string;
//   }): Promise<{ text: string }> => {
//     return { text: "This is a mocked meaning for the name." }; // Mocked for development
//   };

//   const handleFetchMeaning = async () => {
//     try {
//       setLoading(true);
//       const prompt = `Translate the Yoruba name "${name}" to English and provide its meaning.`;
//       const response = await generateText({ prompt });
//       const translatedMeaning = response.text.trim();
//       setMeaning(translatedMeaning);
//       // const result = await fetchNameMeaning(name);
//       // setMeaning(result);
//     } catch (e) {
//       setMeaning("Unable to fetch at this time");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='questscontainer'>
//       <input
//         type='text'
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder='Enter Yoruba Name'
//       />
//       <button onClick={handleFetchMeaning}>
//         {loading ? <p>Loading meaning ...</p> : <p>Get Meaning</p>}
//       </button>
//       <p style={{ color: "red" }}>{meaning}</p>

//       {meaning && <p>Meaning: {meaning}</p>}
//     </div>
//   );
// };

// export default NameMeaning;

import { useState } from "react";
import "./quests.css";

const NameMeaning = () => {
  const [name, setName] = useState("");
  const [meaning, setMeaning] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchMeaning = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Translate the Yoruba name "${name}" to English and provide its meaning.`,
        }),
      });

      const data = await response.json();
      setMeaning(data.text);
    } catch (e) {
      setMeaning("Unable to fetch at this time. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='questscontainer'>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter Yoruba Name'
        disabled={loading}
      />
      <button onClick={handleFetchMeaning} disabled={loading}>
        {loading ? <Spinner /> : <p>Get Meaning</p>}
      </button>
      <p style={{ color: "red" }}>{meaning}</p>

      {meaning && <p>Meaning: {meaning}</p>}
    </div>
  );
};

// Spinner Component
const Spinner = () => (
  <div className='spinner'>
    <div className='double-bounce1'></div>
    <div className='double-bounce2'></div>
  </div>
);

export default NameMeaning;
