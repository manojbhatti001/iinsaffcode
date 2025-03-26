import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
const PageHeader = ({ username = 'Admin' }) => {
  const location = useLocation();

  // Function to get the page title from nested routes
  const getPageTitle = (pathname) => {
    const routes = {
      '/admin': 'Dashboard',
      '/admin/advertisers': 'Advertisers',
      '/admin/influencers': 'Influencers',
      '/admin/Reporter':'Reporter',
      '/admin/priceset':'Price-Set',
      '/admin/AllUser':'All-User',
      '/admin/getallleads': 'Leads',
      '/admin/allconfrences': 'Conferences',
      '/admin/updateconfrences':'Update-Conferences',
      '/admin/payment-history': 'Payment-History',
      '/admin/withdrawal-history': 'Withdrawal-History',
      '/admin/withdrawal-requests': 'Withdrawal-Requests',
      '/admin/card-requests': 'Card-Requests',
      '/admin/approved-cards': 'Approved-Cards',
      '/admin/rejected-cards': 'Rejected-Cards',
      '/admin/createAdmin':'Create-Admin',
      '/admin/AllAdmin':'All-Admin',
      '/admin/profile': 'Profile',
      '/admin/settings': 'Settings',
    };

    // Find the route that matches the current pathname
    return routes[pathname] || 'Admin Panel';
  };

  const currentPage = getPageTitle(location.pathname);

  return (
    <div className="flex items-center flex-col">
      {/* Welcome Message */}
      <div className=" flex items-center justify-center w-40 py-2 px-2 font-bold text-green-500 rounded-xl border-2 border-green-300">
        Welcome {username.toUpperCase()}
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex gap-2">
        <Link to="/admin" className='flex items-center'> <AiOutlineHome style={{ marginRight: '5px' }} /></Link> <span>/</span> <span>{currentPage}</span>
      </div>
    </div>
  );
};

export default PageHeader;
