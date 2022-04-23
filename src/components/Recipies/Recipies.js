import React from "react";
import { Link } from "react-router-dom";

function Recipies({ recipies, images, testfunc }) {
  return (
    <div>
      {recipies.map((recipe) => (
        <div className="container border" key={recipe.sys.id}>
          <h1>{recipe.fields.header}</h1>

          <div className="row">
            {images.map(
              (image) =>
                image.fields.title === recipe.fields.header && (
                  <img
                    className="col"
                    key={image.sys.id}
                    src={image.fields.file.url}
                    alt="Recipe"
                  />
                )
            )}
            <div className="container col">
              <p>{recipe.fields.description}</p>

              <Link to={recipe.fields.slug}>
                <button className="btn btn-info" type="button">
                  Click here to see full Recipe
                </button>
              </Link>
            </div>
          </div>
          <br></br>

          <br></br>
        </div>
      ))}
    </div>
  );
}

export default Recipies;
