import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

// bootstrapApplication(AppComponent, {
//   providers: [
//     { provide: NZ_I18N, useValue: zh_CN },
//     importProvidersFrom(RouterModule.forRoot(routes)),
//     importProvidersFrom(BrowserAnimationsModule),
//   ],
// }).catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [provideAnimationsAsync()],
// });
