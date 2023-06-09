import React, { useEffect, useState } from "react";

import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = ({ br }) => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  // const [br, setBr] = useState(false)
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://ai-images-8nu4.onrender.com/api/v1/post",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-slate-200 text-[32px]">
          {br ? "Galeria de Usuários" : "Users Gallery"}
        </h1>
        <p className="mt-2 text-slate-200 text-[14px] max-w-[500px]">
           {!br ? "Explore a compilation of creative and visually amazing pictures produced by DALL-E AI." : "Explore uma compilação de imagens criativas e visualmente impressionantes produzidas pela inteligência artificial DALL-E."} <br /> <br /> {br ? "Desenvolvido por" : "Developed by"}{" "}
          <a href="https://portfolio-brunofaria.vercel.app" className="text-[#6469ff] underline underline-offset-2">Bruno Faria<br/></a>
          {/* <button onClick={() => setBr(!br)} className="bg-slate-500 px-3 py-1 rounded-full mt-3">{!br ? "Traduzir PT-BR" : "Translate to English"}</button> */}
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName={br ? "Buscar posts" : "Search posts"}
          type="text"
          name="text"
          placeholder={br ? "Busque por algo..." : "Search something..."}
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-slate-200 text-xl mb-3">
                {br ? "Mostrando resultados para " : "Showing Results for "}
                <span className="text-slate-200">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards data={allPosts} title="No Posts Yet" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
