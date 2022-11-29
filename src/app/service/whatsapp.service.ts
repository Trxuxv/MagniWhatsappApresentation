import { SendMessage } from './../models/send-message.model';
import { Message } from '../models/message.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  constructor(private http: HttpClient) {}

  public apiUrl =
    'https://localhost:7214/integration/default/';

  public GetMessages(chatId: string) {
    return this._getMessagesByChatId(chatId);
  }

  public PostMessage(model: SendMessage, companyId: number) {
    return this._postMessage(model, companyId);
  }

  // private methods
  private _getMessagesByChatId(chatId: string) {
    return this.http.get<Message[]>(`${this.apiUrl}get-messages-chat/${chatId}`).pipe(take(1));
  }

  private _postMessage(model: SendMessage, companyId: number) {
    return this.http.post<boolean>(`${this.apiUrl}send-message/${companyId}`, model).pipe(take(1));
  }
}
