
import Footer from './footer.js';
import NavBar from './navBar.jsx'

function HomePage(){
    return (
        <div>
            <NavBar/>
            <div className="min-h-screen flex flex-col justify-between bg-orange-100">
                <div className="flex flex-row justify-evenly place-content-start flex-wrap pt-40">
                    <h1 className="text-4xl text-black font-bold mb-2">This is the HOME page</h1>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;