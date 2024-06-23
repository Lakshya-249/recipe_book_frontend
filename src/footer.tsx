import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faPinterest,
  faSquareFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div>
      <div className="text-sm font-semibold w-full h-[25rem] max-sm:h-[20rem] max-sm:mt-[5rem] flex flex-col justify-around px-[5rem] max-sm:px-[2rem]">
        <div className="mx-auto flex max-sm:hidden items-center space-x-5 text-gray-400">
          <div className="w-[2rem] h-[2rem] border-2 border-b-4 rounded-xl">
            L
          </div>
          <div className="w-[2rem] h-[2rem] border-2 border-b-4 rounded-xl">
            F
          </div>
          <p className="font-light text-gray-600">Like</p>
        </div>
        <div className="flex justify-between max-sm:flex-col max-sm:space-y-5 items-center">
          <div className="text-4xl font-[Forte]">Online Kitchen</div>
          <div className="space-x-10 flex flex-wrap max-sm:space-x-0 max-sm:justify-center">
            <p>For Chefs</p>
            <p>Hire Talent</p>
            <p>Inspiration</p>
            <p>Advertising</p>
            <p>Blog</p>
            <p>About</p>
            <p>Idea</p>
            <p>Support</p>
          </div>
          <div className="flex space-x-4">
            <FontAwesomeIcon icon={faTwitter} size="xl" />
            <FontAwesomeIcon icon={faSquareFacebook} size="xl" />
            <FontAwesomeIcon icon={faInstagram} size="xl" />
            <FontAwesomeIcon icon={faPinterest} size="xl" />
          </div>
        </div>
        <div className="font-light flex justify-between max-sm:justify-center text-gray-500 flex-wrap">
          <div className="flex max-sm:justify-center space-x-5 flex-wrap">
            <p>&copy; 2024 Dribble</p>
            <p>Terms</p>
            <p>Privacy</p>
            <p>Cookies</p>
          </div>
          <div className="flex flex-wrap max-sm:justify-center space-x-5">
            <p>Jobs</p>
            <p>Designers</p>
            <p>Freelancers</p>
            <p>Tags</p>
            <p>Places</p>
            <p>Recources</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
