function NavBar(){
    return (
        <nav className="bg-violet-950 fixed w-full z-50 top-0 left-0">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <a href='home' className="text-red-500 text-2xl font-black">
                    Pactify
                </a>
                <ul className="flex space-x-4">
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 flex items-center justify-center">
                        <a href="accountInfo">
                            <svg className="absolute w-12 h-12 transform -translate-y-5 -translate-x-1 text-amber-50 -left-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
              
                </ul>
            </div>
        </nav>
      );
}

export default NavBar;