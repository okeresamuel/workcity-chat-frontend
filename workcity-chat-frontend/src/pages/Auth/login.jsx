import { useState } from 'react';
import useLoginUser from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Login = () => {
  
  const [formData, setFormData] = useState({ username: '', password: '',});
  const { handleLoginUser, loginIsLoading, } =  useLoginUser()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginUser(formData)
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-blue-600">SC</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">ShopChat</h1>
          <p className="text-gray-600">Connect with support, designers & merchants</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              autoComplete='off'
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
             autoComplete='off'
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            { loginIsLoading  ? <p className="threeDotLoading m-0"> Authenticating... </p> : "Login"} 
          </button>
        </div>

        <div className="mt-6 text-center">
        <Link to={"/register"} className="text-blue-600 hover:text-blue-700 font-medium"> Don't have an account? Sign up </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;