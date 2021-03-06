import React, { useState } from "react";
import axios from "axios";

import "./styles/app.css";

//data
import games from "./data/games.json";

//components
import Appbar from "./components/Appbar";
import GameCard from "./components/GameCard";
import Input from "./components/Input";
import Footer from "./components/Footer";
// import Radio from "./components/Radio";

//images
import { photos } from "./helper/photoHelper";
import biscuitDefault from "./assets/BiscuitDefault.jpg";

//Material-UI
import { Grid } from "@material-ui/core";

function App() {
  const [game, setGame] = useState(
    games[games.length - 1]
    // games[Math.floor(Math.random() * games.length)]
  );

  const [gamePhoto, setGamePhoto] = useState(0);
  const [flip, setFlip] = useState(false);

  const gameClick = () => {
    setFlip(!flip);
  };

  const newGame = () => {
    let gameNumber = Math.floor(Math.random() * games.length);
    let photoNumber = Math.floor(Math.random() * Object.keys(photos).length);

    const currentGame = games.findIndex((data) => data.title === game.title);

    if (currentGame === gameNumber) {
      console.log("same game detected!");
      gameNumber === games.length - 1 ? gameNumber-- : gameNumber++;
    }

    if (photoNumber === gamePhoto) {
      console.log("same photo detected!");
      photoNumber === Object.keys(photos).length - 1
        ? photoNumber--
        : photoNumber++;
    }
    setGame(games[gameNumber]);
    setGamePhoto(photoNumber);
  };

  return (
    <div className="App">
      <Appbar />
      <Grid container justify="center">
        <Grid item>
          <div className="gamecard__wrapper">
            <div
              className={flip ? "gamecard__flip" : ""}
              onAnimationEnd={() => {
                flip && newGame();

                setFlip(false);
              }}
            >
              <GameCard game={game} image={gamePhoto} />
            </div>
          </div>
        </Grid>
        <Grid item>
          <Input gameClick={gameClick} />
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
        {/* to be implemented later
        <Grid item>
          <Radio />
        </Grid> */}
      </Grid>
    </div>
  );
}

export default App;
