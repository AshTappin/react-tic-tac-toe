import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let Square  = (props) => {
        return (
            <button
                className="square"
                onClick={props.onClick}>
                {props.value}
            </button>);
};

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            isDraw: false
        }
    }
    handleClick(squarePosition) {
        const squares = this.state.squares.slice();

        if (thereIsAWinnerOrSquareHasBeenFilled(squares, squarePosition)) {
            return;
        }

        squares[squarePosition] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            isDraw: !calculateWinner(squares) && areAllSquaresFilled(squares) ? true : false
        });

        function thereIsAWinnerOrSquareHasBeenFilled() {
            return calculateWinner(squares) || squares[squarePosition];
        }
    }
    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        const winner = calculateWinner(this.state.squares);


        const status = winner
            ? `Winner: ${winner}`
            :  this.state.isDraw
                ? `It's a draw!`
                : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

        return (
            <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        </div>
    );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
            </div>
            </div>
    );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
        [2, 4, 6]
    ];

    // lines
    //     .filter(line => {
    //         const [a, b, c] = line;
    //         return (squares[a]) && (squares[a] === squares[b]) && (squares[a] === squares[c]);
    //     });
    // TODO refactor below

    for (let count = 0; count <lines.length; count++) {
        const [a, b, c] = lines[count];
        if ((squares[a]) && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
            return squares[a];
        }
    }

    return null;
}

function areAllSquaresFilled(squares) {
    return squares
        .every(square => containsXorO(square))
}

function containsXorO(square) {
    return square === 'X' || square === 'O'
}
// ========================================

ReactDOM.render(
<Game />,
    document.getElementById('root')
);
