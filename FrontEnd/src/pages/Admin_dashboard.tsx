import AdminBoard from '../components/Admin_board'; // Assuming this is the sidebar or navigation for the admin
// import BooksList from '../components/BooksList'; // Component to display list of books
// import AddBookForm from '../components/AddBookForm'; // Component to add a new book

function AdminDashboard() {
  return (
    <div className='flex h-screen bg-[#20234A]'>
        <AdminBoard /> {/* Sidebar for admin navigation */}

        <div className="flex-1 items-center flex flex-col p-4">
          {/* <h1 className="text-xl font-bold text-white mb-4">Admin Dashboard</h1> */}

          {/* <AddBooks/> */}

         {/* <Products/> */}
        </div>
    </div>
  );
}

export default AdminDashboard;