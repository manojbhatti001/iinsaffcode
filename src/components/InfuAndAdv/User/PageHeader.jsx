import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

const PageHeader = ({ username = 'Advertiser' }) => {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    const routes = {
      '/inad/': 'Dashboard',
      '/inad/leads': 'Leads',
      '/inad/leads-status': 'Leads Status',
      '/inad/conferences': 'Conferences',
      '/inad/payment-history': 'Payment History',
      '/inad/withdrawal-history': 'Withdrawal History',
      '/inad/withdrawal-requests': 'Withdrawal Requests',
      '/inad/card-requests': 'Card Requests',
      '/inad/approved-cards': 'Approved Cards',
      '/inad/rejected-cards': 'Rejected Cards',
      '/inad/profile': 'Profile',
      '/inad/settings': 'Settings',
    };

    // Find the route that best matches the current pathname
    const matchedRoute = Object.keys(routes).find(route => pathname.startsWith(route));
    return routes[matchedRoute] || 'User Panel';
  };

  const currentPage = getPageTitle(location.pathname.toLowerCase());

  return (
    <div className="flex items-center flex-col">
      {/* Welcome Message */}
      <div className="flex items-center justify-center w-42 py-2 px-2 font-bold text-black rounded-xl border-2 border-white">
        Welcome {username.toUpperCase()}
      </div>
      
      {/* Breadcrumb Navigation */}
      <div className="flex gap-2">
        <Link to="/inAd" className="flex items-center">
          <AiOutlineHome style={{ marginRight: '5px' }} />
        </Link>
        <span>/</span> <span>{currentPage}</span>
      </div>
    </div>
  );
};

export default PageHeader;
