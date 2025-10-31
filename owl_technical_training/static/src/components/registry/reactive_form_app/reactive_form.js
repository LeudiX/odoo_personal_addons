/** @odoo-module **/
import { Component, useState } from "@odoo/owl";

export class ReactiveForm extends Component {
    static template = "owl_technical_training.reactive_form";
    setup() {
        this.state = useState({ step: 1, name: '', email: '', address: '' });
    }

    next() {
        this.state.step += 1;
    }

    submit() {
        alert(`Welcome ${this.state.name} from ${this.state.address}. This is your email: ${this.state.email}!!`);
        this.state.step = 4;
    }
}
