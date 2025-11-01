/** @odoo-module **/
import { CounterApp } from "./counter_app/counter";
import { PersistentForm } from "./persistent_form_app/persistent_form";
import { ReactiveForm } from "./reactive_form_app/reactive_form";
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
    reactive_form_app: {
        id: 'reactive_form_app',
        title: 'Reactive Form App',
        description: 'A simple reactive OWL form wizard component to show the utility of useState vs reactive() in Odoo 17 public components registry for UI purposes',
        component: ReactiveForm,
        route: 'tutorials/reactive_form_app',
    },
    persistent_form_app: {
        id: 'persistent_form_app',
        title: 'Persistent Form App',
        description: 'A simple reactive OWL form component to show the concepts of reactivity, custom hooks development, lifecycle awareness and LocalStorage management',
        component: PersistentForm,
        route: 'tutorials/persistent_form_app',
    },
}