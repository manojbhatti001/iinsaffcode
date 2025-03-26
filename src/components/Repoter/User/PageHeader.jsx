import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
const PageHeader = ({ username = 'Reporter Dashboard' }) => {
  const location = useLocation();

  // Function to get the page title from nested routes
  const getPageTitle = (pathname) => {
    const routes = {
      '/ReporterDashboard/': 'Dashboard',
      '/ReporterDashboard/relevant-status': 'Relevent Leads',
      '/ReporterDashboard/accepeted-status': 'Accepted Leads',
      '/ReporterDashboard/completed-status': 'Completed Leads',
      '/ReporterDashboard/pending-status': 'Pending Leads',
      '/ReporterDashboard/conferences': 'Conferences',
      '/ReporterDashboard/accepted-con': 'Accepted Conferences',
      '/ReporterDashboard/completed-con': 'Completed Conferences',
      '/ReporterDashboard/pending-con': 'Pending Conferences',
      '/ReporterDashboard/payment-history': 'Payment History',
      '/ReporterDashboard/withdrawal-history': 'Withdrawal History',
      '/ReporterDashboard/withdrawal-requests': 'Withdrawal Requests',
      '/ReporterDashboard/card-requests': 'Card Requests',
      '/ReporterDashboard/approved-cards': 'Approved Cards',
      '/ReporterDashboard/rejected-cards': 'Rejected Cards',
      '/ReporterDashboard/profile': 'Profile',
      '/ReporterDashboard/settings':'Settings',
    };

    // Find the route that matches the current pathname
    return routes[pathname] || 'Reporter Panel';
  };

  const currentPage = getPageTitle(location.pathname);

  return (
    <div className="flex items-center flex-col">
      {/* Welcome Message */}
      <div className=" flex items-center justify-center w-42 py-2 px-2 font-bold text-black rounded-xl border-2 border-black">
        {username.toUpperCase()}
      </div>
      {/* Breadcrumb Navigation */}
      <div className="flex gap-2">
        <Link to="/ReporterDashboard" className='flex items-center'> <AiOutlineHome style={{ marginRight: '5px' }} /></Link> <span>/</span> <span>{currentPage}</span>
      </div>
    </div>
  );
};

export default PageHeader;
