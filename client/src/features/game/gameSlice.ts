import type { RootState } from "@/app/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Color, type PieceSymbol, type Square } from "chess.js";

export interface GameState {
  board:
    | ({
        square: Square;
        type: PieceSymbol;
        color: Color;
      } | null)[][]
    | null;
  gameStatus: { isGameOver: boolean; message: string };
  playerColor: Color | null;
  fen: string;
}

const savedStateFromLS = localStorage.getItem("chessGame");
const parsed = savedStateFromLS ? JSON.parse(savedStateFromLS) : null;

const initialState: GameState = {
  board: null,
  gameStatus: { isGameOver: false, message: "" },
  playerColor: null,
  fen:
    parsed?.fen ?? "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
};

export const gameSlice = createSlice({
  name: "game",

  initialState,
  reducers: {
    setGameStatus: (
      state,
      action: PayloadAction<{ isGameOver: boolean; message: string }>,
    ) => {
      state.gameStatus.isGameOver = action.payload.isGameOver;
      state.gameStatus.message = action.payload.message;
    },
    setFen: (state, action: PayloadAction<string>) => {
      state.fen = action.payload;
    },

    setPlayerColor: (state, action: PayloadAction<Color>) => {
      state.playerColor = action.payload;
    },
    setBoard: (
      state,
      action: PayloadAction<
        ({
          square: Square;
          type: PieceSymbol;
          color: Color;
        } | null)[][]
      >,
    ) => {
      state.board = action.payload;
    },
    resetGame: (state, action: PayloadAction<Color>) => {
      state.board = null;
      state.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      state.gameStatus = {
        isGameOver: false,
        message: "",
      };
      state.playerColor = action.payload;
    },
    startGame: (
      state,
      action: PayloadAction<{
        board: ({
          square: Square;
          type: PieceSymbol;
          color: Color;
        } | null)[][];
        playerColor: Color;
      }>,
    ) => {
      state.board = action.payload.board;
      state.playerColor = action.payload.playerColor;
    },
  },
});

export const {
  setGameStatus,
  setFen,
  setPlayerColor,
  setBoard,
  startGame,
  resetGame,
} = gameSlice.actions;

// selector
export const selectFen = (state: RootState) => state.game.fen;

export default gameSlice.reducer;
