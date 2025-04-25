import { Component, input, InputSignal } from '@angular/core';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from "@angular/material/list";
import { MatToolbar } from "@angular/material/toolbar";
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-cart',
  imports: [ MatButton, MatDivider, MatIcon, MatIconButton, MatList, MatListItem, MatToolbar ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  readonly drawer: InputSignal<MatDrawer> = input.required()
}
