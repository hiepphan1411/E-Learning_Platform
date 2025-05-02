import { Link } from "react-router-dom";
import CustomButton from "../button/CustomButtom";
import "./Header.css";
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
    title: "About Us",
    path: "#",
  },
  {
    id: 4,
    title: "Our Team",
    path: "#",
  },
  {
    id: 5,
    title: "Contact Us",
    path: "#",
  },
];

function Header() {
  return (
    <nav className="relative z-20 flex items-center justify-between px-14 py-10">
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
        <CustomButton title={"Sign in"}></CustomButton>
        <UserInfo />
      </div>
    </nav>
  );
}

export default Header;
