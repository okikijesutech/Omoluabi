import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footerContainer'>
        <div className='footerList'>
          <h4>About Ọmọlúàbí</h4>
          <ul>
            <li>
              <Link to="/learnlanguage" className='liLink'>
                Courses
              </Link>
            </li>
            <li>
              <Link to="/" className='liLink'>
                Our Mission
              </Link>
            </li>
            <li>
              <Link to="/" className='liLink'>
                Approach
              </Link>
            </li>
            <li>
              <Link to="/" className='liLink'>
                Impact
              </Link>
            </li>
          </ul>
        </div>
        <div className='footerList'>
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="https://github.com/okikijesutech/Omoluabi/blob/main/DEVELOPER.md" target="_blank" rel="noopener noreferrer" className='liLink'>
                Developer Guide
              </a>
            </li>
            <li>
              <a href="https://github.com/okikijesutech/Omoluabi/blob/main/README.md" target="_blank" rel="noopener noreferrer" className='liLink'>
                Project Roadmap
              </a>
            </li>
            <li>
              <Link to="/learnlanguage" className='liLink'>
                Lesson Schema
              </Link>
            </li>
          </ul>
        </div>
        <div className='footerList'>
          <h4>Contribution</h4>
          <ul>
            <li>
              <a href="https://github.com/okikijesutech/Omoluabi" target="_blank" rel="noopener noreferrer" className='liLink'>
                GitHub Repository
              </a>
            </li>
            <li>
              <a href="https://github.com/okikijesutech/Omoluabi/issues" target="_blank" rel="noopener noreferrer" className='liLink'>
                Report a Bug
              </a>
            </li>
            <li>
              <a href="https://github.com/okikijesutech/Omoluabi/issues/new" target="_blank" rel="noopener noreferrer" className='liLink'>
                Suggest Content
              </a>
            </li>
          </ul>
        </div>
        <div className='footerList'>
          <h4>Social</h4>
          <ul>
            <li>
              <a href="#" className='liLink'>
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className='liLink'>
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className='liLink'>
                Discord
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className='sitelang'>
        <h4>Site Languages:</h4>
        <div className='sitelanglist'>
          {[
            "Hausa",
            "Yoruba",
            "Igbo",
            "Fulfulde (Fulani)",
            "Kanuri",
            "Ibibio",
            "Tiv",
            "Ijaw",
            "Edo",
            "Urhobo",
            "Nupe",
            "Gbagyi",
            "Jukun",
            "Idoma",
            "Igala",
            "Berom",
            "Ebira",
            "Anang",
            "Efik",
            "Isoko",
          ].map((lang) => (
            <Link className='liLink' to={""}>
              {lang}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
