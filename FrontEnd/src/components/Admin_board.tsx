import { useState } from "react";
import { Link } from "react-router-dom";
import AddBooks from "../forms/AddBooks";
import BookUpdate from "../forms/BookUpdate";
import Products from "../pages/Products";
import AdminDefault from "./AdminDefault";

function Admin_board() {

    const [activeTab, setActiveTab] = useState<string | null>(null);
    const handleTabClick = (tab: string) => {
        setActiveTab(prevTab => (prevTab === tab ? null : tab));
    };

    return (
        <div className='flex  '>

            <div className='text-white flex flex-col  w-16 '>

                <img
                    src="src\parmasan_icons\home.png"
                    alt="Registration Image"
                    className="pt-2 mx-auto w-8 mt-64 object-cover"
                />

                <img
                    src="src\parmasan_icons\home.png"
                    alt="Registration Image"
                    className="pt-2 mx-auto w-8 mt-12 object-cover"
                />

                <img
                    src="src\parmasan_icons\home.png"
                    alt="Registration Image"
                    className="pt-2 mx-auto w-8 mt-12 object-cover"
                />

                <img
                    src="src\parmasan_icons\home.png"
                    alt="Registration Image"
                    className="pt-2 mx-auto w-8 mt-12 object-cover"
                />
            </div>

            <div className=' bg-[#F3EAE4] border border-[#20234A] rounded-md -ml-1 w-48 '>

                <Link to="/Landing" > <p className='ml-4 mt-5 font-jomhu text-5xl font-bold tracking-wider text-[#20234A]'>Parmesan </p>
                </Link>

                <img
                    src="src\parmasan_icons\MEOW.png"
                    alt="Registration Image"
                    className="mx-auto -ml-1 -mt-2  h-40 w-40  object-cover transition ease-in-out delay-120 hover:translate-y-2 hover:scale-90"
                />
                <p onClick={() => handleTabClick('addBook')} className='ml-5 mt-12 font-jomhu text-5xl font-medium tracking-wide text-[#20234A] hover:text-[#A9ABCF]'>
                    Add Books </p>

                <p onClick={() => handleTabClick('books')} className='ml-5 mt-12 font-jomhu text-5xl font-medium tracking-wide text-[#20234A] hover:text-[#A9ABCF]'>
                    All Books </p>

                <p onClick={() => handleTabClick('Edit')} className='ml-5 mt-12 font-jomhu text-5xl font-medium tracking-wide text-[#20234A] hover:text-[#A9ABCF]'>
                    Edit Books </p>

            </div>

            {activeTab === 'addBook' && <AddBooks/> }
            {activeTab === 'books' && <Products />}
            {activeTab === 'Edit' && <BookUpdate />}
            {activeTab === null && <AdminDefault />}
        </div>

    )
}

export default Admin_board