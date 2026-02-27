import { 
  FaFire, 
  FaGem, 
  FaUserCircle, 
  FaCalendarAlt, 
  FaGlobeAfrica, 
  FaTrophy, 
  FaChartLine 
} from "react-icons/fa";
import { useLifeline } from "../../../context/LifelineContext";
import "./profile.css";

const Profile = () => {
  const { streak } = useLifeline();

  const userStats = [
    { label: "Streak", value: `${streak} Days`, icon: FaFire, color: "#ff9600" },
    { label: "Total XP", value: "2,450", icon: FaChartLine, color: "#58cc02" },
    { label: "Gems", value: "1,200", icon: FaGem, color: "#1cb0f6" },
    { label: "League", value: "Bronze", icon: FaTrophy, color: "#ce82ff" },
  ];

  const recentAchievements = [
    { title: "Friendly", desc: "Followed 5 friends", icon: "🤝" },
    { title: "On Fire!", desc: "Reached a 3 day streak", icon: "🔥" },
    { title: "Sage", desc: "Earned 1000 XP", icon: "📜" },
  ];

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-hero">
          <div className="avatar-wrapper">
            <FaUserCircle className="avatar" />
            <div className="avatar-online-status"></div>
          </div>
          <div className="profile-info">
            <h1 className="user-name">Guest User</h1>
            <p className="user-handle">@guest_omoluabi</p>
            <div className="user-meta">
              <span><FaCalendarAlt /> Joined Feb 2024</span>
              <span><FaGlobeAfrica /> Learning Yoruba</span>
            </div>
          </div>
        </div>
        <div className="profile-actions">
           <button className="btn-edit">EDIT PROFILE</button>
        </div>
      </header>

      <div className="profile-content">
        <section className="stats-section">
          <h2>Statistics</h2>
          <div className="stats-grid">
            {userStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <stat.icon style={{ color: stat.color }} />
                <div className="stat-data">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="achievements-section">
          <div className="section-header">
            <h2>Achievements</h2>
            <button className="btn-view-all">VIEW ALL</button>
          </div>
          <div className="achievements-list">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-details">
                  <h3>{achievement.title}</h3>
                  <p>{achievement.desc}</p>
                  <div className="achievement-progress">
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
