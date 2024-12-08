import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './components/pages/Posts';
import Layout from './components/layout/Layout'
import { QueryClient, QueryClientProvider } from 'react-query';
import Homepage from './components/pages/Homepage';
import PostDetails from './components/pages/PostDetails';
import Todos from './components/pages/Todos';
import CombinedProvider from './contexts/CombinedProvider';
import Login from './components/pages/Login';
import PublicRoute from './utils/PublicRoute';
import ProtectedRoute from './utils/ProtectedRoute';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <CombinedProvider>
    <Router>
      <QueryClientProvider client={queryClient}>
      <Layout>
      <Routes>

      <Route element={<ProtectedRoute/>}>

      <Route path="/" element={<Homepage/>} />
      <Route path="/posts" element={<Posts/>} />
      <Route path="/todos" element={<Todos/>} />
      <Route path="/post/:id" element={<PostDetails/>} />
      </Route>
      <Route element={<PublicRoute/>}>
      <Route path="/login" element={<Login/>} />
      </Route>
      
      </Routes>
      </Layout>
      </QueryClientProvider>
    </Router>
    </CombinedProvider>
  );
};

export default App;
