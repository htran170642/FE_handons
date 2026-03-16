import { useState } from 'react';

function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }) {
  return (
    <button onClick={onSquareClick} style={{ width:60, height:60, fontSize:24, fontWeight:'bold', cursor:'pointer', border:'2px solid #999' }}>
      {value}
    </button>
  );
}

// Board giờ không có state — chỉ hiển thị theo props từ Game
function Board({ squares, onSquareClick }) {
  return (
    <div>
      {[0,1,2].map((row) => (
        <div key={row} style={{ display:'flex' }}>
          {[0,1,2].map((col) => {
            const i = row * 3 + col;
            return <Square key={i} value={squares[i]} onSquareClick={() => onSquareClick(i)} />;
          })}
        </div>
      ))}
    </div>
  );
}

// Game — chứa toàn bộ state, kể cả lịch sử
export default function Game() {
  // history: array of snapshots — mỗi phần tử là 1 board tại thời điểm đó
  // ban đầu chỉ có 1 snapshot: board rỗng
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // currentMove: đang xem nước đi thứ mấy (0 = đầu game)
  const [currentMove, setCurrentMove] = useState(0);

  // Derived state — tính từ state, không cần useState
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0; // move 0,2,4... → X | move 1,3,5... → O

  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every(Boolean);

  let status;
  if (winner)      status = `Winner: ${winner} 🎉`;
  else if (isDraw) status = 'Draw! 🤝';
  else             status = `Next: ${xIsNext ? 'X' : 'O'}`;

  function handleSquareClick(i) {
    if (currentSquares[i] || winner) return;

    const nextSquares = [...currentSquares];
    nextSquares[i] = xIsNext ? 'X' : 'O';

    // Cắt lịch sử từ currentMove+1 trở đi (nếu đang xem nước cũ)
    // rồi thêm snapshot mới vào cuối
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move); // chỉ đổi currentMove — history không thay đổi
  }

  return (
    <div style={{ display:'flex', gap:32, padding:16, border:'2px solid black', margin:8 }}>

      {/* Bên trái: board */}
      <div>
        <h2>Tic Tac Toe</h2>
        <p style={{ fontWeight:'bold', fontSize:18 }}>{status}</p>
        <Board squares={currentSquares} onSquareClick={handleSquareClick} />
      </div>

      {/* Bên phải: danh sách nước đi */}
      <div>
        <h3>Move history</h3>
        <ol>
          {history.map((_, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {move === 0 ? 'Go to start' : `Go to move #${move}`}
              </button>
              {move === currentMove && ' ←'}
            </li>
          ))}
        </ol>
      </div>

    </div>
  );
}
