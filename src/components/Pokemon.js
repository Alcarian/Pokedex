import React, { useEffect, useState } from "react";

export default function App() {
  const [pokeCard, setPokeCard] = useState(null);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    const url = `https://pokebuildapi.fr/api/v1/pokemon/${inputSearch}`;
    const headers = {
      "User-Agent": "RobotPokemon",
      "Content-type": "application/json",
    };

    fetch(url, { headers })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "La requête a échoué avec le code d'état:" + response.status
          );
        }
      })
      .then((data) => {
        // Vérifier si data est un objet unique ou un tableau
        if (Array.isArray(data)) {
          setPokeCard(data);
        } else {
          setPokeCard([data]);
        }
      })
      .catch((error) => console.error(error));
  }, [inputSearch]);

  if (!pokeCard) {
    return <div>Loading...</div>;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const search = (e) => {
    setInputSearch(e.target.value);
    if (e.target.value === "") {
      setInputSearch("");
    }
  };

  console.log(inputSearch);

  return (
    <div className="pokemon">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Chercher un pokemon"
          defaultValue={search}
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>
      <div className="poke-card">
        {pokeCard.slice(0, 48).map((data, pokedexId) => (
          <div className="cards" key={pokedexId}>
            <li>
              <div className="pokedex-infos">
                <p>N°{data.pokedexId}:</p>
                <p>{data.name}</p>
              </div>

              <img src={data.image} alt={data.name} />
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}
