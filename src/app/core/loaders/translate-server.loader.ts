import { TranslateLoader } from '@ngx-translate/core';
import { makeStateKey, StateKey, TransferState } from '@angular/core';
import { Observable } from 'rxjs';

export class TranslateServerLoader implements TranslateLoader {
  constructor(private transferState: TransferState,
              private prefix: string = 'i18n',
              private suffix: string = '.json') {
  }

  public getTranslation(lang: string): Observable<any> {
    return new Observable((observer) => {
      const fs = require('fs');
      const path = require('path');

      const assets_folder: string = path.join(
        process.cwd(),
        'dist',
        'watches-ecommerce',
        'browser',
        'assets',
        this.prefix
      );

      const filePath = path.join(assets_folder, `${lang}${this.suffix}`);
      const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
      this.transferState.set(key, jsonData);

      observer.next(jsonData);
      observer.complete();
    });
  }
}
