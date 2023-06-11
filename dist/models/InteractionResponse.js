"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionResponse = void 0;
class InteractionResponse {
    constructor(message, success) {
        this.message = message;
        this.success = success;
    }
    getMessage() {
        return this.message;
    }
    isSuccess() {
        return this.success;
    }
}
exports.InteractionResponse = InteractionResponse;
//# sourceMappingURL=InteractionResponse.js.map