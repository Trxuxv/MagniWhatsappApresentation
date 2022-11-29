export interface SendMessage {
  chatId: string;
  typeMessage: number;
  contact: true;
  to: string;
  text: string;
  link: string;
  caption: string;
  template?: {
    language: {
      code: string;
    };
    name: string;
  };
}
