import { Link, useNavigate } from 'react-router-dom';
import UserList from '../../components/Users/users';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useState } from 'react';
import useFetchUserChats from '../../hooks/useChats';
import useSocket from '../../hooks/useSocket';

// Dashboard Component
const Dashboard = () => {
  const userData = useSelector(state => state.AuthSlice.userDetails);
  const { handleFetchUsersChats } = useFetchUserChats()
  useEffect(()=>{
   handleFetchUsersChats(userData.id)
  }, [])

  const stats = [
    { name: 'Total Orders', value: '1,234', change: '+12%', color: 'text-blue-600' },
    { name: 'Revenue', value: '$45,678', change: '+8%', color: 'text-green-600' },
    { name: 'Active Chats', value: '23', change: '+3', color: 'text-purple-600' },
    { name: 'Customers', value: '5,678', change: '+15%', color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6 p-5">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl">
        <h1 className="text-2xl font-bold mb-2">Welcome, 👋  {userData.role}</h1>
        <p className="opacity-90">Ready to connect with our support team, designers, or merchants?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
              <div className={`text-2xl ${stat.color}`}>●</div>
            </div>
          </div>
        ))}
      </div>

 {(userData.role === "support" || userData.role === "merchant" || userData.role === "designer") ? (
  <UserList />
) : (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Need Help? Start a Conversation</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Link to="/support" className="flex items-center p-4 border-2 border-dashed border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group">
        <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
          <span className="text-lg font-bold">CS</span>
        </div>
        <div className="text-left">
          <h3 className="font-medium text-gray-800">Customer Support</h3>
          <p className="text-sm text-gray-600">Get help with orders & issues</p>
        </div>
      </Link>
      
      <Link to="/designers" className="flex items-center p-4 border-2 border-dashed border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors group">
        <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
          <span className="text-lg font-bold">D</span>
        </div>
        <div className="text-left">
          <h3 className="font-medium text-gray-800">Designers</h3>
          <p className="text-sm text-gray-600">Custom design requests</p>
        </div>
      </Link>

      <Link to="/merchants" className="flex items-center p-4 border-2 border-dashed border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors group">
        <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
          <span className="text-lg font-bold">M</span>
        </div>
        <div className="text-left">
          <h3 className="font-medium text-gray-800">Merchants</h3>
          <p className="text-sm text-gray-600">Talk to store owners</p>
        </div>
      </Link>
    </div>
  </div>
 )}
    
      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'Order #1234 shipped', time: '2 hours ago', type: 'order' },
            { action: 'New message from support', time: '4 hours ago', type: 'message' },
            { action: 'Payment processed successfully', time: '1 day ago', type: 'payment' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mr-3 ${
                activity.type === 'order' ? 'bg-blue-500' : 
                activity.type === 'message' ? 'bg-green-500' : 'bg-purple-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
useSocket()
const navigate = useNavigate()

const logoutUser = () =>{
    localStorage.removeItem("userDetails")
    navigate("/")
}
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">SC</span>
                </div>
                <h1 className="text-xl font-bold text-gray-800">ShopChat Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors text-sm">
                  Notifications
                </button>
                <button
                onClick={logoutUser}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
      <Dashboard />
    </div>
  );
};

export default App;
