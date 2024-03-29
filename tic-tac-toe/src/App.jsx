import { useState } from "react"
import Square from "./components/Square"
import { TURNS } from "./constants"
import { checkWinner, checkDraw } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
export default function App(){
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) // true -> hay ganador, false -> hay empate, null -> aun no hay ganador

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    }else if(checkDraw(newBoard)){
      setWinner(false)
    }

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn) 
  }
  return (
    <main className="board">
      <h1>React - Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {
          board.map((cell, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>{cell}</Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  )
}