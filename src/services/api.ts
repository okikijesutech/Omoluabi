import axios from "axios";

export const fetchNameMeaning = async (name: string) => {
  const response = await axios.get(`http:localhost:5000/api/name/${name}`);
  return response.data.meaning;
};
