import React, { useState } from "react";
import { Icon } from "@iconify/react";

const header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {!isLoggedIn ? (
        <div className="w-full px-2 py-4 flex justify-center items-center text-3xl font-bold">
          <p>SmartRecuirters</p>
        </div>
      ) : (
        <div className="w-full px-2 py-4 flex jusitfy-between items-center">
          <p>SmartRecuirters</p>
          <div className="w-full flex justify-end items-center">
            <button className="px-4 py-2  text-black cursor-pointer">
              <Icon icon="mdi-bell-outline" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default header;
