export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AsyncState {
  status: AsyncStatus;
  error: string | null;
}
