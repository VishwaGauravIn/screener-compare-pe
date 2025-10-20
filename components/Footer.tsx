import React from "react";
import { TbBrandGithub, TbBrandInstagram, TbBrandX } from "react-icons/tb";
import { PiLinkedinLogoThin } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 mt-10 flex flex-col justify-center items-center gap-4">
      <p className="text-sm">Follow us on:</p>
      <div className="flex gap-4">
        <a
          href="https://github.com/VishwaGauravIn"
          target="_blank"
          rel="noreferrer"
        >
          <TbBrandGithub className="h-6 w-6 stroke-1" />
        </a>
        <a
          href="https://www.linkedin.com/in/vishwagauravin/"
          target="_blank"
          rel="noreferrer"
        >
          <PiLinkedinLogoThin className="h-6 w-6 stroke-1" />
        </a>
        <a href="https://x.com/VishwaGauravIn" target="_blank" rel="noreferrer">
          <TbBrandX className="h-6 w-6 stroke-1" />
        </a>
        <a
          href="https://instagram.com/VishwaGauravIn"
          target="_blank"
          rel="noreferrer"
        >
          <TbBrandInstagram className="h-6 w-6 stroke-1" />
        </a>
      </div>
      <a href="https://itsvg.in" target="_blank" rel="noreferrer">
        {"</>"} with ❤️ by <span className="font-semibold">Vishwa Gaurav</span>
      </a>
    </footer>
  );
};

export default Footer;
