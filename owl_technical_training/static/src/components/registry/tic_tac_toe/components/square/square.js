/** @odoo-module **/
import { Component } from "@odoo/owl";

export class Square extends Component {
    static template = "owl_technical_training.tic_tac_toe_square";
    static props = ["value", "onClick"]
}