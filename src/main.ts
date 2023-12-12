import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

async function loadServer() {
  const { worker } = await import('./mocks/browser');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

loadServer().then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err))
});
