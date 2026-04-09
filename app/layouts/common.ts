const ROUTE_TITLE_MAP: Record<string, string> = {
  "/home": "ホーム",
  "/my-task": "マイタスク",
  "/project-management": "プロジェクト管理",
  "/user-info#basic-info": "ユーザー情報>基本情報",
  "/user-info#personnel-info": "ユーザー情報>人事情報",
  "/user-info#salary-info": "ユーザー情報>給与情報",
  "/other/contact": "その他>お問い合わせ",
  "/other/terms": "その他>利用規約",
  "/other/privacy": "その他>プライバシーポリシー",
};

const HIDE_BREADCRUMB_ROUTES = ["/home", "/my-task", "/project-management"];

export { ROUTE_TITLE_MAP, HIDE_BREADCRUMB_ROUTES };
