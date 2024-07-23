import img from "../../../assets/images/ArewaKnot.webp";
import "./leaderBoard.css";
const tablesResult = [
  {
    name: "Linda",
    score: "200",
  },
  {
    name: "Tope",
    score: "180",
  },
  {
    name: "",
    score: "250",
  },
  {
    name: "",
    score: "100",
  },
  {
    name: "",
    score: "110",
  },
];

const LeaderBoard = () => {
  return (
    <div className='leaderboard-container'>
      <div className='leaderboard-heading'>
        <h1>leaderboard</h1>
      </div>
      <div className='leaderboard-content'>
        {tablesResult.map((table, index) => (
          <table>
            <tbody>
              <td>{index + 1}.</td>
              <td className='image-container'>
                <img src={img} alt='' />
              </td>
              <td className='leaderboard-name'>{table.name}</td>
              <td>{table.score}</td>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
