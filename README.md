# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

//for current score --useState
//for best score --useState
//function that displays cards in random order anytime a user clicks a card
//function that displays cards in random order when the component mounts
//fetch card data from external API using useEffect
//ek hi component bana sakte hai card ka 
//ek function shuffle karega
//ek function api fetch karega
function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  async function getData(data) {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=VWv6VBmqxOs1j6J9LgDTNEV8fCoEX4mp&s=${data}`,
      { mode: "cors" }
    );
    response.json().then(function (response) {
      console.log(response.data.images.original.url);
    });
  }

  return (
    <>
      
    </>
  )
}

export default App
