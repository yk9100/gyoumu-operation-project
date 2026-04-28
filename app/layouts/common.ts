export const ROUTE_TITLE_MAP: Record<string, string> = {
  "/home": "ホーム",
  "/my-task": "マイタスク",
  "/project-management": "プロジェクト管理",
  "/user-info#basic-info": "アカウント情報>基本情報",
  "/user-info#personnel-info": "アカウント情報>人事情報",
  "/user-info#salary-info": "アカウント情報>給与情報",
  "/other/contact": "その他>お問い合わせ",
  "/other/terms": "その他>利用規約",
  "/other/privacy": "その他>プライバシーポリシー",
  "/task-detail": "タスク詳細",
  "/create-task": "タスクを作成",
  "/back-office/member-management/list": "メンバー一覧",
  "/back-office/member-management/registration": "メンバー登録",
  "/back-office/outsourcing-management/list": "外注先一覧",
  "/back-office/outsourcing-management/registration": "外注先登録",
  "/back-office/customer-management/list": "顧客一覧",
  "/back-office/customer-management/registration": "顧客登録",
  "/back-office/department-management/email": "メールアドレス更新",
  "/back-office/department-management/list": "部署一覧",
  "/back-office/department-management/registration": "部署登録",
  "/back-office/employee-management/list": "雇用一覧",
  "/back-office/employee-management/registration": "雇用登録",
  "/back-office/referral-management/list": "紹介元一覧",
  "/back-office/referral-management/registration": "紹介元登録",
  "/back-office/notification-management/manual": "マニュアルURL",
  "/back-office/notification-management/list": "お知らせー覧",
  "/back-office/notification-management/registration": "お知らせ追加",
};

export const BREADCRUMB_CONFIG: Record<
  string,
  { title: string; href?: string }[]
> = {
  "/user-info#basic-info": [
    {
      title: "アカウント情報",
    },
    {
      title: "基本情報",
    },
  ],
  "/user-info#personnel-info": [
    {
      title: "アカウント情報",
    },
    {
      title: "人事情報",
    },
  ],
  "/user-info#salary-info": [
    {
      title: "アカウント情報",
    },
    {
      title: "給与情報",
    },
  ],
  "/other/contact": [
    {
      title: "その他",
      href: "/other",
    },
    {
      title: "お問い合わせ",
    },
  ],
  "/other/terms": [
    {
      title: "その他",
      href: "/other",
    },
    {
      title: "利用規約",
    },
  ],
  "/other/privacy": [
    {
      title: "その他",
      href: "/other",
    },
    {
      title: "プライバシーポリシー",
    },
  ],
  "/task-detail": [
    {
      title: "マイタスク",
      href: "/my-task",
    },
    {
      title: "タスク詳細",
    },
  ],
  "/create-task": [
    {
      title: "マイタスク",
      href: "/my-task",
    },
    {
      title: "タスクを作成",
    },
  ],
  "/back-office/member-management/member-list": [
    {
      title: "メンバー管理",
    },
    {
      title: "メンバー一覧",
    },
  ],
  "/back-office/member-management/member-registration": [
    {
      title: "メンバー管理",
    },
    {
      title: "メンバー登録",
    },
  ],
  "/back-office/member-management/member-import": [
    {
      title: "メンバー管理",
    },
    {
      title: "メンバーインポート",
    },
  ],
  "/back-office/member-management/member-work-time-import": [
    {
      title: "メンバー管理",
    },
    {
      title: "作業時間インポート",
    },
  ],
};
