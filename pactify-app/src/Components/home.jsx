
import Footer from './footer.jsx';
import NavBar from './navBar.jsx'

function HomePage(){
    return (
        <div>
            <NavBar/>
            <div className="min-h-screen flex flex-col justify-between bg-orange-100">
                <div className="flex flex-row justify-evenly place-content-center flex-wrap pt-40">
                    <h1 className="text-4xl text-black font-bold mb-2">This is the HOME page</h1>
                </div>  
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;