import { IThreadList } from '@/types/thread';

export const createdRefine = (created: IThreadList['created']): string => {
  return `posted by ${created.slice(0, 10)}  ${created.slice(11, 19)}`;
};
