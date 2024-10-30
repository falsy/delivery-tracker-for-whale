"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tracker {
    constructor(params) {
        this.id = params.id;
        this.carrierId = params?.carrierId ? params.carrierId : "";
        this.label = params?.label ? params?.label : "";
        this.trackingNumber = params?.trackingNumber ? params.trackingNumber : "";
        this.memos = params?.memos ? params.memos : [];
    }
    updateCarrierId(newCarrierId) {
        this.carrierId = newCarrierId;
    }
    updateLabel(newLabel) {
        this.label = newLabel;
    }
    updateTrackingNumber(newTrackingNumber) {
        this.trackingNumber = newTrackingNumber;
    }
    addMemo() {
        this.memos.push("");
    }
    updateMemo(index, newMemo) {
        if (typeof this.memos[index] !== "string")
            return;
        this.memos[index] = newMemo;
    }
    deleteMemo(index) {
        this.memos = this.memos.filter((_, i) => i !== index);
    }
}
exports.default = Tracker;
//# sourceMappingURL=Tracker.js.map