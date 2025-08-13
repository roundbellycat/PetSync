import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../images/temp-logo.gif';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex item-container">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="h-8 w-8 mr-2" />
        </Link>
        <Link to="/" className="text-2xl font-bold">
          PetSync
        </Link>
      </div>
      <div>
        {user ? (
          <>
            <Link to="/" className="mr-4">Home</Link>
            <Link to="/petprofiles" className="mr-4">Pets</Link>
            {/* <Link to="/tasks" className="mr-4">CRUD</Link> */}
            <Link to="/profile" className="mr-4">Profile</Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="mr-4">Home</Link>
            <Link to="/login" className="mr-4">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav >
  );
};

export default Navbar;
