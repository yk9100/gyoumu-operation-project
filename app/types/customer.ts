export interface ICustomer {
  id: string;
  customerName: string;
  buildingName?: string;
  tdbRating?: string;
  rankLevel?: string;
  isCompany?: boolean;
  memo?: string;
  paymentSite?: string;
  lineDay?: string;
  paymentMonth?: string;
  paymentDay?: string;
  requestDate?: string;
  postalCode?: string;
  address?: string;
  createdAt: string;
}
