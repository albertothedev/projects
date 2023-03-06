import {
  useEffect,
  useState,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import { type StaticImageData } from "next/image";
import Image from "next/future/image";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setDataFetched, addGame, RootState } from "../redux";

import { TCell, TAdjacentCell } from "types/index";

import face from "public/static/face.webp";
import faceLoss from "public/static/faceLoss.webp";
import faceWin from "public/static/faceWin.webp";
import faceFlag from "public/static/faceFlag.webp";
import mine from "public/static/mine.webp";
import mineClicked from "public/static/mineClicked.webp";
import flagWrong from "public/static/flagWrong.webp";
import flag from "public/static/flag.webp";
import number1 from "public/static/number1.webp";
import number2 from "public/static/number2.webp";
import number3 from "public/static/number3.webp";
import number4 from "public/static/number4.webp";
import number5 from "public/static/number5.webp";
import number6 from "public/static/number6.webp";
import number7 from "public/static/number7.webp";
import number8 from "public/static/number8.webp";

import useInterval from "utils/useInterval";

type Props = {
  setModalMessage: (param: string) => void;
};

const maxTime = 999;

export default function Game(props: Props) {
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state);

  const [time, setTime] = useState<number>(0);
  const [minesLeft, setMinesLeft] = useState<number>(10);
  const [flagsLeft, setFlagsLeft] = useState<number>(10);
  const [gameState, setGameState] = useState<"waiting" | "playing" | "over">(
    "waiting"
  );
  const [minedCells, setMinedCells] = useState<Array<string>>([]);
  const [flaggedCells, setFlaggedCells] = useState<Array<string>>([]);
  const [gameMode, setGameMode] = useState<"easy" | "medium" | "hard">("easy");
  const [boardSize, setBoardSize] = useState<{ rows: number; columns: number }>(
    {
      rows: 9,
      columns: 9,
    }
  );
  const [board, setBoard] = useState<Array<TCell>>([]);
  const [currentFace, setCurrentFace] = useState<StaticImageData>(face);
  const [clickedCellId, setClickedCellId] = useState<string | null>(null);

  const numbers: Array<StaticImageData> = [
    number1,
    number2,
    number3,
    number4,
    number5,
    number6,
    number7,
    number8,
  ];

  useInterval(() => {
    if (gameState === "playing") {
      setTime(time + 1);

      if (time === maxTime) {
        setCurrentFace(faceLoss);
        setGameState("over");
      }
    }
  }, 1000);

  useEffect(() => {
    init("easy");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const init = (buttonType: "easy" | "medium" | "hard") => {
    setTime(0);
    setFlaggedCells([]);
    setMinedCells([]);
    setGameState("waiting");
    setCurrentFace(face);
    setBoard([]);

    let boardSizeCopy;
    let minesLeftCopy;

    switch (buttonType) {
      case "easy":
        boardSizeCopy = { rows: 9, columns: 9 };
        minesLeftCopy = 10;
        setFlagsLeft(10);
        setGameMode("easy");
        break;

      case "medium":
        boardSizeCopy = { rows: 16, columns: 16 };
        minesLeftCopy = 40;
        setFlagsLeft(40);
        setGameMode("medium");
        break;

      case "hard":
        boardSizeCopy = { rows: 16, columns: 30 };
        minesLeftCopy = 99;
        setFlagsLeft(99);
        setGameMode("hard");
        break;
    }

    const boardCopy: Array<TCell> = [];
    const minedCellsCopy: Array<string> = [];

    for (let i = 1; i <= boardSizeCopy.rows; i++)
      for (let j = 1; j <= boardSizeCopy.columns; j++)
        boardCopy.push({
          id: `cell-${i}-${j}`,
          row: i,
          column: j,
          open: false,
          flagged: false,
          mined: false,
          adjacentMines: 0,
        });

    for (let i = 0; i < minesLeftCopy; i++) {
      let randomCell: number = Math.floor(Math.random() * boardCopy.length);

      while (boardCopy[randomCell].mined)
        randomCell = Math.floor(Math.random() * boardCopy.length);

      boardCopy[randomCell].mined = true;
      minedCellsCopy.push(boardCopy[randomCell].id);

      Object.values(
        getAdjacentCells(boardCopy[randomCell].id, boardSizeCopy)
      ).forEach((adjacentCell) => {
        if (adjacentCell) {
          boardCopy[getBoardPosition(adjacentCell, boardCopy)].adjacentMines++;
        }
      });
    }

    setMinesLeft(minesLeftCopy);
    setBoardSize(boardSizeCopy);
    setMinedCells(minedCellsCopy);
    setBoard(boardCopy);
  };

  const leftClick = (
    e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    const boardCopy = [...board];

    const cell: TCell =
      board[getBoardPosition((e.target as HTMLElement).id, board)];

    if (gameState === "over" || cell.open || cell.flagged) return;

    if (gameState === "waiting") setGameState("playing");

    const isCellEmpty = (adjacentCells: TAdjacentCell) => {
      for (const id of Object.values(adjacentCells)) {
        if (id === null) continue;

        const cell = boardCopy[getBoardPosition(id, boardCopy)];

        if (cell.open || cell.flagged || cell.mined) continue;

        boardCopy[getBoardPosition(id, boardCopy)].open = true;

        if (!cell.adjacentMines) isCellEmpty(getAdjacentCells(id, boardSize));
      }
    };

    if (!cell.mined) {
      cell.open = true;

      if (!getAdjacentMines(cell.id))
        isCellEmpty(getAdjacentCells(cell.id, boardSize));
    }

    if (cell.mined) {
      for (let i = 0; i < flaggedCells.length; i++)
        if (!boardCopy[getBoardPosition(flaggedCells[i], boardCopy)].mined)
          boardCopy[getBoardPosition(flaggedCells[i], boardCopy)].open = true;

      for (let j = 0; j < minedCells.length; j++)
        if (!boardCopy[getBoardPosition(minedCells[j], boardCopy)].flagged)
          boardCopy[getBoardPosition(minedCells[j], boardCopy)].open = true;

      setBoard(boardCopy);
      setCurrentFace(faceLoss);
      setClickedCellId(cell.id);
      setGameState("over");
    } else {
      setBoard(boardCopy);

      isGameWon(boardCopy);
    }
  };

  const rightClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const cell: TCell =
      board[getBoardPosition((e.target as HTMLElement).id, board)];
    const flaggedCellsCopy = [...flaggedCells];

    if (gameState === "over" || cell.open) return;

    if (gameState === "waiting") setGameState("playing");

    if (cell.flagged) {
      flaggedCellsCopy.splice(flaggedCellsCopy.indexOf(cell.id), 1);
      setFlagsLeft(flagsLeft + 1);
      cell.flagged = false;
    } else if (!cell.flagged && flagsLeft > 0) {
      flaggedCellsCopy.push(cell.id);
      setFlagsLeft(flagsLeft - 1);
      cell.flagged = true;
    }

    setFlaggedCells(flaggedCellsCopy);

    if (!isGameWon(board)) {
      if (flagsLeft > 0) setCurrentFace(faceFlag);

      setTimeout(() => setCurrentFace(face), 300);
    }
  };

  const isGameWon = (cells: Array<TCell>) => {
    if (
      cells.filter((elm: TCell) => elm.open && !elm.mined).length ===
        cells.length - minesLeft ||
      cells.filter((elm: TCell) => elm.flagged && elm.mined).length ===
        minesLeft
    ) {
      dispatch(setDataFetched(false));

      setCurrentFace(faceWin);

      const data = {
        username,
        gameMode,
        time,
      };

      axios
        .post(
          "/api/saveGame",
          {
            data,
          },
          { withCredentials: true }
        )
        .then((res: AxiosResponse) => {
          dispatch(
            addGame({
              username: res.data.username,
              gameMode: gameMode,
              time: time,
            })
          );
          dispatch(setDataFetched(true));
          props.setModalMessage(res.data.message);
        })
        .catch((error: AxiosError) => {
          props.setModalMessage(error.message);
        });

      setGameState("over");

      return true;
    }
  };

  const getBoardPosition = (id: string, cells: Array<TCell>) => {
    return cells.findIndex((cell: TCell) => cell.id === id);
  };

  const getAdjacentCells = (
    id: string,
    boardSizeCopy: Record<string, unknown>
  ): TAdjacentCell => {
    const row: number = parseInt((id.match(/\d+/g) as Array<string>)[0]);
    const column: number = parseInt((id.match(/\d+/g) as Array<string>)[1]);

    const adjacentCells: TAdjacentCell = {
      topLeft: null,
      topCenter: null,
      topRight: null,
      middleLeft: null,
      middleRight: null,
      bottomLeft: null,
      bottomCenter: null,
      bottomRight: null,
    };

    if (row !== 1) {
      adjacentCells.topCenter = `cell-${row - 1}-${column}`;

      if (column !== 1) adjacentCells.topLeft = `cell-${row - 1}-${column - 1}`;

      if (column !== boardSizeCopy.columns)
        adjacentCells.topRight = `cell-${row - 1}-${column + 1}`;
    }

    if (row !== boardSizeCopy.rows) {
      adjacentCells.bottomCenter = `cell-${row + 1}-${column}`;

      if (column !== 1)
        adjacentCells.bottomLeft = `cell-${row + 1}-${column - 1}`;

      if (column !== boardSizeCopy.columns)
        adjacentCells.bottomRight = `cell-${row + 1}-${column + 1}`;
    }

    if (column !== 1) adjacentCells.middleLeft = `cell-${row}-${column - 1}`;

    if (column !== boardSizeCopy.columns)
      adjacentCells.middleRight = `cell-${row}-${column + 1}`;

    return adjacentCells;
  };

  const getAdjacentMines = (cellID: string): number => {
    const adjacentCells: TAdjacentCell = getAdjacentCells(cellID, boardSize);
    let adjacentMines = 0;

    Object.entries(adjacentCells).forEach((entry) => {
      if (entry[1] && board[getBoardPosition(entry[1], board)].mined)
        adjacentMines++;
    });

    return adjacentMines;
  };

  return (
    <div className={`game game--${gameMode}`}>
      <div className="game__gameSelection">
        <button
          onClick={() => init("easy")}
          className={`game__gameSelection__button ${
            gameMode === "easy" ? "game__gameSelection__button--active" : ""
          }`}
        >
          EASY
        </button>

        <button
          onClick={() => init("medium")}
          className={`game__gameSelection__button ${
            gameMode === "medium" ? "game__gameSelection__button--active" : ""
          }`}
        >
          MEDIUM
        </button>

        <button
          onClick={() => init("hard")}
          className={`game__gameSelection__button ${
            gameMode === "hard" ? "game__gameSelection__button--active" : ""
          }`}
        >
          HARD
        </button>
      </div>

      <div className="game__scoreboard">
        <div className="game__scoreboard__flags">{flagsLeft}</div>
        <button
          className="game__scoreboard__faceButton"
          onClick={() => init(gameMode)}
        >
          <Image
            className="game__scoreboard__faceButton__face"
            src={currentFace}
            alt="Face"
          />
        </button>
        <div className="game__scoreboard__time">{time}</div>
      </div>

      <div className="game__board">
        {board.map((cell: TCell, index: number) => (
          <div
            id={cell.id}
            className={`game__board__cell${
              cell.open ? " game__board__cell--open" : ""
            }`}
            onClick={(e) => leftClick(e)}
            onKeyDown={(e) => leftClick(e)}
            onContextMenu={(e) => rightClick(e)}
            role="button"
            tabIndex={0}
            key={index}
          >
            {cell.mined &&
              !cell.flagged &&
              cell.open &&
              gameState === "over" &&
              clickedCellId !== cell.id && (
                <Image
                  src={mine}
                  className="game__board__cell--mine"
                  alt="Mine"
                />
              )}

            {cell.mined &&
              !cell.flagged &&
              cell.open &&
              gameState === "over" &&
              clickedCellId === cell.id && (
                <Image
                  src={mineClicked}
                  className="game__board__cell--mine"
                  alt="Mine"
                />
              )}

            {!cell.mined &&
              cell.flagged &&
              cell.open &&
              gameState === "over" && (
                <Image
                  src={flagWrong}
                  className="game__board__cell--mineClicked"
                  alt="Mine exploded"
                />
              )}

            {!!cell.adjacentMines &&
              !cell.mined &&
              cell.open &&
              !cell.flagged && (
                <Image
                  src={numbers[cell.adjacentMines - 1]}
                  className="game__board__cell--number"
                  alt="Number of mines"
                />
              )}

            {cell.flagged && !cell.open && (
              <Image
                src={flag}
                className="game__board__cell--flag"
                alt="Flag"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
