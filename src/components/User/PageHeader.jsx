import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
const PageHeader = ({ username = 'user Dashboard' }) => {
  const location = useLocation();

  // Function to get the page title from nested routes
  const getPageTitle = (pathname) => {
    const routes = {
      '/userdashboard/': 'Dashboard',
      '/userdashboard/advertisers': 'Advertisers',
      '/userdashboard/influencers': 'Influencers',
      '/userdashboard/leads': 'Leads',
      '/userdashboard/leads-Status': 'Leads Status',
      '/userdashboard/conferences': 'Conferences',
      '/userdashboard/payment-history': 'Payment History',
      '/userdashboard/withdrawal-history': 'Withdrawal History',
      '/userdashboard/withdrawal-requests': 'Withdrawal Requests',
      '/userdashboard/card-requests': 'Card Requests',
      '/userdashboard/approved-cards': 'Approved Cards',
      '/userdashboard/rejected-cards': 'Rejected Cards',
      '/userdashboard/profile': 'Profile',
      '/userdashboard/settings':'Settings',
    };

    // Find the route that matches the current pathname
    return routes[pathname] || 'user Panel';
  };

  const currentPage = getPageTitle(location.pathname);

  return (
    <div className="flex items-center flex-col">
      {/* Welcome Message */}
      <div className=" flex items-center justify-center w-42 py-2 px-2 font-bold text-white rounded-xl border-2 border-white">
        Welcome {username.toUpperCase()}
      </div>
      {/* Breadcrumb Navigation */}
      <div className="flex gap-2">
        <Link to="/userdashboard" className='flex items-center'> <AiOutlineHome style={{ marginRight: '5px' }} /></Link> <span>/</span> <span>{currentPage}</span>
      </div>
    </div>
  );
};

export default PageHeader;
