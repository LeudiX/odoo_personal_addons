/** @odoo-module **/
import { CounterApp } from "./counter_app/counter";
import { StandaloneApp } from "./standalone_app/standalone_app";


export const COMPONENTS_REGISTRY = {
    standalone_app: {
        id: 'standalone_app',
        title: 'Standalone App',
        description: 'A minimal OWL component running independently',
        component: StandaloneApp,
        route: 'tutorials/standalone_app',
    },
    counter_app: {
        id: 'counter_app',
        title: 'Counter App',
        description: 'A minimal counter OWL component ',
        component: CounterApp,
        route: 'tutorials/counter_app',
    },
}