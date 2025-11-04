/** @odoo-module **/
import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";
import { Component, useState } from "@odoo/owl";


export class ReactiveForm extends Component {
    static template = "owl_technical_training.reactive_form";
    setup() {
        this.state = useState({ step: 1, name: '', email: '', address: '' });
        this.notification = useService("notification");
    }

    next() {
        this.state.step += 1;
    }

    showNotification() {
        const message = _t(`Welcome ${this.state.name} from ${this.state.address} and email: ${this.state.email}!!`);
        const url = `https://github.com/LeudiX`;
        this.notification.add(message, {
            title: "Success",
            type: "success",
            sticky: true,
            buttons: [{
                name: "Check my Github",
                primary: true,
                onClick: () => {
                    window.open(url, "_blank")
                },
            }],
        });
    }

    submit() {
        this.showNotification();
        this.state.step = 4;
    }
}
