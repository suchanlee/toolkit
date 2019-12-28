// Copied from https://github.com/facebook/react/issues/5465#issuecomment-157888325
export function makeCancellable<T>(promise: Promise<T>): CancellablePromise<T> {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)));
    promise.catch(error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error)));
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    }
  };
}

export interface CancellablePromise<T> {
  promise: Promise<T>;
  cancel(): void;
}
