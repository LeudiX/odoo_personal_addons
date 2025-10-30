/** @odoo-module **/
import { Component, useState } from "@odoo/owl";
import { StandaloneApp } from "./examples/standalone_app/standalone_app";

//Router like Component
export class RouterComponent extends Component {

    static template = "owl_technical_training.router_component";

    setup() {
        this.state = useState({ currentApp: 'standalone_app' });
    }

    switchApp(appName) {
        this.state.currentApp = appName;
    }

    get CurrentAppComponent() {
        switch (this.state.currentApp) {
            case 'standalone_app': return StandaloneApp;
            default: return StandaloneApp;
        }
    }
}
