import {
  AsyncFailedLoading,
  AsyncLoaded,
  AsyncLoading,
  AsyncNotStarted,
  AsyncReloading,
  AsyncStatus,
  AsyncValue
} from "./asyncTypes";

export function asyncNotStarted(): AsyncNotStarted {
  return {
    status: AsyncStatus.NOT_STARTED
  };
}

export function asyncLoading<V>(promise?: Promise<V>): AsyncLoading<V> {
  return {
    status: AsyncStatus.LOADING,
    promise: promise
  };
}

export function asyncLoaded<V>(value: V): AsyncLoaded<V> {
  return {
    status: AsyncStatus.LOADED,
    value: value
  };
}

export function asyncReloading<V>(value: V, promise?: Promise<V>): AsyncReloading<V> {
  return {
    status: AsyncStatus.RELOADING,
    promise: promise,
    value: value
  };
}

export function asyncFailedLoading(error: Error): AsyncFailedLoading {
  return {
    status: AsyncStatus.FAILED_LOADING,
    error: error
  };
}

export function isLoading<T>(asyncValue: AsyncValue<any>): asyncValue is AsyncLoading<T> {
  return asyncValue.status === AsyncStatus.LOADING;
}

export function isLoaded<T>(asyncValue: AsyncValue<any>): asyncValue is AsyncLoaded<T> {
  return asyncValue.status === AsyncStatus.LOADED;
}

export function isFailedLoading(asyncValue: AsyncValue<any>): asyncValue is AsyncFailedLoading {
  return asyncValue.status === AsyncStatus.FAILED_LOADING;
}
