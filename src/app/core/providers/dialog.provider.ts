import { Provider } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

export const provideDialogDefaultOptions = (): Provider => ({
  provide: MAT_DIALOG_DEFAULT_OPTIONS,
  useValue: {
    backdropClass: [ 'bg-alpha-700', 'dark:bg-alpha-50', 'backdrop-blur-md' ],
    background: 'bg-additional',
    hasBackdrop: true,
    canClose: true
  }
})
