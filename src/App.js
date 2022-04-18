import React, { useEffect, useState } from "react";
import Recipies from "./components/Recipies/Recipies";
import SingleRecipie from "./components/SingleRecipie/SingleRecipie";
import { Routes, Route } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const [recipies, setRecipies] = useState([]);
  // const [singleRecipie, setSingleRecipie] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchRecipies = async () => {
      const url = `https://cdn.contentful.com/spaces/xzt8xx1icvbr/environments/master/entries?access_token=${process.env.REACT_APP_API_KEY}&include=2`;
      try {
        setLoading(true);
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setRecipies(data.items);
          setImages(data.includes.Asset);
          setLoading(false);
        } else {
          console.error("Fetch error!");
          alert("There has been an error!");
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchRecipies();
  }, []);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     const url = `https://cdn.contentful.com/spaces/xzt8xx1icvbr/environments/master/assets?access_token=${process.env.REACT_APP_API_KEY}`;
  //     try {
  //       setLoading(true);
  //       const response = await fetch(url);

  //       if (response.ok) {
  //         const data = await response.json();

  //         setImages(data.items);

  //         setLoading(false);
  //       } else {
  //         console.error("Fetch error!");
  //         alert("There has been an error!");
  //       }
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };
  //   fetchImages();
  // }, []);

  return (
    <div className="container">
      <div className="p-3 mb-2 bg-light text-dark">
        <h1>Yummy recipies for everyone</h1>
        <p>
          Let this blog inspire you and discover simple, tasty and incredibly
          delicious recipes. Let's call it real soul food for every day. We
          prefer regional products and also avoid additives. From now on we wish
          you a lot of fun discovering and cooking.
        </p>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Recipies recipies={recipies} images={images} />}
        />
        <Route path="/:slug" element={<SingleRecipie images={images} />} />
      </Routes>
      <div className="p-3 mb-2 bg-light text-dark">
        <p>© 2021 | My Cook Book Blog - created by Natalia, Patrizio & Kai</p>
      </div>
    </div>
  );
}

export default App;
