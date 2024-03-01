// import { QueryClient } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminDefault from './components/AdminDefault';
import Admin_board from './components/Admin_board';
import AddBooks from './forms/AddBooks';
import BookUpdate from './forms/BookUpdate';
import Login from './forms/Login';
import Registration from './forms/Registration';
import Admin_dashboard from './pages/Admin_dashboard';
import AllBook from './pages/AllBook';
import BookDetail from './pages/BookDetails';
import Cart from './pages/Cart';
import Landing from './pages/Landing';
import Products from './pages/Products';
import './styles.css';
// import { UserProvider } from './UserContext';
const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>

          <Route path="/Cart" element={<Cart />} />
          <Route path="/AddBook" element={<AddBooks />} />
          <Route path="/Admin_board" element={<Admin_board />} />
          <Route path="/AdminDefault" element={<AdminDefault />} />
          <Route path="/Admin_dashboard" element={<Admin_dashboard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/" element={<Landing />} />
          <Route path="/Landing" element={<Landing />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/BookUpdate" element={<BookUpdate />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/all" element={<AllBook />} />
        </Routes>
      </QueryClientProvider>
    </Router>

  );
}

export default App;
