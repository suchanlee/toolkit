export interface BannerState {
  value: string | undefined;
}

export function createInitialBannerState(): BannerState {
  return {
    value: undefined
  };
}
