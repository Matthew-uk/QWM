declare global {
  interface Window {
    MonnifySDK: {
      initialize(config: MonnifyConfig): void;
    };
  }
}

export interface MonnifyConfig {
  amount: number;
  currency: string;
  reference: string;
  customerFullName: string;
  customerEmail: string;
  customerMobileNumber: string;
  apiKey: string;
  contractCode: string;
  paymentDescription: string;
  isTestMode: boolean;
  metadata: Record<string, any>;
  paymentMethods: string[];
  onComplete: (response: MonnifyResponse) => void;
  onClose: () => void;
}

export interface MonnifyResponse {
  transactionReference: string;
  paymentReference: string;
  amountPaid: number;
  totalPayable: number;
  settlementAmount: number;
  paymentStatus:
    | 'PAID'
    | 'OVERPAID'
    | 'PARTIALLY_PAID'
    | 'PENDING'
    | 'ABANDONED'
    | 'CANCELLED'
    | 'FAILED';
  paymentMethod: string;
  currency: string;
  paidOn: string;
}
