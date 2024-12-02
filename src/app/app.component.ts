import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenerativeAIService } from './services/generative-ai.service';
import { interval, last, takeWhile } from 'rxjs';

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
  @ViewChild('contentChat', { static: true }) contentChat!: ElementRef<HTMLElement>;

  private readonly _generativeAIService = inject(GenerativeAIService);
  
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
      this.getResponse(text);
    }
  }

  private scrollToBottom() {
    try {
      this.contentChat.nativeElement.scrollTop = this.contentChat.nativeElement.scrollHeight;
    } catch (error) {
     alert(error); 
    }
  }

  private typeText(text: string) {
    const responseHtml = text;
    const responseLenght = text.length;
    let currentIndex = 0;

    interval(10)
      .pipe(takeWhile(() => currentIndex < responseLenght))
      .subscribe(() => {
        const currentHtml = responseHtml[currentIndex];

        if(currentIndex === 0) {
          this.setChat('AI', currentHtml);
        } else {
          const lastChat = this.chats[this.chats.length - 1];
          lastChat.message += currentHtml;
        }
        currentIndex++;
        this.scrollToBottom();
      })
  }

  private getResponse(text: string) {
    this._generativeAIService.send(text)
      .subscribe((res: any) => {
        console.info(res);
        this.typeText(res["texto"]);
      });
  }

}
