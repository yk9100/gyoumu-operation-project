import type { IProjectComment } from '~/types/project-comment';

export const projectCommentMock: IProjectComment[] = [
  {
    id: 1,
    projectId: 'PJ-2024-001',
    content: 'プロジェクトの進行状況について報告します。現在、要件定義書の作成が完了し、設計フェーズに入っています。来週中には設計書のレビューを予定しています。',
    createdAt: '2024-04-15T10:30:00',
    createdBy: '山田 太郎',
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=山田太郎',
    },
  },
  {
    id: 2,
    projectId: 'PJ-2024-001',
    content: '設計書のレビュー結果ですが、いくつかの改善点が見つかりました。特に、データベースのテーブル設計について再検討が必要です。',
    createdAt: '2024-04-16T14:20:00',
    createdBy: '佐藤 一郎',
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=佐藤一郎',
    },
  },
  {
    id: 3,
    projectId: 'PJ-2024-002',
    content: '顧客からの追加要求がありました。画面のレイアウト変更と、いくつかの機能追加が必要になります。詳細は別途共有します。',
    createdAt: '2024-04-15T09:15:00',
    createdBy: '鈴木 次郎',
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=鈴木次郎',
    },
  },
  {
    id: 4,
    projectId: 'PJ-2024-002',
    content: '追加要求について検討しました。見積もりは来週までに提出できる見込みです。影響範囲は大きいので、予算の調整が必要かもしれません。',
    createdAt: '2024-04-15T16:45:00',
    createdBy: '田中 花子',
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=田中花子',
    },
  },
  {
    id: 5,
    projectId: 'PJ-2024-003',
    content: '開発環境の構築が完了しました。全員で共有できるように、アクセス情報を共有ドキュメントに記載しました。',
    createdAt: '2024-04-14T11:00:00',
    createdBy: '高橋 三郎',
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=高橋三郎',
    },
  },
  {
    id: 6,
    projectId: 'PJ-2024-003',
    content: 'テスト計画書の作成を開始しました。単体テストと結合テストのスケジュールを作成中です。来週中にはレビューを行いたいと思います。',
    createdAt: '2024-04-16T10:30:00',
    createdBy: '伊藤 美咲',
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=伊藤美咲',
    },
  },
  {
    id: 7,
    projectId: 'PJ-2024-004',
    content: 'プロジェクト完了お疲れ様でした！検収も無事終了し、顧客からも好評をいただきました。振り返り会議を来週開催しますので、ご参加ください。',
    createdAt: '2024-04-10T17:00:00',
    createdBy: '中村 四郎',
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=中村四郎',
    },
  },
  {
    id: 8,
    projectId: 'PJ-2024-005',
    content: 'デザインカンプのレビュー結果です。いくつかの調整が必要ですが、全体的に問題ありません。修正版を今週中に提出します。',
    createdAt: '2024-04-13T14:00:00',
    createdBy: '吉田 五郎',
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=吉田五郎',
    },
  },
  {
    id: 9,
    projectId: 'PJ-2024-005',
    content: 'ユニットテストのカバレッジが目標値に達しました！引き続き品質を維持していきましょう。',
    createdAt: '2024-04-14T15:30:00',
    createdBy: '松本 由美',
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=松本由美',
    },
  },
  {
    id: 10,
    projectId: 'PJ-2024-006',
    content: '見積書の作成が完了しました。顧客へのプレゼンテーションを来週火曜日に予定しています。資料の最終確認をお願いします。',
    createdAt: '2024-04-15T16:00:00',
    createdBy: '井上 六郎',
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=井上六郎',
    },
  },
];
