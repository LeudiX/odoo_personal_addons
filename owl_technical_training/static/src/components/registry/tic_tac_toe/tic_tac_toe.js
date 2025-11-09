/** @odoo-module **/
import { Component } from "@odoo/owl";
import { Board } from "./components/board/board";


export class TicTacToe extends Component {

    static template = "owl_technical_training.tic_tac_toe";
    static components = {Board}

}