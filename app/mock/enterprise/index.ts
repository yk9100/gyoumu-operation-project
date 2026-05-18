import type { IEnterprise } from "~/types/enterprise";

export const mockEnterpriseList: IEnterprise[] = [
    {
        id: "C0001",
        name: "bravesoft株式会社",
        contractStatus: "契約中",
        salesPerson: "企業の担当名",
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        operationSalesPerson: "担当2",
    },
    {
        id: "C0002",
        name: "企業2",
        contractStatus: "契約中",
        salesPerson: "担当2",
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        operationSalesPerson: "担当2",
    },
    {
        id: "C0003",
        name: "企業3",
        contractStatus: "契約中",
        salesPerson: "担当3",
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        operationSalesPerson: "担当3",
    },
];