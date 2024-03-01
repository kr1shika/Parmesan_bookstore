import axios from 'axios';
import { useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function AddBooks() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        title: '',
        author: '',
        genre: '',
        publicationYear: 0,
        publisher: '',
        pages: 0,
        synopsis: '',
        price: 0.0,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [fileName, setFilename] = useState('no selected file');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImageInputChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            setFilename(files[0].name);
            setImageFile(files[0]);
        }
    };

    const handleBookRegistration = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append('title', user.title);
            formData.append('author', user.author);
            formData.append('genre', user.genre);
            formData.append('publicationYear', user.publicationYear.toString());
            formData.append('publisher', user.publisher);
            formData.append('pages', user.pages.toString());
            formData.append('synopsis', user.synopsis);
            formData.append('price', user.price.toString());


            if (imageFile) {
                formData.append('bookImage', imageFile); // Change key to 'file'
            }

            const response = await axios.post('http://localhost:8086/api/book/saveBook', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            toast.success('Book is successfully registered');

            setUser({
                title: '',
                author: '',
                genre: '',
                publicationYear: 0,
                publisher: '',
                pages: 0,
                synopsis: '',
                price: 0.0,
            });

            setFilename('no selected file'); 
            setImageFile(null);
        } catch (error) {
            toast.error('Book  didnt make it');
            console.error('Error registering book:', error);
        }
    };

    return (
        <div className="flex items-center  justify-center  ">
                <ToastContainer/>
            <div className="flex ml-60 space-x-3 bg-[#F3EAE4] border border-[#F3EAE4] rounded-xl p-6 w-100 shadow-lg shadow-[#44486d]">

                <div>

                    <div className='flex flex-col items-center -mt-10 w-60'>
                        
                    </div>

                    <div
                        onClick={() => (document.querySelector('.input-field') as HTMLElement).click()}
                        className="flex mt-28 flex-col items-center p-2  ml-1 mr-6 border rounded-xl  border-dashed bg-[#20234A] border-[#20234A] w-64 h-96 flex align-middle"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            className="input-field"
                            hidden
                            id='bookImage'
                            onChange={(e) => handleImageInputChange(e.target.files)}
                        />
                        {imageFile ? (
                            <img src={URL.createObjectURL(imageFile)} alt={fileName} className='mt-1 h-96 rounded-lg' />
                        ) : (
                            <MdCloudUpload className='mt-36' color="#F3EAE4" size={70} />
                        )}
                    </div>


                </div>


                <form className="space-y-4 font-jomhu">

                <p className=' font-jomhu text-5xl font-semiBold text-center tracking-wide text-[#20234A]'>Register New Book </p>

                    <div className="mb-4 text-2xl">
                        <input
                            type="text"
                            className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                            placeholder="Title"
                            name="title"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4 text-2xl">
                        <input
                            type="text"
                            className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                            placeholder="Author"
                            name="author"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4 text-2xl">
                        <input
                            type="text"
                            className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                            placeholder="genre"
                            name="genre"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex ">
                        <div className="mb-4 text-2xl ">
                            <input
                                type="text"
                                className="w-48 mr-4 h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                                placeholder="publicationYear"
                                name="publicationYear"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4 text-2xl ">
                            <input
                                type="text"
                                className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                                placeholder="publisher"
                                name="publisher"
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
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4 text-2xl ">
                            <input
                                type="text"
                                className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                                placeholder="price"
                                name="price"
                                onChange={handleInputChange}
                            />
                        </div>



                    </div>

                    <div className="mb-4 text-2xl ">
                        <input
                            type="text"
                            className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                            placeholder="synopsis"
                            name="synopsis"
                            onChange={handleInputChange}
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={handleBookRegistration}
                        className="w-full h-10 p-3 bg-[#20234A] text-white text-4xl tracking-widest rounded-xl ring ring-[#272E87] ring-offset-0 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-90"
                    >
                        <p className="-m-2"> ADD </p>
                    </button>

                </form>
            t</div>
        </div>
    );
}

export default AddBooks
