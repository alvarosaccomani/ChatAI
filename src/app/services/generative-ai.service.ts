import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerativeAIService {

  private readonly URL = 'http://genai.itssaconsulting.com/API_GEN';

  constructor(
    private _http: HttpClient
  ) { }

  private body: any = {
    emp_token: "",
    emp_codigo: "CESPLL",
    usu_codigo: "admin",
    usu_password: "sar",
    asi_id: "aa5fad5bfb284cdda3eccca6e5bd68fc",
    doc_ids: "0940119ac38d4ce1b1b543b7c5052ff8",
    userPrompt: "",
    historicoInputs: ""
  };

  //private _http = Inject(HttpClient);

  public send(text: string) {
    this.body.userPrompt = text;
    return this._http.post(this.URL + '/AI/ChatCompletionAsistenteDocumentos', this.body)
  }
}
