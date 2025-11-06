/** @odoo-module **/
import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";
import { Component, useState } from "@odoo/owl";
import { Square } from "../square/square";

export class Board extends Component {
    static template = "owl_technical_training.tic_tac_toe_board";
    static components = { Square };

    setup() {
        this.state = useState({
            squares: Array(9).fill(null),
            isNextX: true,
        });
        this.notification = useService("notification");
    }

    handleSquareClick(index) {
        // Ignore if game is over or square already taken
        if (this.determineWinner(this.state.squares) || this.state.squares[index]) {
            return;
        }
        const nextSquares = this.state.squares.slice(); // Creates a copy of the squares array instead of modifying the existing array (Inmutability)
        nextSquares[index] = this.state.isNextX ? "X" : "0";
        this.state.squares = nextSquares;
        this.state.isNextX = !this.state.isNextX;
        this.getStatus();
    }

    determineWinner(squares) {
        const winning_lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (let [a, b, c] of winning_lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]; // returns 'x' or '0' 
            }
        }
        return null;
    }

    getStatus() {
        const winner = this.determineWinner(this.state.squares);
        const win_message = `🎉 Winner: ${winner}!`;
        const draw_message = `🤝 It's a draw!`;
        const default_message = `Next: ${this.state.isNextX ? '❌' : '⭕'}!!`;

        if (winner) {
            return this.notification.add(win_message, {
                title: "Success",
                type: "success",
                sticky: true,
            });
        }
        if (this.state.squares.every(square => square !== null)) {
            return this.notification.add(draw_message, {
                title: "Warning",
                type: "warning",
                sticky: true,
            });
        }
        return this.notification.add(default_message, {
            title: "Info",
            type: "info",
        });
    }

}
