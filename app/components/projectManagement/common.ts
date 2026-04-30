export const PROJECT_STATUS = [
  {
    label: "営業中（Cヨミ）",
    value: "c-yomi",
  },
  {
    label: "営業中（Bヨミ）",
    value: "b-yomi",
  },
  {
    label: "営業中（Aヨミ）",
    value: "a-yomi",
  },
  {
    label: "受注前低確度（正式見積発行済）",
    value: "low-accuracy",
  },
  {
    label: "受注前高確度（内示メール添付必須）",
    value: "high-accuracy",
  },
  {
    label: "受注確定",
    value: "completed",
  },
  {
    label: "保守",
    value: "conservation",
  },
  {
    label: "失注",
    value: "lost",
  },
];

export const PROJECT_STATUS_GROUP = [
  {
    label: "失注以外",
    value: [
      "c-yomi",
      "b-yomi",
      "a-yomi",
      "low-accuracy",
      "high-accuracy",
      "conservation",
      "completed",
    ],
  },
  {
    label: "Aヨミ以上",
    value: ["c-yomi", "b-yomi", "a-yomi"],
  },
  {
    label: "受注確定",
    value: ["low-accuracy", "high-accuracy", "completed", "conservation"],
  },
  {
    label: "全て",
    value: [
      "c-yomi",
      "b-yomi",
      "a-yomi",
      "low-accuracy",
      "high-accuracy",
      "conservation",
      "completed",
      "lost",
    ],
  },
  {
    label: "クリア",
    value: [],
  },
];

export const PROJECT_MONTH_GROUP = [
  {
    label: "上半期(1-6月)",
    value: ["1", "2", "3", "4", "5", "6"],
  },
  {
    label: "下半期(7-12月)",
    value: ["7", "8", "9", "10", "11", "12"],
  },
  {
    label: "Q1(1-3月)",
    value: ["1", "2", "3"],
  },
  {
    label: "Q2(4-6月)",
    value: ["4", "5", "6"],
  },
  {
    label: "Q3(7-9月)",
    value: ["7", "8", "9"],
  },
  {
    label: "Q4(10-12月)",
    value: ["10", "11", "12"],
  },
  {
    label: "全月",
    value: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  },
  {
    label: "クリア",
    value: [],
  },
];

export const PROJECT_MONTH = [
  {
    label: "1月",
    value: "1",
  },
  {
    label: "2月",
    value: "2",
  },
  {
    label: "3月",
    value: "3",
  },
  {
    label: "4月",
    value: "4",
  },
  {
    label: "5月",
    value: "5",
  },
  {
    label: "6月",
    value: "6",
  },
  {
    label: "7月",
    value: "7",
  },
  {
    label: "8月",
    value: "8",
  },
  {
    label: "9月",
    value: "9",
  },
  {
    label: "10月",
    value: "10",
  },
  {
    label: "11月",
    value: "11",
  },
  {
    label: "12月",
    value: "12",
  },
];

export const MITSUMORI_OPITIONS = [
  {
    label: "未登録",
    value: "not-registered",
  },
  {
    label: "見積発行依頼中",
    value: "requesting",
  },
  {
    label: "見積発行済",
    value: "requested",
  },
  {
    label: "完了",
    value: "completed",
  },
];

export const TYUUMON_OPTIONS = [
  {
    label: "未登録",
    value: "not-registered",
  },
  {
    label: "注文書発行依頼中",
    value: "requesting",
  },
  {
    label: "注文書未回収",
    value: "not-requested",
  },
  {
    label: "注文書回収済み",
    value: "requested",
  },
  {
    label: "完了",
    value: "completed",
  },
];

export const GAITYUU_OPTIONS = [
  {
    label: "未登録",
    value: "not-registered",
  },
  {
    label: "外注見積添付済",
    value: "外注見積添付済",
  },
  {
    label: "外注発注書発行済",
    value: "外注発注書発行済",
  },
  {
    label: "外注発注済",
    value: "外注発注済",
  },
  {
    label: "検収書送付済",
    value: "検収書送付済",
  },
  {
    label: "完了（計上済）",
    value: "completed",
  },
];

export const KAINNSYUU_OPTIONS = [
  {
    label: "未登録",
    value: "not-registered",
  },
  {
    label: "検収書発行依頼中",
    value: "requesting",
  },
  {
    label: "検収書未回収",
    value: "not-requested",
  },
  {
    label: "検収書回収済",
    value: "requested",
  },
  {
    label: "完了",
    value: "completed",
  },
];

export const KAIHATU_OPTIONS = [
  {
    label: "未登録",
    value: "not-registered",
  },
  {
    label: "完了",
    value: "completed",
  },
];

export const ZENNKINN_OPTIONS = [
  {
    label: "未登録",
    value: "not-registered",
  },
  {
    label: "請求書発行依頼中",
    value: "請求書発行依頼中",
  },
  {
    label: "請求書発行済",
    value: "請求書発行済",
  },
  {
    label: "請求書送付済",
    value: "請求書送付済",
  },
  {
    label: "完了",
    value: "completed",
  },
];

export const SEIKYUU_OPTIONS = [
  {
    label: "未登録",
    value: "not-registered",
  },
  {
    label: "請求書発行依頼中",
    value: "請求書発行依頼中",
  },
  {
    label: "請求書発行済",
    value: "請求書発行済",
  },
  {
    label: "請求書確認済",
    value: "請求書確認済",
  },
  {
    label: "請求書送付済",
    value: "請求書送付済",
  },
  {
    label: "完了（計上済）",
    value: "completed",
  },
];
