import { Link } from "react-router-dom";
import CustomButton from "../button/CustomButtom";
import "./Navbar.css";
import { useState, useEffect } from "react";
import SignInModal from "../modal/SignInModal";
import SignUpModal from "../modal/SignUpModal";
import UserInfo from "../userinfo/UserInfo";

const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    path: "/home",
  },
  {
    id: 2,
    title: "Services",
    path: "/services",
  },
  {
    id: 3,
    title: "Courses",
    path: "/courses",
  },
  {
    id: 4,
    title: "About Us",
    path: "/about",
  }
];

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isSignInModal, setIsSignInModal] = useState(false);
  const [isSignUpModal, setIsSignUpModal] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  const handleOpenSignIn = () => {
    setIsSignUpModal(false);
    setIsSignInModal(true);
  };

  const handleOpenSignUp = () => {
    setIsSignInModal(false);
    setIsSignUpModal(true);
  };

  return (
    <nav className="relative z-20 flex items-center justify-between px-5 py-3">
      <img src="../logo.png" alt="Logo Higi" className="h-12"></img>
      <div className="flex items-center gap-[20px]">
        <ul className="flex items-center justify-center gap-[20px]">
          {NavbarMenu.map((item) => (
            <Link key={item.id} to={item.path}>
              <li className="mr-4 ">
                <div className="text-gray-700 navlink-header">{item.title}</div>
              </li>
            </Link>
          ))}
        </ul>
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <UserInfo user={user} onLogout={handleLogout} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenSignIn}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Sign In
            </button>
            <button
              onClick={handleOpenSignUp}
              className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
      <SignInModal
        isOpen={isSignInModal}
        onClose={() => setIsSignInModal(false)}
        onSignUpClick={handleOpenSignUp}
      />

      <SignUpModal
        isOpen={isSignUpModal}
        onClose={() => setIsSignUpModal(false)}
        onSignInClick={handleOpenSignIn}
      />
    </nav>
  );
}

export default Navbar;
