import React, { useState } from 'react';
import useLoginUser from '../../hooks/useAuth';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const { handleRoleAddition, addRoleIsLoading } =  useLoginUser()

  const roles = [
    { id: 'user', title: 'User', icon: '👤' },
    { id: 'support', title: 'Customer Support', icon: '🎧' },
    { id: 'designer', title: 'Designer', icon: '🎨' },
    { id: 'merchant', title: 'Merchant', icon: '🏪' }
  ];

  const handleContinue = () => {
     handleRoleAddition({role: selectedRole, username: localStorage.getItem("name")})
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Select Your Role</h2>
        
        <div className="space-y-3 mb-6">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedRole === role.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{role.icon}</span>
                <span className="font-medium">{role.title}</span>
                {selectedRole === role.id && (
                  <span className="ml-auto text-blue-500">✓</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
        { addRoleIsLoading ? <p className="threeDotLoading m-0"> Authenticating... </p> : "Continue"} 
        </button>
      </div>
    </div>
  );
};


export default RoleSelection;