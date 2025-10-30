/** @odoo-module **/
import { Component, useState } from "@odoo/owl";
import { COMPONENTS_REGISTRY } from "../registry/components_registry";

//Router like Component
export class RouterComponent extends Component {

    static template = "owl_technical_training.router_component";
    static props = {
        appId: {
            type: String,
            optional: true,
        },
    };

    setup() {
        this.registry = COMPONENTS_REGISTRY;
        this.state = useState({ currentAppId: this.props.appId || 'standalone_app' });
    }

    switchApp(appId) {
        this.state.currentAppId = appId;
    }

    get currentAppComponent() {
        return this.registry[this.state.currentAppId]
    }
}
