export abstract class AbstractWorker {
  start: () => Promise<void>;
}
