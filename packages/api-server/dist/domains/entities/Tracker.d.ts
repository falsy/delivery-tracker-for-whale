import ITracker from "./interfaces/ITracker";
export default class Tracker implements ITracker {
    readonly id: string;
    carrierId: string;
    label: string;
    trackingNumber: string;
    memos: string[];
    constructor(params: {
        id: string;
        carrierId?: string;
        label?: string;
        trackingNumber?: string;
        memos?: string[];
    });
    updateCarrierId(newCarrierId: string): void;
    updateLabel(newLabel: string): void;
    updateTrackingNumber(newTrackingNumber: string): void;
    addMemo(): void;
    updateMemo(index: number, newMemo: string): void;
    deleteMemo(index: number): void;
}
//# sourceMappingURL=Tracker.d.ts.map