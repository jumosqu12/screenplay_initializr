import HomePageView from "../views/HomePageView";

export default function AppLayout() {
  return (
    <>
        <header className="bg-gray-800 py-5">
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                <div className="w-64"> 
                    <p className="text-center text-white">ScreenPlay Initialzr</p>
                </div>
            </div>
        </header>
        
        <section className="container min-h-screen mx-auto pt-5">
            <HomePageView/>
        </section>

        <footer className="py-2">
            <p className='text-center'>
                Todos los derechos reservados &copy;{new Date().getFullYear()}
            </p>
        </footer>
    </>
  )
}
