import React from "react";

const Header = () => {
  return (
    <div className="z-100 absolute top-0 left-0 w-full py-4 px-4 bg-gradient-to-b from-black">
      {/* LOGO */}
      <div>
        <img src="/public/logo.png" alt="Logo" className="h-12 w-auto" />
      </div>
    </div>
  );
};

export default Header;
