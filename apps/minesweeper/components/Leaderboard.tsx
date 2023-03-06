import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";

import { TGame } from "types/index";
import { setDataFetched, setGames, RootState } from "../redux";

export default function Leaderboard() {
  const dispatch = useDispatch();

  const { dataFetched, games } = useSelector((state: RootState) => state);

  const [getType, setGetType] = useState<"easy" | "medium" | "hard">("easy");

  useEffect(() => {
    axios
      .get("/api/leaderboard", {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        dispatch(setDataFetched(true));
        dispatch(setGames(res.data));
      })
      .catch((error: AxiosError) => console.error(error));
  }, [dispatch]);

  function convertTime(gameTime: number): string {
    let newTime = "";

    if (Math.floor(gameTime / 60) === 0) newTime = "00:";
    else if (Math.floor(gameTime / 60) < 10)
      newTime += `0${Math.floor(gameTime / 60)}:`;
    else if (Math.floor(gameTime / 60) < 100)
      newTime += `${Math.floor(gameTime / 60)}:`;

    if (gameTime - Math.floor(gameTime / 60) * 60 === 0) newTime += "00";
    else if (gameTime - Math.floor(gameTime / 60) * 60 < 10)
      newTime += `0${gameTime - Math.floor(gameTime / 60) * 60}`;
    else newTime += gameTime - Math.floor(gameTime / 60) * 60;

    return newTime;
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard__buttons">
        <button
          onClick={() => setGetType("easy")}
          className={`leaderboard__buttons__button ${
            getType === "easy" ? "leaderboard__buttons__button--active" : ""
          }`}
        >
          EASY
        </button>

        <button
          onClick={() => setGetType("medium")}
          className={`leaderboard__buttons__button ${
            getType === "medium" ? "leaderboard__buttons__button--active" : ""
          }`}
        >
          MEDIUM
        </button>

        <button
          onClick={() => setGetType("hard")}
          className={`leaderboard__buttons__button ${
            getType === "hard" ? "leaderboard__buttons__button--active" : ""
          }`}
        >
          HARD
        </button>
      </div>

      {!dataFetched && <div className="leaderboard__loading">LOADING...</div>}

      {dataFetched && (
        <ul className="leaderboard__rankings">
          {games
            .filter((game) => game.gameMode === getType)
            .sort((a, b) => a.time - b.time)
            .map((game: TGame, index: number) => (
              <li className="leaderboard__rankings__game" key={index}>
                <span className="leaderboard__rankings__game__player">
                  {game.username}
                </span>
                <span className="leaderboard__rankings__game__time">
                  {convertTime(game.time)}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
