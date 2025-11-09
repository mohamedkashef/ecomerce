import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Location {
  private location: string = '';
  private pinCode: string = '';
  constructor(@Inject(PLATFORM_ID) private platfomid: any) { }

  getCurrentLocation(): Observable<{ latitude: number, longitude: number }> {
    return new Observable(observer => {
      if (isPlatformBrowser(this.platfomid)) {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              observer.next({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
              observer.complete();
            },
            (error) => {
              observer.error(this.getLocationErrorMessage(error));
            }
          );
        } else {
          observer.error('Geolocation is not supported by this browser.');
        }
      }
    });
  }




  private getLocationErrorMessage(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'User denied the request for Geolocation.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information is unavailable.';
      case error.TIMEOUT:
        return 'The request to get user location timed out.';
      default:
        return 'An unknown error occurred.';
    }
  }



  getAddressFromCoordinates(lat: number, lng: number): Observable<string> {
    return new Observable(observer => {
      // يمكن استخدام خدمة مثل Google Maps Geocoding API
      // أو OpenStreetMap Nominatim API (مجاني)
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const address = data.display_name || 'Unknown location';
          observer.next(address);
          observer.complete();
        })
        .catch(error => {
          observer.error('Failed to get address from coordinates');
        });
    });
  }
}
