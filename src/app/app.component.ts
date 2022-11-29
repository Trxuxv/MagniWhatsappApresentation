import { WhatsappService } from './service/whatsapp.service';
import { SendMessage } from './models/send-message.model';
import { Component, OnInit } from '@angular/core';
import { Message } from './models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private service: WhatsappService) {}

  public fileSelected = {
    name: '',
    link: '',
    type: '',
  };
  public currentInput: any = '';
  public messages: Message[] = [];
  public closeChat: boolean = true;
  public numberContact: string = '';
  public chatExpanded: boolean = false;
  public message: Message = {} as Message;
  public closeCompanySettings: boolean = true;

  companyId = 1;
  title = 'whatsapp';
  chatId = 'hIbEPShL5G1eh50MR3r2XZbeNez2INQTnwdVJERu';

  ngOnInit(): void {
    console.log(this.messages);
    this.service
      .GetMessages(this.chatId)
      .subscribe(
        (x) => (
          x.map(
            (x) =>
              (this.numberContact = this.formatNumberPhone(x.contactNumber))
          ),
          (this.messages = x)
        )
      );
  }

  addMessage() {
    if (this.message.content === null || this.message.content === '') {
    } else {
      const model: Message = {
        chatId: this.chatId,
        contact: true,
        contactNumber: '5541997489578',
        content: this.message.content,
        date: new Date(),
        file: this.fileSelected.link,
        messageId: Math.random().toString(),
        originNumber: '',
      };

      const newMessage: SendMessage = {
        chatId: this.chatId,
        caption: '',
        contact: true,
        link: '',
        text: this.message.content,
        typeMessage: 0,
        to: '5541997489578',
      };

      this.service.PostMessage(newMessage, this.companyId).subscribe((x) => {
        if (x) {
          this.messages.push(model);
        } else {
          throw new Error('Erro ao enviar mensagem.');
        }
      });
    }
  }
  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileSelected.name = fileInput.target.files[0].name.split('.')[0];
      this.fileSelected.type = fileInput.target.files[0].type.split('/').pop();
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        this.fileSelected.link = e.target.result;
        image.onload = (rs) => {
          rs;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  hideChat() {
    this.closeChat = !this.closeChat;
  }

  expandChat() {
    this.chatExpanded = !this.chatExpanded;
  }

  formatNumberPhone(phoneNumber: string) {
    return phoneNumber
      .replace(/\D+/g, '')
      .replace(/(\d{2})(\d{2})(\d{5})(\d{2})/, '+$1 ($2) $3-$4');
  }
}
