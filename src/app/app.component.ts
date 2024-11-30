import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type TypeChat = 'AI' | 'USER';

type Chat = {
  type: TypeChat,
  message: string
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  public title = 'chatAI';
  public chats: Chat[] = [];
  @ViewChild('txtInput', { static: true }) txtInput!: ElementRef<HTMLInputElement>;
  
  private setChat(type: TypeChat, message: string) {
    this.chats.push({
      type: type,
      message: message
    })
  }

  public sendMessage(text: string) {
    if(text.length > 3) {
      this.setChat('USER', text);
      this.txtInput.nativeElement.value = '';
    }
  }

}
