"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
class ValueObject {
    equals(other) {
        if (other === null || other === undefined) {
            return false;
        }
        if (this.constructor !== other.constructor) {
            return false;
        }
        return this.getEqualityComponents().every((component, index) => {
            return component === other.getEqualityComponents()[index];
        });
    }
}
exports.ValueObject = ValueObject;
