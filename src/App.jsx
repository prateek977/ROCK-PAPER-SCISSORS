
import { useState } from "react";
export default function App() {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [rounds, setRounds] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const emojis = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
  };

  const WINNING_SCORE = 10;
  const isGameOver = userScore >= WINNING_SCORE || computerScore >= WINNING_SCORE;

  function getComputerChoice() {
    const generatemove = Math.random();
    if (generatemove < 0.33) return "rock";
    if (generatemove < 0.66) return "paper";
    return "scissors";
  }

  function handleUserChoice(choice) {
    if (isGameOver) return;

    const comp = getComputerChoice();
    setUserChoice(choice);
    setComputerChoice(comp);
    setRounds(r => r + 1);

    const result = getResult(choice, comp);
    if (result === "You win") setUserScore(s => s + 1);
    if (result === "You lose") setComputerScore(s => s + 1);
  }

  function resetGame() {
    setUserChoice("");
    setComputerChoice("");
    setRounds(0);
    setUserScore(0);
    setComputerScore(0);
  }

  function getResult(user, comp) {
    if (!user || !comp) return "";
    if (user === comp) return "Draw";
    if (
      (user === "rock" && comp === "scissors") ||
      (user === "paper" && comp === "rock") ||
      (user === "scissors" && comp === "paper")
    ) return "You win";
    return "You lose";
  }

  const result = getResult(userChoice, computerChoice);
  const resultClass = result === "You win" ? "win" : result === "You lose" ? "lose" : "draw";
  const finalWinner = userScore >= WINNING_SCORE ? "User" : "Computer";

  return (
    <div className="game-container">
      <h1>Rock Paper Scissors</h1>
      <p className="subtitle">First to {WINNING_SCORE} wins the Trophy</p>

      <div className="scoreboard">
        <div className="score-item">
          <span className="score-label">User</span>
          <span className="score-number">{userScore}</span>
        </div>
        <div className="score-divider">:</div>
        <div className="score-item">
          <span className="score-label">Computer</span>
          <span className="score-number">{computerScore}</span>
        </div>
      </div>

      <div className="display-section">
        <div className="player-box">
          <span className="player-label">User</span>
          <div className="choice-display">
            {userChoice ? emojis[userChoice] : "—"}
          </div>
          <span className="choice-name">{userChoice || "Your Turn"}</span>
        </div>

        <div className="divider">VS</div>

        <div className="player-box">
          <span className="player-label">Computer</span>
          <div className="choice-display">
            {computerChoice ? emojis[computerChoice] : "—"}
          </div>
          <span className="choice-name">{computerChoice || "Waiting..."}</span>
        </div>
      </div>

      <div className="controls">
        <button
          onClick={() => handleUserChoice("rock")}
          disabled={isGameOver}
          className={isGameOver ? "disabled" : ""}
        >
          <span>🪨</span>
          <span>Rock</span>
        </button>
        <button
          onClick={() => handleUserChoice("paper")}
          disabled={isGameOver}
          className={isGameOver ? "disabled" : ""}
        >
          <span>📄</span>
          <span>Paper</span>
        </button>
        <button
          onClick={() => handleUserChoice("scissors")}
          disabled={isGameOver}
          className={isGameOver ? "disabled" : ""}
        >
          <span>✂️</span>
          <span>Scissors</span>
        </button>

        <button onClick={resetGame} className="reset-btn">
          {isGameOver ? "Play Again" : "Reset Game"}
        </button>
      </div>

      <section className="results-section">
        {isGameOver ? (
          <div className={`final-winner-banner ${finalWinner === "User" ? "win" : "lose"}`}>
            <h2>{finalWinner === "User" ? "🎊 CONGRATULATIONS! 🎊" : "💀 GAME OVER"}</h2>
            <p>{finalWinner === "User" ? "You are the Ultimate Champion!" : "The Computer conquered you."}</p>
          </div>
        ) : (
          <>
            <p className="stats">Rounds played: <strong>{rounds}</strong></p>
            {rounds > 0 && (
              <div className={`result-badge ${resultClass}`}>
                {result === "Draw" ? "It's a Draw!" : result === "You win" ? "Point for You!" : "Point for Computer"}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
