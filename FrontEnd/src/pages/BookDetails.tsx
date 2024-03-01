import Headerr from '../components/Headerr';

// BookDetail.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blue_car from '../parmasan_icons/blue_car.png';
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
    synopsis: string;
}

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8086/api/book/getBookById/${id}`);
                setBook(response.data);
                console.log(book?.bookImage);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetail();
    }, [id]);

    if (!book) {
        return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indication
    }

    return (
        <div className='bg-[#20234A] '>
            <Headerr />
            <div className=' mx-96 mt-7 w-[898px] py-8 flex flex-col justify-evenly bg-[#F3EAE4] border border-[#20234A] rounded-2xl   shadow-md shadow-[#656ba4]'>

                <div className=' py-2 flex justify-evenly space-x-16'>


                    <div className="-ml-8 flex  flex-col items-center  border rounded-xl  border-dashed bg-[#20234A] border-[#20234A] w-64 h-96  align-middle">
                        <img src={`data:image/jpg;base64,${book?.bookImage}`} alt={book.title} className='h-[380px] p-1 rounded-2xl  '  />
                    </div>


                    <div>
                        <div className='-mt-4 -ml-24'>
                            <img src={blue_car} className='h-28 mt-4 -ml-10' alt="My Image" />
                            <p className='-mt-11 ml-2 mb-5 font-jomhu font-medium text-6xl  text-[#20234A] leading-7'><h2>{book.title}</h2> </p>
                        </div>

                        <div className='flex flex-col space-x-1 font-bold font-salsa  text-xl  text-[#20234A] '>
                            <p className='mb-8 font-bold text-2xl -ml-20'>Author: {book.authors}  </p>
                            <p className='mb-5  -ml-12'>Price: Rs:{book.price}</p>
                            <p className='mb-5 -ml-12'>Genre: {book.genre}</p>
                            <p className='mb-5 -ml-12'>Published Year: {book.publicationYear}</p>
                            <p className='mb-5 -ml-12'>Publisher: {book.publisher}</p>

                        </div>

                    </div>
                </div>

                <div className='mx-20 my-5 font-salsa font-medium text-lg  text-[#20234A] leading-0'>
                    <p>Description: <br /> {book.synopsis}</p>
                </div>

            </div>

        </div >
    );
};

export default BookDetail;
