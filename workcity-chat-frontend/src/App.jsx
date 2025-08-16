import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import Dashboard from "./pages/Dashboard/dashboard"
import CustomerSupport from "./pages/CustomerSupport/custormerSupport"
import Designers from "./pages/Designers/designers";
import Merchants from "./pages/Merchants/merchants";
import SelectRole from "./pages/SelectRole/selectRole"
import ChatRoom from "./pages/ChatRoom/chatRoom";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Routes>
        {/* Publicly available */}
        <Route path="/" element={""}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/support"   element={<CustomerSupport />} />
          <Route path="/designers" element={<Designers />} />
          <Route path="/merchants" element={<Merchants />} />
          <Route path="/selectrole" element={<SelectRole />} />
          <Route path="/chatroom" element={<ChatRoom />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
