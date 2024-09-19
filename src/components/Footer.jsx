import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";
import logo from "../assets/logo.png";
export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-gray-100 mt-20">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white flex items-center"
            >
              <img
                style={{ width: "30px", borderRadius: "20px" }}
                src={logo}
                alt="logo"
              />
              <div className="font-semibold text-xs whitespace-nowrap text-purple-600 md:text-lg ">
                Tech Scrolls
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" className="text-purple-600" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About us
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" className="text-purple-600" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/ZaryabAli-09"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="text-black" />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Tech Scrolls"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              className="text-purple-600 hover:text-purple-800"
              href="https://www.facebook.com/profile.php?id=100006969497679&mibextid=ZbWKwL"
              icon={BsFacebook}
            />
            <Footer.Icon
              className="text-purple-600 hover:text-purple-800"
              href="https://www.instagram.com/zky_07?igsh=Yng5dms4eTViY2dz"
              icon={BsInstagram}
            />

            <Footer.Icon
              className="text-purple-600 hover:text-purple-800"
              href="https://github.com/ZaryabAli-09"
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
