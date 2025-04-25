import { Component, inject, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { MatDrawer, MatSidenav, MatSidenavContainer, MatSidenavContent, } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDivider, MatList, MatListItem, MatNavList } from '@angular/material/list';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [ MatIconModule, MatSidenavContainer, MatToolbar, MatNavList, MatListItem, MatIconButton, RouterOutlet, MatSidenav, MatSidenavContent, NgOptimizedImage, RouterLink, MatButton, MatMenuTrigger, MatMenu, MatMenuItem, MatDivider, TranslatePipe, MatList ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private readonly _translateService: TranslateService = inject(TranslateService);

  readonly drawer: Signal<MatDrawer> = viewChild.required<MatDrawer>('drawer');
  readonly selectedLanguage: WritableSignal<string> = signal('ქართ');
  readonly selectedLanguageFlag: WritableSignal<string> = signal("georgia_flag");
  readonly opened: WritableSignal<boolean> = signal(false);
  readonly activeDrawer: WritableSignal<'nav' | 'cart' | 'search' | null> = signal(null);
  readonly isHandset: Signal<boolean> = toSignal(this._breakpointObserver.observe([ Breakpoints.TabletPortrait, Breakpoints.Handset ])
    .pipe(map(result => result.matches), shareReplay()), { initialValue: false });

  openDrawer(type: 'nav' | 'cart' | 'search') {
    if (this.activeDrawer() === type && this.drawer().opened) {
      this.drawer().close().then(() => {
        this.opened.set(false);
        this.activeDrawer.set(null);
      });
    } else {
      this.activeDrawer.set(type);
      this.drawer().open().then(() => {
        this.opened.set(true);
      });
    }
  }

  chooseLanguage(lang: string, shortLang: string, flag: string) {
    this._translateService.use(lang);
    this.selectedLanguage.set(shortLang);
    this.selectedLanguageFlag.set(flag);
  }
}
