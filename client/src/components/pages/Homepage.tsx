import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Homepage = () => {
  const navigate = useNavigate();
  const { username, logout } = useAuth(); 

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-semibold mb-4">Welcome to the Homepage</h1>
      <h2 className="text-2xl font-medium text-gray-700 mb-12">
        {username ? `Hello, ${username}!` : 'Hello, Guest!'}
      </h2>
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div
          className="p-6 border rounded-lg bg-blue-500 text-white text-center cursor-pointer hover:bg-blue-600"
          onClick={() => navigate('/posts')}
        >
          <h2 className="text-2xl font-semibold">Go to Posts</h2>
        </div>
        <div
          className="p-6 border rounded-lg bg-green-500 text-white text-center cursor-pointer hover:bg-green-600"
          onClick={() => navigate('/todos')}
        >
          <h2 className="text-2xl font-semibold">Go to Todos</h2>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white text-xl rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Homepage;
