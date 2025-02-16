import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/card";

function App() {
  const [currentListOfPokemon, setCurrentListOfPokemon] = useState([]);
  const [currentGame, setCurrentGame] = useState(42);
  const [alreadyChosenCards, setAlreadyChosenCards] = useState([]);
  const [highScore, setHighScore] = useState(0);

  const score = alreadyChosenCards.length;

  useEffect(() => {
    setCurrentListOfPokemon([]);
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentListOfPokemon(data);
        console.log(currentListOfPokemon)
        data.results.map(element => {
          
          console.log(element.name)
          
        });
        
      });
  }, [currentGame]);

  function shuffle() {
    const array = [...currentListOfPokemon];
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    setCurrentList(array);
  }

  function handleClick(id) {
    if (alreadyChosenCards.includes(id)) {
      setHighScore(Math.max(score, highScore));
      setAlreadyChosenCards([]);
      const newGame = Math.random() * (119 - 1) + 1;
      setCurrentGame(newGame);
      alert("You lost!");
    } else {
      if (score === 20) {
        alert("You won!");
        setHighScore(20);
        setAlreadyChosenCards([]);
      }
      setAlreadyChosenCards([...alreadyChosenCards, id]);
      shuffle();
    }
  }
  return (
    <>
      <div className="heading">
        <h1 className="title">Naruto Memory Game</h1>
        <div className="stats">
          <h1>score: {score}</h1>
          <h1>highscore: {highScore}</h1>
        </div>
      </div>
      <div className="container">
        {currentListOfPokemon[0].map((item) => {
          return (
            <Card
              key={item.name}
              image={item.url}
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
