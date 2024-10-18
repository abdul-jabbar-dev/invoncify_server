export interface Meta {
  formSettings: FormSettings;
  currencySettings: CurrencySettings;
  creationDate: Date;
}

export interface FormSettings {
  invoiceId: boolean;
  dueDate: boolean;
  currency: boolean;
  discount: boolean;
  tax: boolean;
  note: boolean;
}

export interface CurrencySettings {
  currency: string;
  separator: string;
  decimalFraction: string;
  signPlacement: string;
}


export interface RInvoice extends Invoice{
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Invoice {
  client_id: string;
  products: Product[];
  status:"PENDING"| "CANCELLED"| "REFUNDED"| "PAID",
  prePayments?: PrePayment[];
  meta: Meta;
}
export interface Product {
  description: string;
  price: number;
  quantity: number;
}

export interface PrePayment {
  description: string;
  price: number;
}
