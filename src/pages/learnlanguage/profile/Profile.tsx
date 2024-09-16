import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { FaFire } from "react-icons/fa6";
import "./profile.css";

const stats = [
  {
    name: "Day streak",
    no: 5,
  },
  {
    name: "Total Xp",
    no: 68,
  },
  {
    name: "Current streak",
    no: "none",
  },
  {
    name: "Top 3 finishes",
    no: 3,
  },
];
const Achievements = [
  {
    name: "Day streak",
    no: 5,
  },
  {
    name: "Total Xp",
    no: 68,
  },
  {
    name: "Current streak",
    no: "none",
  },
  {
    name: "Top 3 finishes",
    no: 3,
  },
];

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [photoURL, setPhotoURL] = useState("/default-avatar.png");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setDisplayName(user.displayName || "No display name");
      setPhotoURL(user.photoURL || "/default-avatar.png");

      const creationTime = user.metadata.creationTime;
      if (creationTime) {
        const date = new Date(creationTime);
        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "long",
        };
        setDateJoined(date.toLocaleDateString(undefined, options));
      } else {
        setDateJoined("Unknown date");
      }
    }
  }, []);

  return (
    <div className='profilecontainer'>
      <div className='profileHeader'>
        <div className='displayImageContainer'>
          <img src={photoURL} alt={displayName} />
        </div>
        <h2>{displayName}</h2>
        <p>Joined on: {dateJoined}</p>
      </div>
      <hr />
      <div>
        <h3>Statistics</h3>
        <div className='statsContainer'>
          {stats.map((stat) => (
            <div className='statsTab'>
              <FaFire size={36} />
              <div>
                <p>{stat.no}</p>
                <p>{stat.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3>Achievement</h3>
        <div className='achievementContainer'>
          {Achievements.map((Achievement) => (
            <div className='achievementTab'>
              <FaFire />
              <div>
                <p>{Achievement.name}</p>
                <p>{Achievement.no}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
