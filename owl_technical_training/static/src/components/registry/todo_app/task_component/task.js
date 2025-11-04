/** @odoo-module **/
import { Component } from "@odoo/owl";

export class Task extends Component {
    static template = "owl_technical_training.task";
    static props = ["task","store"];
}