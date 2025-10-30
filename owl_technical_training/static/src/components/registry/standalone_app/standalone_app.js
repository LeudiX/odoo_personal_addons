/** @odoo-module **/
import { Component } from "@odoo/owl";
import { CounterApp } from "../counter_app/counter";

export class StandaloneApp extends Component {
    static template = "owl_technical_training.standalone_app"
    static components = { CounterApp };
}