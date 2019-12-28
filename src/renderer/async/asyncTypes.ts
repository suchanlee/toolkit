export type AsyncValue<V> =
  | AsyncNotStarted
  | AsyncLoading<V>
  | AsyncLoaded<V>
  | AsyncReloading<V>
  | AsyncFailedLoading;

export interface InternalAsyncValue<V, S = AsyncStatus> {
  status: S;
  value: V;
}

export type AsyncNotStarted = InternalAsyncValue<void, AsyncStatus.NOT_STARTED>;
export type AsyncLoading<V> = InternalAsyncValue<Promise<V>, AsyncStatus.LOADING>;
export type AsyncLoaded<V> = InternalAsyncValue<V, AsyncStatus.LOADED>;
export type AsyncReloading<V> = InternalAsyncValue<V, AsyncStatus.RELOADING> & {
  promise: Promise<V>;
};
export type AsyncFailedLoading = InternalAsyncValue<void, AsyncStatus.FAILED_LOADING> & {
  error: Error;
};

export enum AsyncStatus {
  NOT_STARTED = "NOT_STARTED",
  LOADING = "LOADING",
  LOADED = "LOADED",
  FAILED_LOADING = "FAILED_LOADING",
  RELOADING = "RELOADING"
}
