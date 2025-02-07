declare module 'flutterwave-react-v3' {
  export interface Config {
    public_key: string;
    tx_ref: string;
    amount: number;
    currency: string;
    payment_options: string;
    customer: {
      email: string;
      name: string;
    };
    customizations: {
      title: string;
      description: string;
      logo: string;
    };
  }

  export interface FlutterwaveResponse {
    status: 'successful' | 'cancelled';
    transaction_id?: string;
    tx_ref: string;
  }

  export const useFlutterwave: (config: Config) => {
    (options: {
      callback: (response: FlutterwaveResponse) => void;
      onClose: () => void;
    }): void;
  };

  export const closePaymentModal: () => void;
}
