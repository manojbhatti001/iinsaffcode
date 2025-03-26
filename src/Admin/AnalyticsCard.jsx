const AnalyticsCard = ({ title, value, description }) => {
    return (
      
      <div className="p-6 h-40 w-60 border-4 border-dotted  rounded-lg">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-3xl font-bold mt-2">${value}</p>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
    );
  };
  
  export default AnalyticsCard;
  