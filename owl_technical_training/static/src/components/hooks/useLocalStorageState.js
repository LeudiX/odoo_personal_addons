/** @odoo-module **/

import { useState, onWillStart, onWillUnmount } from "@odoo/owl";
/**
 *  A custom hook that sync reactive with useState
 * 
 * @param {string} key - The LocalStorage key to use
 * @param {object} initialValue - The default state value
 * @returns {Object} - The reactive state synchronized with LocalStorage
 */

export function useLocalStorageState(key, initialValue = {}) {
    // Load from LocalStorage of fallback to default
    const saved = localStorage.getItem(key); // Restores previous data
    const state = useState(saved ? JSON.parse(saved) : initialValue); // Making the object reactive

    // Save whenever the state changes
    const save = () => localStorage.setItem(key, JSON.stringify(state));

    //Setup side effects
    onWillStart(() => {
        // Listening for external changes (other tabs)
        window.addEventListener("storage", (ev) => {
            if (ev.key === key && ev.newValue) {
                Object.assign(state, JSON.parse(ev.newValue));
            }
        });
    });

    //Cleanup
    onWillUnmount(() => {
        save();
        window.removeEventListener("storage", save);
    });

    // Watching for any property change
    // (OWL automatically re-renders when a reactive property changes)
    new Proxy(state, {
        set(target, prop, value) {
            target[prop] = value;
            save();
            return true;
        },
    });

    return state;
}