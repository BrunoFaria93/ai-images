import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import { toast } from "react-toastify";

const CreatePost = ( {br} ) => {
  const navigate = useNavigate();
  // const [br, setBr] = useState(false)
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt, br);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {

    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://ai-images-8nu4.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://ai-images-8nu4.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        toast("Successfully shared", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-slate-200 text-[32px]">{br ? "Criar" : "Create"}</h1>
        <p className="mt-2 text-slate-200 text-[14px] max-w-[500px]">{br ? "Crie uma imagem criativa através do DALL-E IA e compartilhe com a comunidade." : "Generate an imaginative image through DALL-E AI and share it with the community"}</p>
        {/* <button onClick={() => setBr(!br)} className="text-slate-200 text-[14px] max-w-[500px] bg-slate-500 px-3 py-1 rounded-full mt-3">{!br ? "Traduzir PT-BR" : "Translate to English"}</button> */}
        

      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName={br ? "Seu nome" : "Your Name"}
            type="text"
            name="name"
            placeholder="Ex Bruno Faria"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName={br ? "O que deseja criar?" : "Prompt"}
            type="text"
            name="prompt"
            placeholder={br ? "Um retrato a óleo de um capivara usando trajes medievais" : "An Impressionist oil painting of sunflowers in a purple vase…"}
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            br={br}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain bg-white opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={!generatingImg && generateImage}
            className={generatingImg ? "text-white cursor-wait bg-emerald-600 hover:bg-emerald-500 duration-200 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center" : "text-white bg-emerald-600 hover:bg-emerald-500 duration-200 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"}
          >
            {generatingImg ? br ? "Gerando" : 'Generating...' : br ? "Gerar" : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-slate-200 text-[14px]">{br ? "** Uma vez criada, você pode compartilhar a imagem com outras pessoas na comunidade. **" : "** Once you have created the image you want, you can share it with others in the community **"}</p>
          <button
            type="submit"
            disabled={loading}
            className={loading ? "mt-3 text-white bg-[#6469ff] hover:bg-[#8589ff] duration-200 font-medium cursor-wait rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center" : "mt-3 text-white bg-[#6469ff] hover:bg-[#8589ff] duration-200 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"}
          >
            {loading ? br ? "Compartilhando..." : 'Sharing...' : br ? "Compartilhar com a comunidade" : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;