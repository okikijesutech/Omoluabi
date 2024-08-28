import { useEffect, useState } from "react";
import { ServiceUnavailable } from "../../../components";
import "./quests.css";

const NameMeaning = () => {
  const [name, setName] = useState("");
  const [meaning, setMeaning] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverAvailability, setServerAvailability] = useState(true);

  const checkServerAvailability = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ping", {
        method: "GET",
      });

      if (response.ok) {
        setServerAvailability(true);
      } else {
        setServerAvailability(false);
      }
    } catch (error) {
      setServerAvailability(false);
    }
  };

  useEffect(() => {
    checkServerAvailability();
  }, []);

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
      <div className='namemeaningcontainer'>
        <h3>Get the meaningof your name</h3>
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
        {!serverAvailability && <ServiceUnavailable />}
      </div>
    </div>
  );
};

const Spinner = () => (
  <div className='spinner'>
    <div className='double-bounce1'></div>
    <div className='double-bounce2'></div>
  </div>
);

export default NameMeaning;
