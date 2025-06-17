import "./footer.css";
import {FacebookIcon} from "../icons/facebookIcon";
import {UserIcon} from "../icons/instagramIcon";
import { GithubIcon } from "../icons/githubIcon";
const Footer = () => {
  return (
    <div className="footer-container flex border-t-1 dark:border-[#27272a] border-[#e4e4e7]">
      <p className="m-0 p-0 mx-auto my-4 dark:text-txtdark text-txtlight text-sm">
        Copyright (c) 2025 Carlos Delgado, Galo Alejandro Orellana
      </p>
      <div className="flex gap-1 mx-auto my-4 dark:text-txtdark text-txtlight">
        <FacebookIcon />
        <UserIcon />
        <GithubIcon />
      </div>
      

    </div>
  );
};

export default Footer;
