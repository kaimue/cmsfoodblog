import React from "react";

function SingleRecipie ({recipies, images}) {

    
    return (
        
        <ul className="list-group">{recipies.map((recipe) => (
            `/${recipe.fields.slug}` == window.location.pathname &&
            <div key={recipe.sys.id}>
            <li className="list-group-item"><h1>{recipe.fields.header}</h1></li>
            <li className="list-group-item">{images.map((image) => (
                image.fields.title == recipe.fields.header &&
                <img key={image.sys.id} src={image.fields.file.url}/>
            ))}</li>
            <li className="list-group-item">{recipe.fields.description}</li>
            <div>{recipe.fields.ingridientTable.content.map((ingridient) =>(
                <div>
                {ingridient.content.map((ingridient) => (
                    <li className="list-group-item">
                        {ingridient.value}
                    </li>
                ))}
                </div>
            ))}</div>     
            </div>
        ))}
        </ul>   
    )
}

export default SingleRecipie;