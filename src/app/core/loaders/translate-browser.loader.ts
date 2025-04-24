import { TranslateLoader } from '@ngx-translate/core';
import { makeStateKey, StateKey, TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class TranslateBrowserLoader implements TranslateLoader {
  constructor(private http: HttpClient, private transferState: TransferState) {}

  public getTranslation(lang: string): Observable<any> {
    const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
    const data = this.transferState.get(key, null);

    if (data) {
      return new Observable((observer) => {
        observer.next(data);
        observer.complete();
      });
    } else {
      return new TranslateHttpLoader(this.http).getTranslation(lang);
    }
  }
}
