import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent, } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatToolbar } from '@angular/material/toolbar';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { CartComponent } from './features/cart/cart.component';

@Component({
  selector: 'app-root',
  imports: [ MatIconModule, MatSidenavContainer, MatToolbar, MatNavList, MatListItem, RouterOutlet, MatSidenav, MatSidenavContent, FooterComponent, HeaderComponent, CartComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  readonly opened: WritableSignal<boolean> = signal(false);
  readonly activeDrawer: WritableSignal<'nav' | 'cart' | 'search' | null> = signal(null);
  readonly isHandset: Signal<boolean> = toSignal(this._breakpointObserver.observe([ Breakpoints.TabletPortrait, Breakpoints.Handset ])
    .pipe(map(result => result.matches), shareReplay()), { initialValue: false });

}
