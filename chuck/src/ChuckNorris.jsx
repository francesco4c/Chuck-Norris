import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import "./style.css";

function ChuckNorris() {
    const [joke, setJoke] = useState("");
    const [loadJoke, setLoadJoke] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        handleLoadJoke();
        if (loadJoke) {
        fetchJoke();
        fetchCategories();
        }
    }, [loadJoke]);

    const handleLoadJoke = () => {
        setLoadJoke(true);
    };

async function fetchJoke(category = '') {
    let url = "https://api.chucknorris.io/jokes/random";
    if (category) {
        url += `?category=${category}`;
    }
        try {
            const response = await axios.get(url);
            setJoke(response.data.value);
        } catch (error) {
            console.error('Errore nella ricerca scherzo', error);
    }
}    


async function fetchCategories() {
    try {
        const response = await axios.get("https://api.chucknorris.io/jokes/categories");
        setCategories(response.data);
    } catch (error) {
        console.error('Errore nella ricerca categorie', error);
    }
}

function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
    fetchJoke(event.target.value);
}


    const textareaRef = useRef();

    const copy = () => {
        const textareaElement = textareaRef.current;

        textareaElement.select();
        textareaElement.setSelectionRange(0, 99999);

        document.execCommand('copy');

        alert("Testo copiato:" + textareaElement.value);
    }



 return (
    <div>
    <header>
    <h1>Webapp API CHUCK NORRIS</h1>
    <h3>DESIGN DI UNA PAGINA CHE UTILIZZA LA API DI CHUCKNORRIS.IO PER GENERARE ALLA PRESSIONE DI<br></br> UN PULSANTE UNA BATTUTA DEL TIPO CHE SELEZIONI NEL MENU A TENDINA QUI SOTTO.</h3>
  </header>
    <div className="container">
      <div>
        <div className="logo" align="center"><img class="img-fluid d-block rounded-circle mx-auto" src="/chuckNorris.png"></img></div>
      </div>
      <div>
        <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Tutte</option>
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
        <div className="col-md-12"><textarea className="text_chuck" ref={textareaRef} id="category-select" rows="4" cols="50" value={joke}></textarea></div>
        <div className="col-md-12"><button className="btn" onClick={() => fetchJoke(selectedCategory)}>Carica Joke</button></div>
        <div className="col-md-12"><button className="btn" onClick={copy}>Copia Testo</button></div>

      </div>
    </div>
    <div>
    </div>
    </div>
);

} 
 
export default ChuckNorris;