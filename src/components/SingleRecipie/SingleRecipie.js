import React, { useEffect, useState } from "react";

function SingleRecipie() {
  const [loading, setLoading] = useState(true);
  const [recipie, setRecipie] = useState([]);
  const [images, setImages] = useState([]);

  const tagName = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchSingleRecipie = async () => {
      const url = `https://cdn.contentful.com/spaces/xzt8xx1icvbr/environments/master/entries?access_token=${process.env.REACT_APP_API_KEY}&metadata.tags.sys.id[in]=${tagName}`;
      try {
        setLoading(true);
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          setRecipie(data.items[0]);
          setImages(data.includes.Asset[0]);

          setLoading(false);
        } else {
          console.error("Fetch error!");
          alert("There has been an error!");
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchSingleRecipie();
  }, []);

  return (
    <>
      {loading ? (
        <li className="list-group-item">loading...</li>
      ) : (
        <ul className="list-group">
          <div key={recipie.sys.id}>
            <li className="list-group-item">
              <h1>{recipie.fields.header}</h1>
            </li>
            <li className="list-group-item">
              <img key={images.sys.id} src={images.fields.file.url} />
            </li>
            <li className="list-group-item">{recipie.fields.description}</li>
            <div>
              {recipie.fields.ingridientTable.content.map((ingridient) => (
                <div>
                  {ingridient.content.map((ingridient) => (
                    <li className="list-group-item">{ingridient.value}</li>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ul>
      )}
    </>
  );
}

export default SingleRecipie;
