"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
    equals(other) {
        if (other === null || other === undefined) {
            return false;
        }
        if (this.constructor !== other.constructor) {
            return false;
        }
        return this._id === other.id;
    }
}
exports.Entity = Entity;
