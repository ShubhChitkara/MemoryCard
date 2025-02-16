import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/card";

function App() {
  const [currentListOfPokemon, setCurrentListOfPokemon] = useState([]);
  const [currentGame, setCurrentGame] = useState(42);
  const [alreadyChosenCards, setAlreadyChosenCards] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [imageUrl,setImageUrl] = useState();

  const score = alreadyChosenCards.length;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              name: details.name,
              image: details.sprites.front_default,
            };
          })
        );

        setCurrentListOfPokemon(pokemonData);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPokemon();
  }, []);


    function shuffleArray() {
      const array = [...currentListOfPokemon];
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      setCurrentListOfPokemon(array);
  }

  function handleClick(id) {
    if (alreadyChosenCards.includes(id)) {
      setHighScore(Math.max(score, highScore));
      setAlreadyChosenCards([]);
      shuffleArray();
      alert("You lost!");
    } else {
      if (score === 19) {
        alert("You won!");
        setHighScore(19);
        setAlreadyChosenCards([]);
        const newGame = Math.random() * (119 - 1) + 1;
        setCurrentGame(newGame);
      }
      setAlreadyChosenCards([...alreadyChosenCards, id]);
      shuffleArray();
    }
  }
  return (
    <>
      <div className="heading">
        <h1 className="title">Pokemon Memory Game</h1>
        <div className="stats">
          <h1>score: {score}</h1>
          <h1>highscore: {highScore}</h1>
        </div>
      </div>
      <h1>
        Click on a card to score a point, but be careful not to pick the same
        one twice.
      </h1>
      <div className="container">
        {currentListOfPokemon.map((item) => {
          return (
            <Card
              key={item.name}
              image={item.image}
              title={item.name}
              onClick={() => handleClick(item.name)}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
