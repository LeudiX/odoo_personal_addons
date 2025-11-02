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
        this.storage = useLocalStorageState("user_profile", {
            name: "",
            email: "",
            age: "",
        });
    }

    onInputChange(ev, field) {
        this.storage.state[field] = ev.target.value;
        console.log(`[PersistentForm] Updated state.${field}:`, this.storage.state[field]);
        this.storage.saveToStorage(); // immediate save on change
    }

    reset() {
        this.storage.state.name = "";
        this.storage.state.email = "";
        this.storage.state.age = "";
        this.storage.saveToStorage();
        console.log(`[PersistentForm] State reset and saved`);
    }

    notify() {
        this.notification.add(_t(`Hi ${this.storage.state.name}!. Your data persisted in LocalStorage!!`),
            { title: "Persitent State", type: "success" }
        );
    }
}
