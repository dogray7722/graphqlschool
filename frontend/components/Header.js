import Link from "next/link";
import Image from "next/image";
import Logo from "../images/logo.png";
import { useState } from "react";

const Header = () => {
  const [sideMenu, setSideMenu] = useState(false);

  let handleOpen = () => {
    setSideMenu(!sideMenu);
  };

  return (
    <section id="hero">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <nav className="flex items-center justify-between font-kanit">
          <Image
            src={Logo}
            alt="imagine cooking school logo"
            width={250}
            height={250}
            className="mx-auto md:mx-2 rounded-full"
          />
          <div className="hidden h-10 md:flex md:space-x-8">
            <div className="group">
              <Link href="#" className="nav-links">
                About
              </Link>
              <div className="mx-2 group-hover:border-b group-hover:border-green-700"></div>
            </div>
            <div className="group">
              <Link href="#" className="nav-links">
                Register
              </Link>
              <div className="mx-2 group-hover:border-b group-hover:border-green-700"></div>
            </div>
            <div className="group">
              <Link href="#" className="nav-links">
                Courses
              </Link>
              <div className="mx-2 group-hover:border-b group-hover:border-green-700"></div>
            </div>
            <div className="group">
              <Link href="#" className="nav-links">
                Calendar
              </Link>
              <div className="mx-2 group-hover:border-b group-hover:border-green-700"></div>
            </div>
            <div className="group">
              <Link href="#" className="text-xl text-slate-100">
                Contact Us
              </Link>
              <div className="mx-2 group-hover:border-b group-hover:border-green-700"></div>
            </div>
          </div>
          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={handleOpen}
              id="menu-btn"
              type="button"
              className={
                "z-40 block hamburger md:hidden focus:outline-none " +
                (sideMenu && "open")
              }
            >
              <span
                className={
                  "hamburger-top " + (sideMenu ? "bg-white" : "bg-black")
                }
              ></span>
              <span
                className={
                  "hamburger-middle " + (sideMenu ? "bg-white" : "bg-black")
                }
              ></span>
              <span
                className={
                  "hamburger-bottom " + (sideMenu ? "bg-white" : "bg-black")
                }
              ></span>
            </button>
          </div>
        </nav>
        {/* Mobile Menu */}
        <div
          id="menu"
          className={
            "absolute top-0 bottom-0 left-0 flex flex-col self-end w-full min-h-screen py-1 pt-40 pl-12 space-y-3 text-lg text-white uppercase bg-black " +
            (!sideMenu && "hidden")
          }
        >
          <a href="" className="hover:text-blue-600">
            About
          </a>
          <a href="" className="hover:text-blue-600">
            Register
          </a>
          <a href="" className="hover:text-blue-600">
            Courses
          </a>
          <a href="" className="hover:text-blue-600">
            Calendar
          </a>
          <a href="" className="hover:text-blue-600">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Header;
