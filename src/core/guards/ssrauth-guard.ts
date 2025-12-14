import { isPlatformBrowser } from '@angular/common';
import { isPlatformServer } from '@angular/common';
import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

export const ssrauthGuard: CanMatchFn = (route, segments) => {
  const platformId = inject(PLATFORM_ID);

if(isPlatformServer(platformId)){return false}
return true;
};
