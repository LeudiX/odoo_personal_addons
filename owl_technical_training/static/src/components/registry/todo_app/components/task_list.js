/** @odoo-module **/

import { useLocalStorageState } from "../../../hooks/useLocalStorageState";

export function createTaskStore() {
    const { state, saveToStorage } = useLocalStorageState("todo_app", { tasks: [] });

    return {
        get tasks() { return state.tasks; },

        addTask(input) {
            input = input.trim();
            if (!input) return;
            const id = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
            this.tasks.push({ id, title: input, isCompleted: false });
            saveToStorage();
        },

        toggleTask(task) {
            task.isCompleted = !task.isCompleted;
            saveToStorage();
        },

        deleteTask(task) {
            const index = this.tasks.findIndex(t => t.id === task.id);
            if (index !== -1) this.tasks.splice(index, 1);
            saveToStorage();
        },
    };
}
