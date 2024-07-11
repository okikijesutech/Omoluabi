import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footerContainer'>
        <div className='footerList'>
          <h4>About us</h4>
          <ul>
            <li>
              <Link to={""} className='liLink'>
                Courses
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Mission
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Approach
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Efficacy
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Team
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Research
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Careers
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Brand guidelines
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Store
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Press
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Investors
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        <div className='footerList'>
          <h4>Products</h4>
          <ul>
            <li>
              <Link to={""} className='liLink'>
                Duolingo
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Duolingo for Schools
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Duolingo English Test
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Duolingo ABC
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Duolingo Math
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Podcast
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Duolingo for Business
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Super Duolingo
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Gift Super Duolingo
              </Link>
            </li>
          </ul>
        </div>
        <div className='footerList'>
          <h4>App</h4>
          <ul>
            <li>
              <Link to={""} className='liLink'>
                Duolingo for Android
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Duolingo for iOS
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Duolingo ABC (iOS)
              </Link>
            </li>
          </ul>
        </div>
        <div className='footerList'>
          <h4>Help and support</h4>
          <ul>
            <li>
              <Link to={""} className='liLink'>
                Duolingo FAQs
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Schools FAQs
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Duolingo English Test FAQs
              </Link>
            </li>
            <li>
              <Link to={""} className='liLink'>
                Status
              </Link>
            </li>
          </ul>
        </div>
        <div className='footerList footerVertical'>
          <div>
            <h4> Privacy and terms </h4>
            <ul>
              <li>
                <Link to={""} className='liLink'>
                  Community guidelines
                </Link>
              </li>
              <li>
                <Link to={""} className='liLink'>
                  Terms
                </Link>
              </li>
              <li>
                <Link to={""} className='liLink'>
                  Privacy
                </Link>
              </li>
              <li>
                <Link to={""} className='liLink'>
                  Respecting your "do not sell my personal information" rights
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Social</h4>
            <ul>
              <li>
                <Link to={""} className='liLink'>
                  Blog
                </Link>
              </li>
              <li>
                <Link to={""} className='liLink'>
                  Instagram
                </Link>
              </li>
              <li>
                <Link to={""} className='liLink'>
                  Facebook
                </Link>
              </li>
              <li>
                <Link to={""} className='liLink'>
                  Twitter
                </Link>
              </li>
              <li>
                <Link to={""} className='liLink'>
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
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
