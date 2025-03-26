import React from "react";
import viewlogo from "../../assets/icons/viewbuttonicon.png";
import { useNavigate } from "react-router-dom";

const InfoCards = ({ data }) => {
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    if (link) navigate(link);
  };

  return (
    <div className="space-y-8">
      {data &&
        data.map((section, index) => (
          <div className="text-center" key={index}>
            <div className=" inline-flex flex-col  ">
              <h1 className="text-2xl font-bold text-center mb-1">
                {section.section} Statistics
              </h1>
              <hr className="border-0 h-1 bg-green-400" />
              </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {section.items &&
                section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white flex items-center justify-between rounded p-6 shadow-md shadow-blue-300"
                  >
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        {item.title} {item.value}
                      </h2>
                      <div className="bg-blue-500 w-20 flex items-center rounded-md">
                        <img
                          className="h-7 cursor-pointer"
                          src={viewlogo}
                          alt="View icon"
                          onClick={() => handleNavigation(item.link)}
                        />
                        <button
                          className="text-white font-bold px-2 py-[2px] shadow-md transition"
                          onClick={() => handleNavigation(item.link)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                    {/* left side image  */}
                    <div>
                      <img className="h-14" src={item.img} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default InfoCards;
