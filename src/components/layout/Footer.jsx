import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex flex-col p-4 gap-4 justify-around items-center bg-slate-800 text-white sm:flex-row sm:p-6 sm:gap-0">
      <p>Copyright &copy; {new Date().getFullYear()}. Aqar Misr</p>

      <div className="flex gap-6">
        <a href="/" target="_blank">
          <img className="h-4" src="https://ytpr.co.ke/wp-content/uploads/2020/06/linkedin-icon-png-transparent-background-8.png" alt="Aqar misr Linkedin Icon" />
        </a>
        <a href="/" target="_blank">
          <img src="/instagram_icon.svg" alt="Aqar misr Instagram Icon" />
        </a>
        <a href="/" target="_blank">
          <img src="/twitter_icon.svg" alt="Aqar misr Twitter Icon" />
        </a>
        <a href="/" target="_blank">
          <img src="/facebook_icon.svg" alt="Aqar misr Facebook Icon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
