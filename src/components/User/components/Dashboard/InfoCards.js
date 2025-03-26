import React from 'react';

const InfoCards = () => {
  const cards = [
    { 
      title: "Today's Money", 
      value: "$53,000", 
      change: "+55% since yesterday", 
      img: "https://images.unsplash.com/photo-1556742400-b5b7c512f9b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTcwMjR8MHwxfGFsbHwxfHxjb2luLG1vbmV5fHx8fHx8MTY4NzI5ODg5NQ&ixlib=rb-4.0.3&q=80&w=400" 
    },
    { 
      title: "Today's Users", 
      value: "2,300", 
      change: "+3% since last week", 
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTcwMjR8MHwxfGFsbHwxfHx1c2VycyxwZW9wbGV8fHx8fHwxNjg3Mjk4ODk1&ixlib=rb-4.0.3&q=80&w=400" 
    },
    { 
      title: "New Clients", 
      value: "+3,462", 
      change: "-2% since last quarter", 
      img: "https://images.unsplash.com/photo-1561414927-6d86591b0b88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTcwMjR8MHwxfGFsbHwxfHxjbGllbnQsYnVzaW5lc3N8fHx8fHwxNjg3Mjk4ODk1&ixlib=rb-4.0.3&q=80&w=400" 
    },
    { 
      title: "Sales", 
      value: "$103,430", 
      change: "+5% than last month", 
      img: "https://images.unsplash.com/photo-1590955557631-7761f446cf78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTcwMjR8MHwxfGFsbHwxfHxzYWxlcyxzaG9wcGluZ3x8fHx8fDE2ODcyOTg4OTU&ixlib=rb-4.0.3&q=80&w=400" 
    },
  ];

  return (
    <div className="grid gap-4 text-gray-600 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="p-4 bg-white shadow-md rounded-2xl flex items-center justify-between"
        >
          {/* Left Section: Title, Value, and Change */}
          <div>
            <h4 className="text-lg font-bold">{card.title}</h4>
            <h2 className="text-2xl">{card.value}</h2>
            <p className={`text-${card.change.startsWith('+') ? 'green' : 'red'}-500`}>
              {card.change}
            </p>
          </div>

          {/* Right Section: Image */}
          <div className="w-16 h-16">
            <img 
              src={card.img} 
              alt={card.title} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
