/** @odoo-module **/
import { Component, useRef, useState, onMounted } from "@odoo/owl";
import { Task } from "./task_component/task";
import { createTaskStore } from "./task_component/task_list";

export class TodoApp extends Component {
    static template = "owl_technical_training.todo_app";
    static components = { Task };

    setup() {
        const inputRef = useRef("add-input");
        onMounted(() => {
            inputRef.el.focus();
        })
        this.store = createTaskStore();
        this.filter = useState({ value: "all" });
    }

    addTask(ev) {
        if (ev.keyCode === 13) {
            console.log('Im here trying to save');
            this.store.addTask(ev.target.value);
            ev.target.value = "";
        }
    }

    get displayedTasks() {
        const tasks = this.store.tasks;
        switch (this.filter.value) {
            case "active":
                return tasks.filter((t) => !t.isCompleted);
                break;
            case "completed":
                return tasks.filter((t) => t.isCompleted);
            case "all":
                return tasks;
        }
    }

    setFilter(filter) {
        this.filter.value = filter;
    }
}