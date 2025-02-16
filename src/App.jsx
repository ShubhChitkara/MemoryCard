import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/card";



function App() {
  const [currentList, setCurrentList] = useState([]);
  const [currentGame, setCurrentGame] = useState(42);
  const [guessed, setGuessed] = useState([]);
  const [highscore, setHighscore] = useState(0);

  const score = guessed.length;

  useEffect(() => {
    setCurrentList([]);
    fetch(`https://narutodb.xyz/api/character?page=${currentGame}&limit=12`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentList(data.characters);
      });
  }, [currentGame]);

  function shuffle() {
    const array = [...currentList];
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
    if (guessed.includes(id)) {
      setHighscore(Math.max(score, highscore));
      setGuessed([]);
      const newGame = Math.random() * (119 - 1) + 1;
      setCurrentGame(newGame);
      alert("You lost!");
    } else {
      if (score === 11) {
        alert("You won!");
        setHighscore(12);
        setGuessed([]);
      }
      setGuessed([...guessed, id]);
      shuffle();
    }
  }
  return (
    <>
      {currentList.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <div className="heading">
            <h1 className="title">Naruto Memory Game</h1>
            <div className="stats">
              <h1>score: {score}</h1>
              <h1>highscore: {highscore}</h1>
            </div>
          </div>
          <div className="container">
            {currentList.map((item) => {
              return (
                <Card
                  key={item.id}
                  image={item.images[0]}
                  title={item.name}
                  onClick={() => handleClick(item.id)}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default App;
