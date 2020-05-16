const STORAGE_KEY = process.env.STORAGE_KEY;

export const state = function () {
    let state = {};

    if (localStorage && localStorage.getItem(STORAGE_KEY)) {
        state = JSON.parse(localStorage.getItem(STORAGE_KEY));
    }

    return state;
}
