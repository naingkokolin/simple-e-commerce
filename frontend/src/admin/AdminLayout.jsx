import React from 'react';
import { FaBox, FaUser, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        </div>
        <nav className="flex-grow">
          <ul>
            <li className="mb-4">
              <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700">
                <FaBox className="mr-3" />
                Products
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700">
                <FaUser className="mr-3" />
                Users
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700">
                <FaChartBar className="mr-3" />
                Analytics
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700">
            <FaSignOutAlt className="mr-3" />
            Logout
          </a>
        </div>
      </aside>
      
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;