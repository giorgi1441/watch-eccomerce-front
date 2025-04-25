import { Component, inject, input, InputSignal, model, ModelSignal, signal, WritableSignal } from '@angular/core';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbar } from "@angular/material/toolbar";
import { NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { LoginComponent } from '../../features/auth/login/login.component';
import { RegisterComponent } from '../../features/auth/register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  imports: [ MatButton, MatDivider, MatIcon, MatIconButton, MatMenu, MatMenuItem, MatToolbar, NgOptimizedImage, RouterLink, TranslatePipe, MatMenuTrigger ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly _translateService: TranslateService = inject(TranslateService);
  private readonly _dialog: MatDialog = inject(MatDialog);

  readonly activeDrawer: ModelSignal<'nav' | 'cart' | 'search' | null> = model.required();
  readonly isDrawerOpened: ModelSignal<boolean> = model(false);
  readonly drawer: InputSignal<MatDrawer> = input.required<MatDrawer>();
  readonly isHandset: InputSignal<boolean> = input.required();
  readonly selectedLanguage: WritableSignal<string> = signal('ქართ');
  readonly selectedLanguageFlag: WritableSignal<string> = signal("georgia_flag");

  openDrawer(type: 'nav' | 'cart' | 'search') {
    if (this.activeDrawer() === type && this.drawer().opened) {
      this.drawer().close().then(() => {
        this.isDrawerOpened.set(false);
        this.activeDrawer.set(null);
      });
    } else {
      this.activeDrawer.set(type);
      this.drawer().open().then(() => {
        this.isDrawerOpened.set(true);
      });
    }
  }

  chooseLanguage(lang: string, shortLang: string, flag: string) {
    this._translateService.use(lang);
    this.selectedLanguage.set(shortLang);
    this.selectedLanguageFlag.set(flag);
  }

  login() {
    this._dialog.open(LoginComponent, {
      width: "100%",
      maxWidth: "460px"
    })
  }

  register() {
    this._dialog.open(RegisterComponent, {})
  }
}
