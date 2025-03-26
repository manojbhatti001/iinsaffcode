import React from 'react';
import viewlogo from '../../assets/icons/viewbuttonicon.png';
  

const InfoCards = ({ cards, handleNavigation }) => {
  return (
    <div className="flex flex-wrap gap-4 pb-10 items-center justify-center bg-white p-1">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-4 w-96 h-32  shadow-md rounded-2xl flex items-center justify-between"
        >
          {/* Left Section: Title and Value */}
          <div>
            <h4 className="text-lg font-bold">{card.title}</h4>
            <div className='flex space-x-2 items-center'>
              <h2 className="text-2xl">{card.value}</h2>
              <div className='bg-blue-500 flex items-center rounded-md'
                onClick={() => handleNavigation(card.link)}

              >
                <img className='h-7 cursor-pointer'
                  onClick={() => handleNavigation(card.link)}
                  src={viewlogo} />
                <button
                  className=" text-white font-bold px-2 py-[2px] shadow-md  transition"
                >
                  View
                </button>
              </div>
            </div>
          </div>

          {/* View Button */}


          {/* Right Section: Image */}
          <div className="w-14 h-14 p-1">
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-full object-cover"
            />
          </div>


        </div>
      ))}
    </div>
  );
};

export default InfoCards;
