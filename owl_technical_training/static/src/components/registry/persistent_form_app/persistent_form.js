/** @odoo-module **/
import { Component } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

export class PersistentForm extends Component {

    static template = "owl_technical_training.persistent_form";

    setup() {
        this.notification = useService("notification");

        // useLocalStorageState custom hook
        this.state = useLocalStorageState("persistent_form", {
            name: "",
            email: "",
            age: "",
        });
    }

    reset() {
        this.state.name = "";
        this.state.email = "";
        this.state.age = "";
    }

    notify() {
        this.notification.add(_t(`Hi ${this.state.name}!. Your data persisted in LocalStorage!!`),
            { title: "Persitent State", type: "success" }
        );
    }
}
