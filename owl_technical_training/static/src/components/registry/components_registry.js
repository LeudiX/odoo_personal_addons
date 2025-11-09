/** @odoo-module **/
import { CounterApp } from "./counter_app/counter";
import { PersistentForm } from "./persistent_form_app/persistent_form";
import { QRGenerator } from "./qr_generator_app/qr_generator";
import { ReactiveForm } from "./reactive_form_app/reactive_form";
import { StandaloneApp } from "./standalone_app/standalone_app";
import { TicTacToe } from "./tic_tac_toe/tic_tac_toe";
import { TodoApp } from "./todo_app/todo_app";


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
    qr_generator_app: {
        id: 'qr_generator_app',
        title: 'QR Generator App',
        description: 'A simple reactive OWL QR Generator component to show the concepts of reactivity, lifecycle awareness, forms validations and QRCode library management',
        component: QRGenerator,
        route: 'tutorials/qr_generator_app',
    },
    todo_app: {
        id: 'todo_app',
        title: 'TODO List',
        description: 'A simple reactive OWL TODO List component to show the concepts of reactivity, lifecycle awareness and LocalStorage management',
        component: TodoApp,
        route: 'tutorials/todo_app',
    },
    tic_tac_toe: {
        id: 'tic_tac_toe',
        title: 'Tic Tac Toe',
        description: 'A simple reactive OWL TicTacToe minigame component to show the concepts of reactivity, lifecycle awareness and LocalStorage management',
        component: TicTacToe,
        route: 'tutorials/tic_tac_toe',
    },
}