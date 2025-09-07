import type {TaskStateModel} from "../models/TaskStateModel.ts";

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
    private worker: Worker;

    private constructor() {
        this.worker = new Worker(new URL('./TimerWorker.js', import.meta.url));
    }

    static getIntance() {
        if (!instance) {
            instance = new TimerWorkerManager();
        }
        return instance;
    }

    postMessage(message: TaskStateModel) {
        this.worker.postMessage(message);
    }

    onmessage(cb: (e: MessageEvent) => void) {
        this.worker.onmessage = cb;
    }

    terminate() {
        this.worker.terminate();
        instance = null;
    }
}