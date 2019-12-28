export type AsyncValue<V> =
  | AsyncNotStarted
  | AsyncLoading<V>
  | AsyncLoaded<V>
  | AsyncReloading<V>
  | AsyncFailedLoading;

export interface InternalAsyncValue<S = AsyncStatus> {
  status: S;
}

export type AsyncNotStarted = InternalAsyncValue<AsyncStatus.NOT_STARTED>;
export type AsyncLoading<V> = InternalAsyncValue<AsyncStatus.LOADING> & {
  promise?: Promise<V>;
};
export type AsyncLoaded<V> = InternalAsyncValue<AsyncStatus.LOADED> & {
  value: V;
};
export type AsyncReloading<V> = InternalAsyncValue<AsyncStatus.RELOADING> & {
  value: V;
  promise?: Promise<V>;
};
export type AsyncFailedLoading = InternalAsyncValue<AsyncStatus.FAILED_LOADING> & {
  error: Error;
};

export enum AsyncStatus {
  NOT_STARTED = "NOT_STARTED",
  LOADING = "LOADING",
  LOADED = "LOADED",
  FAILED_LOADING = "FAILED_LOADING",
  RELOADING = "RELOADING"
}
