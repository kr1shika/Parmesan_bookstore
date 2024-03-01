import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Book {
    id: number;
    title: string;
    bookImage: string;
    price: number;
    genre: string;
    authors: string;
    publicationYear: number;
    publisher: string;
    pages: number;
}

function Products() {
    const [isUpdateFormVisible, setUpdateFormVisibility] = useState(false);
    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:8086/api/book/deleteById/${id}`)
            .then(response => {
                if (response.data === 'Data deleted successfully') {
                    // Handle successful deletion
                    console.log('Book deleted successfully');
                    toast.success('Book deleted successfully');
                    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
                    // You may want to refresh the book list or update the state
                } else {
                    // Handle deletion failure
                    console.error('Failed to delete book');
                }
            })
            .catch(error => {
                console.error('Error during delete operation:', error);
            });
    };

    const [books, setBooks] = useState<Book[]>([]);
    useEffect(() => {
       
        axios.get('http://localhost:8086/api/book/getAll')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    return (
        <div className=" flex flex-col  bg-[#20234A]  text-[F3EAE4]">

            <div className=" items-center ml-12 mt-4 px-4 py-2">
                <ToastContainer />
                <div> <h2 className="text-3xl font-salsa mb-4 mx-[430px] font-medium tracking-wider font-bold tracking-wider text-[#F3EAE4]">Books Recorded</h2></div>

                <table className="table-auto rounded-lg border bg-[#F3EAE4] text-[#20234A]  border-[#272E87]">
                    <tr className=" text-[#F3EAE4] bg-[#20234A] ">
                        <th className="border p-2 py-2 text-lg w-28">Book Cover</th>
                        <th className="border p-2 py-2 text-lg w-20">Book ID</th>
                        <th className="border p-2 py-2 text-lg w-40">Title</th>
                        <th className="border p-2 py-2 text-lg w-40">Author</th>
                        <th className="border p-2 py-2 text-lg w-32">genre</th>
                        <th className="border p-2 py-2 text-lg w-40">Publication Year</th>
                        <th className="border p-2 py-2 text-lg w-24">Pages</th>
                        <th className="border p-2 py-2 text-lg w-24">Price</th>
                        <th className="border p-2 py-2 text-lg w-52">Action</th>
                    </tr>

                    {books.map(book => (
                        <tr>
                            <th className="border p-1 ">
                                <img src={"data:image/jpg;base64, " + book?.bookImage} alt={book.title} className="ml-3  w-16 rounded object-cover" />

                            </th>

                            <th className="border p-2 w-24">{book.id}</th>
                            <th className="border p-2 w-52">{book.title}</th>
                            <th className="border p-2 w-40">{book.authors}</th>
                            <th className="border p-2 w-32"> {book.genre}</th>
                            <th className="border p-2 w-52"> {book.publicationYear}</th>
                            <th className="border p-2 w-24">{book.pages}</th>
                            <th className="border p-2 w-24">{book.price}</th>
                            <th className=" p-2 border w-52 items-center px-5">
                                <div className='flex  flex-row space-x-10'>
                                    <button className='border p-1  ' onClick={() => handleDelete(book.id)}> Delete </button>
                                   
                                </div>
                            </th>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Products