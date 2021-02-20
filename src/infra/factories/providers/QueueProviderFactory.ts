import BullProvider from '@infra/providers/Queue/implementations/BullProvider';

export function QueueProviderFactory() {
  return new BullProvider();
}
