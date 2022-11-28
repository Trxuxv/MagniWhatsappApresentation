import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  constructor(private http: HttpClient) {}

  public apiUrl = "https://localhost:7214/integration/default/get-messages-chat/"

  public GetMessages(chatId: string) {
    return this._getMessagesByChatId(chatId);
  }

  public PostMessage(chatId: string) {
    return this._getMessagesByChatId(chatId);
  }

  // private methods
  private _getMessagesByChatId(chatId: String)
  {
    return this.http
    .get<Message[]>( `${this.apiUrl}${chatId}` )
    .pipe
    (
      take(1)
    );
}
}
