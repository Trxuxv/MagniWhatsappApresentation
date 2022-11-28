import { WhatsappService } from './service/whatsapp.service';
import { Component, OnInit } from '@angular/core';
import { Message } from './models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private service: WhatsappService) {}

  public messages: Message[] = [];
  public closeChat: boolean = true;
  public numberContact: string = '';
  public chatExpanded: boolean = false;
  public message: Message = {} as Message;
  public closeCompanySettings: boolean = true;

  title = 'whatsapp';
  chatId = 'hIbEPShL5G1eh50MR3r2XZbeNez2INQTnwdVJERu  ';

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
    console.log(this.messages);
    const model: Message = {
      chatId: this.chatId,
      contact: true,
      contactNumber: '5541997489578',
      content: this.message.content,
      date: new Date(),
      file: '',
      messageId: Math.random().toString(),
      originNumber: '',
    };

    this.messages.push(model);
  }

  hideChat() {
    this.closeChat = !this.closeChat;
  }

  expandChat(){
    this.chatExpanded = !this.chatExpanded;
  }

  formatNumberPhone(phoneNumber: string) {
    return phoneNumber
      .replace(/\D+/g, '')
      .replace(/(\d{2})(\d{2})(\d{5})(\d{2})/, '+$1 ($2) $3-$4');
  }
}
