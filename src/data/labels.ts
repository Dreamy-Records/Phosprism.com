// 作品・ニュースを分けるレーベル。先頭が初期表示になる。
export const labelIds = ['phosprism', 'dreamy-records'] as const;

export type LabelId = (typeof labelIds)[number];

export type Label = {
  id: LabelId;
  name: string;
  status?: string;
  note?: string;
};

export const labels: Label[] = [
  { id: 'phosprism', name: "PHOS'PRISM" },
  {
    id: 'dreamy-records',
    name: 'DREAMY RECORDS',
    status: 'DISBANDED',
    note: 'Dreamy Recordsは解散しました。こちらは活動期間中のアーカイブです。',
  },
];

export const defaultLabel: LabelId = labelIds[0];
