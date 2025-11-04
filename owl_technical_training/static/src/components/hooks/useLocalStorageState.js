/** @odoo-module **/

import { useState, onWillUnmount } from "@odoo/owl";
/**
 *  A custom hook that sync reactive with useState
 * 
 * @param {string} key - The LocalStorage key to use
 * @param {object} defaultValue - The default state value
 * @returns {Object} - The reactive state synchronized with LocalStorage
 */

export function useLocalStorageState(key, defaultValue = {}) {

    console.log(`[useLocalStorageState] Hook initialized with key: ${key}`);

    let saved = {};

    // Load from LocalStorage of fallback to default
    try {
        const raw = localStorage.getItem(key); // Restores previous data
        saved = raw ? JSON.parse(raw) : defaultValue;
        console.log(`[useLocalStorageState] Loaded initial value from localStorage:`, saved);
    } catch (err) {
        console.error(`[useLocalStorageState] Failed to parse localStorage data:`, err);
        saved = defaultValue;
    }

    const state = useState(saved); // Making the object reactive

    // Step 3: Watch for changes and persist to localStorage
    const saveToStorage = () => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
            console.log(`[useLocalStorageState] Saved to localStorage:`, state);
        } catch (err) {
            console.error(`[useLocalStorageState] Failed to save to localStorage:`, err);
        }
    };


    //Cleanup
    onWillUnmount(() => {
        console.log(`[useLocalStorageState] Component unmounting. Saving state...`);
        saveToStorage();
    });

    // Optional: Saving periodically or via user interaction
    window.addEventListener("beforeunload", saveToStorage);

    return { state, saveToStorage };
}