/** @odoo-module **/
import { Component, useState } from "@odoo/owl";

export class CounterApp extends Component {
    static template = "owl_technical_training.counter_app";
    setup() {
        this.state = useState({ value: 0 });
    }
    increment(){
        this.state.value++;
    }
}