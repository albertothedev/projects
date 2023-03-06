export type TCell = {
  id: string;
  row: number;
  column: number;
  open: boolean;
  flagged: boolean;
  mined: boolean;
  adjacentMines: number;
};

export type TAdjacentCell = {
  topLeft: string | null;
  topCenter: string | null;
  topRight: string | null;
  middleLeft: string | null;
  middleRight: string | null;
  bottomLeft: string | null;
  bottomCenter: string | null;
  bottomRight: string | null;
};

export type TGame = {
  username: string;
  gameMode: "easy" | "medium" | "hard";
  time: number;
};

export type TUser = {
  username: string;
  password: string;
};

export type TCookie = string;
