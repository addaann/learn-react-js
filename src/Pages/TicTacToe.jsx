import { useState } from "react"

function Square({ value, onSquareClick, setHighlightWinner }) {
	return <button
						style={{
							height: '50px',
							width: '50px',
							margin: '2px',
							backgroundColor: setHighlightWinner ? '#177053' : '#1a1a1a'
						}}
						onClick={onSquareClick}
						className="square">
							{value}
					</button>
}

function Board({ xIsNext, squares, onPlay }) {
	function handleClick(i) {
		if (squares[i] || calculateWinner(squares)) {
			return
		}
		
		const nextSquares = squares.slice();
		nextSquares[i] = xIsNext ? "X" : "O";
		onPlay(nextSquares);
	}

	const winner = calculateWinner(squares);

	let status;
	if (winner) {
		status = `Winner: ${winner.player}`;
	} else {
		status = `Next player: ${xIsNext ? 'X' : 'O'}`;
	}

	const numRows = 3;
	const numCols = 3;

	function renderSquare(rowIndex) {
		return Array.from({ length: numCols }, (_, colIndex) => {
			const squareIndex = rowIndex * numCols + colIndex;
			const setHighlightWinner = winner && winner.position.includes(squareIndex);

			return <Square setHighlightWinner={setHighlightWinner} key={squareIndex} value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} />
		})
	}

	const board = Array.from({ length: numRows }, (_, rowIndex) => {
		return (
			<div style={{ display: 'flex' }} key={`row-${rowIndex}`} className="board-row">
				{ renderSquare(rowIndex) }
			</div>
		)
	})

	return (
		<>
			<div className="status">{status}</div>
			{ board }
		</>
	)
}

export default function TicTacToe() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
	}
	
	const moves = history.map((squares, move) => {
		let description;
		
		if (move === currentMove) {
			description = move === 0 ? 'You are at game start' : `You are at move #${move}`;
		} else {
			description = move === 0 ? `Go to game start` : `Go to move #${move}`;
		}

		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		)
	})

	return (
		<>
			<div className="game" style={{ display: "flex", gap: '2px' }}>
				<div className="game-board">
					<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
				</div>
				<div className="game-info">
					<div>History move</div>
					<ol style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'start' }}>{moves}</ol>
				</div>
			</div>
		</>
	)
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[0, 4, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[2, 4, 6],
		[3, 4, 5],
		[6, 7, 8]
	];

	for(let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return {
				player: squares[a],
				position: lines[i]
			};
		}
	}

	return null;
}