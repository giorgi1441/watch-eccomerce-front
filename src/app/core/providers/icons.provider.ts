import { Provider } from '@angular/core';
import { MAT_ICON_DEFAULT_OPTIONS, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const provideIcons = (): Provider => ({
  provide: MAT_ICON_DEFAULT_OPTIONS,
  multi: true,
  useFactory: (domSanitizer: DomSanitizer, iconRegistry: MatIconRegistry) => {
    const icons: Array<string> = [
      "georgia_flag.svg",
      "usa_flag.svg",
      "russia_flag.svg"
    ]
    icons.forEach((icon: string) => {
      const name: string = icon.slice(0, -4);
      iconRegistry.addSvgIcon(name, domSanitizer.bypassSecurityTrustResourceUrl(`/assets/images/icons/${ icon }`))
    })
  },
  deps: [ DomSanitizer, MatIconRegistry ]
})
