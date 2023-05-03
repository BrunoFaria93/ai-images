import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Imagem  from './assets/logo-openai.png';
import { Home, CreatePost } from './pages';
import { ToastContainer } from 'react-toastify';


const App = () => (
  <BrowserRouter>
    <header className="sticky top-0 z-40 w-full backdrop-blur p-4 flex justify-between 
    items-center transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10
     border-slate-50/[0.06] bg-slate-950/30">
      <Link to="/">
        <img src={Imagem} alt="logo" className="w-28 absolute bg-transparent top-5" />
      </Link>

      <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] hover:bg-[#8589ff] duration-200 text-white px-4 py-2 rounded-md">Create</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-slate-950 min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
      <ToastContainer />
    </main>
  </BrowserRouter>
);

export default App;