"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRight = isRight;
function isRight(ans, trueAns, rule) {
    switch (rule) {
        case "Unique":
            return ans = trueAns;
        default:
            return true;
    }
}
