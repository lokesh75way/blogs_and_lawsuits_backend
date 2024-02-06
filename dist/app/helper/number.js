"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomArbitrary = void 0;
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
exports.getRandomArbitrary = getRandomArbitrary;
