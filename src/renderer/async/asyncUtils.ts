import {
  AsyncFailedLoading,
  AsyncLoaded,
  AsyncLoading,
  AsyncNotStarted,
  AsyncReloading,
  AsyncStatus
} from "./asyncTypes";

export function asyncNotStarted(): AsyncNotStarted {
  return {
    status: AsyncStatus.NOT_STARTED,
    value: undefined
  };
}

export function asyncLoading<V>(promise: Promise<V>): AsyncLoading<V> {
  return {
    status: AsyncStatus.LOADING,
    value: promise
  };
}

export function asyncLoaded<V>(value: V): AsyncLoaded<V> {
  return {
    status: AsyncStatus.LOADED,
    value: value
  };
}

export function asyncReloading<V>(value: V, promise: Promise<V>): AsyncReloading<V> {
  return {
    status: AsyncStatus.RELOADING,
    promise: promise,
    value: value
  };
}

export function asyncFailedLoading(error: Error): AsyncFailedLoading {
  return {
    status: AsyncStatus.FAILED_LOADING,
    value: undefined,
    error: error
  };
}
