import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';

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

interface UpdatedBookData {
    id: number;
    title: string;
    bookImage: File | null;
    price: number;
    genre: string;
    authors: string;
    publicationYear: number;
    publisher: string;
    pages: number;
}

const bookService = {
    getAllBooks: () => axios.get(`http://localhost:8086/api/book/getAll`),
    updateBook: (id: number, updatedBookData: UpdatedBookData, config?: any) =>
        axios.put(`http://localhost:8086/api/book/update/${id}`, updatedBookData, config),
};

function BookUpdate() {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [formValues, setFormValues] = useState<UpdatedBookData>({
        id: 0,
        title: '',
        bookImage: null,
        price: 0,
        genre: '',
        authors: '',
        publicationYear: 0,
        publisher: '',
        pages: 0,
    });

    useEffect(() => {
        axios.get('http://localhost:8086/api/book/getAll')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const handleBookSelect = (selectedBook: Book) => {
        setSelectedBook(selectedBook);
        setFormValues({
            id: selectedBook.id,
            title: selectedBook.title,
            bookImage: null, // Set to null initially
            price: selectedBook.price,
            genre: selectedBook.genre,
            authors: selectedBook.authors,
            publicationYear: selectedBook.publicationYear,
            publisher: selectedBook.publisher,
            pages: selectedBook.pages,
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleImageInputChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            const imageFile = files[0];
            setFormValues(prevValues => ({
                ...prevValues,
                bookImage: imageFile,
            }));
        }
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedBook) return;

        const formData = new FormData();
        formData.append('id', selectedBook.id.toString());
        formData.append('title', formValues.title);
        if (formValues.bookImage) {
            formData.append('bookImage', formValues.bookImage, formValues.bookImage.name);
        }
        formData.append('price', formValues.price.toString());
        formData.append('genre', formValues.genre);
        formData.append('authors', formValues.authors);
        formData.append('publicationYear', formValues.publicationYear.toString());
        formData.append('publisher', formValues.publisher);
        formData.append('pages', formValues.pages.toString());

        bookService.updateBook(selectedBook.id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            method: 'POST',
        })
            .then(response => {
                toast.success("Book updated successfully");
                console.log('Book updated successfully:', response.data);
            })
            .catch(error => {
                toast.error("Error updating book");
                console.error('Error updating book:', error);
            });
    };

        return (
            <div className='flex flex-row justify-evenly items-center m-10'>
                <div className='ml-24'>
                    <table>
                        <tr className=" text-[#F3EAE4] bg-[#20234A] ">

                            <th className="border p-2 py-2 text-lg w-20">Book ID</th>

                        </tr>
                        {books.map(book => (
                            <tr key={book.id} onClick={() => handleBookSelect(book)} >
                                <th className="border p-2 w-52">{book.title}</th>
                            </tr>
                        ))}
                    </table>
                </div>

                <ToastContainer />

                <div className="flex  -m-l0  items-center mx-60 space-x-3 bg-[#F3EAE4]   rounded-xl p-6 w-[700px] shadow-lg shadow-[#44486d]">

                    <div>

                        <div
                            onClick={() => (document.querySelector('.input-field') as HTMLElement).click()}
                            className="flex mt-8 flex-col items-center p-2   mr-3 border rounded-xl  border-dashed bg-[#20234A] border-[#20234A] w-64 h-96 flex align-middle"
                        >
                            <input
                                type="file"
                                accept="image/*"
                                className="input-field"
                                hidden
                                id='bookImage'

                            />

                            <MdCloudUpload className='mt-36' color="#F3EAE4" size={70} />

                        </div>
                    </div>

                    <form className="space-y-3 font-jomhu " onSubmit={handleFormSubmit}>

                        <p className=' font-jomhu text-5xl font-semiBold text-center tracking-wide text-[#20234A]'>Edit the Book's data</p>

                        <div className="mb-4 text-2xl">
                            <input
                                type="text"
                                className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                                placeholder="Title"
                                name="title"
                                value={formValues.title}
                                onChange={handleInputChange}

                            />
                        </div>

                        <div className="mb-4 text-2xl">
                            <input
                                type="text"
                                className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                                placeholder="Author"
                                name="author"
                                value={formValues.authors}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4 text-2xl">
                            <input
                                type="text"
                                className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                                placeholder="genre"
                                name="genre"
                                value={formValues.genre}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex ">
                            <div className=" text-2xl ">
                                <input
                                    type="text"
                                    className="w-48 mr-4 h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                                    placeholder="publicationYear"
                                    name="publicationYear"
                                    value={formValues.publicationYear}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-2 text-2xl ">
                                <input
                                    type="text"
                                    className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                                    placeholder="publisher"
                                    name="publisher"
                                    value={formValues.publisher}
                                    onChange={handleInputChange}
                                />
                            </div>

                        </div>

                        <div className="flex ">
                            <div className="mb-4 text-2xl ">
                                <input
                                    type="text"
                                    className="w-48 mr-4 h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                                    placeholder="pages"
                                    name="pages"

                                    value={formValues.pages}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-4 text-2xl ">
                                <input
                                    type="text"
                                    className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                                    placeholder="price"
                                    name="price"
                                    value={formValues.price}
                                    onChange={handleInputChange}

                                />
                            </div>

                        </div>

                        <div className="mb-0 hidden text-2xl ">
                            <input
                                type="text"
                                className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                                placeholder="synopsis"
                                name="synopsis"

                            />
                        </div>

                        <div className='flex flex-row space-x-4'>
                            <button
                                type="submit"

                                className="w-full h-10 p-3 bg-[#20234A] text-white text-4xl tracking-widest rounded-xl ring ring-[#272E87] ring-offset-0 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-90"
                            >
                                <p className="-m-2"> UPDATE </p>
                            </button>

                            <button
                                type="button"
                                className="w-full h-10 p-3 bg-[#20234A] text-white text-4xl tracking-widest rounded-xl ring ring-[#272E87] ring-offset-0 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-90"
                            >
                                <p className="-m-2"> CANCEL </p>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

    export default BookUpdate

