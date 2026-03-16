// Pure function — kiểm tra 8 tổ hợp thắng
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // hàng ngang
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // hàng dọc
    [0, 4, 8], [2, 4, 6],             // đường chéo
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 'X' hoặc 'O'
    }
  }
  return null;
}

// Square — 1 ô vuông
function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      style={{
        width: 60, height: 60, fontSize: 24, fontWeight: 'bold',
        cursor: 'pointer', border: '2px solid #999',
        background: value ? '#f0f0f0' : 'white',
      }}
    >
      {value}
    </button>
  );
}

// Board — bảng 3x3, nhận state từ Game qua props
export default function Board({ squares, xIsNext, onPlay }) {
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  let status;
  if (winner) status = `Winner: ${winner} 🎉`;
  else if (isDraw) status = 'Draw!';
  else status = `Next player: ${xIsNext ? 'X' : 'O'}`;

  function handleClick(i) {
    // Bỏ qua nếu ô đã có giá trị hoặc đã có winner
    if (squares[i] || winner) return;

    const nextSquares = [...squares]; // immutability: copy array
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  return (
    <div>
      <p style={{ fontWeight: 'bold', fontSize: 18 }}>{status}</p>
      {[0, 1, 2].map((row) => (
        <div key={row} style={{ display: 'flex' }}>
          {[0, 1, 2].map((col) => {
            const i = row * 3 + col;
            return (
              <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
            );
          })}
        </div>
      ))}
    </div>
  );
}
