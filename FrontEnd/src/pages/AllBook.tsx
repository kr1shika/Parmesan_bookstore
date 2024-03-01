import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Headerr from '../components/Headerr';

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

function AllBook() {
    const [books, setBooks] = useState<Book[]>([]);
    const [title, setTitle] = useState<string>('');

    const { data: searchResults, refetch } = useQuery({
        queryKey: ['SEARCHBYNAME', title],
        queryFn: () => { return axios.get(`http://localhost:8086/api/book/searchByName/` + title); },
        enabled: false,
    });

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8086/api/book/getAll');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        if (searchResults) {
            setBooks(searchResults.data);
        }
    }, [searchResults]);

    const handleSearch = () => {
        if (title.trim() !== '') {
            refetch();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleClearSearch = () => {
        setTitle('');
        refetch();
    };

    return (
        <div>
            <Headerr />
            <div className='flex flex-col items-center bg-[#20234A]'>

                <div className="relative mt-6 mb-4 flex w-[400px] flex-wrap items-stretch space-x-11">
                    <input
                        type="search"
                        className="relative m-0 block flex-auto rounded-lg border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder=" Search by title.."
                        value={title}
                        onChange={handleInputChange}

                        aria-label="Search"
                        aria-describedby="button-addon2" />

                    <span onClick={handleSearch}
                        className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                        id="basic-addon2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">

                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </span>
                </div>

                <div className='px-10 flex flex-row justify-evenly flex-wrap space-x-10'>

                    {books.map(book => (
                        <div key={book.id} className='flex text-[#F3EAE4] items-center flex-col bg-[#20234A] h-[450px] w-60 mt-5 rounded-xl border'>
                            <img src={"data:image/jpg;base64, " + book?.bookImage} alt={book.title} className='h-[360px] w-[237px] m-0 rounded-xl' />
                            <div>
                                <p>{book.title}</p>
                                <p>Price: {book.price}</p>
                            </div>

                            <button className='border border-[#F3EAE4] px-2 font-small rounded-lg text-l font-salsa font-semibold text-[#F3EAE4]'>
                                Add to cart
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default AllBook