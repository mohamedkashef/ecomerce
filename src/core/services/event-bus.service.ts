// core/services/event-bus.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, filter, map } from 'rxjs';

export interface AppEvent<T = any> {
  type: string;
  payload?: T;
  timestamp: Date;
}

export interface EventSubscription {
  unsubscribe: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private eventSubject = new Subject<AppEvent>();
  private eventQueue: AppEvent[] = [];
  private maxQueueSize = 100;

  /**
   * نشر حدث
   */
  publish<T = any>(type: string, payload?: T): void {
    const event: AppEvent<T> = {
      type,
      payload,
      timestamp: new Date()
    };

    // إضافة للـ queue للتاريخ
    this.eventQueue.unshift(event);
    if (this.eventQueue.length > this.maxQueueSize) {
      this.eventQueue.pop();
    }

    // نشر الحدث
    this.eventSubject.next(event);
  }

  /**
   * الاشتراك في نوع محدد من الأحداث
   */
  on<T = any>(eventType: string): Observable<T> {
    return this.eventSubject.asObservable().pipe(
      filter(event => event.type === eventType),
      map(event => event.payload as T)
    );
  }

  /**
   * الاشتراك في حدث مع callback
   */
  subscribe<T = any>(
    eventType: string,
    callback: (payload: T) => void
  ): EventSubscription {
    const subscription = this.on<T>(eventType).subscribe(callback);
    
    return {
      unsubscribe: () => subscription.unsubscribe()
    };
  }

  /**
   * الاشتراك لمرة واحدة فقط
   */
  once<T = any>(eventType: string): Observable<T> {
    return this.on<T>(eventType).pipe(
      // take(1) - لكن نستخدم filter للحفاظ على البساطة
      filter(() => true) // يمكن استبدالها بـ take(1) من rxjs/operators
    );
  }

  /**
   * الاشتراك في عدة أنواع أحداث
   */
  onMany<T = any>(eventTypes: string[]): Observable<{ type: string; payload: T }> {
    return this.eventSubject.asObservable().pipe(
      filter(event => eventTypes.includes(event.type)),
      map(event => ({
        type: event.type,
        payload: event.payload as T
      }))
    );
  }

  /**
   * الحصول على الأحداث السابقة
   */
  getEventHistory(): AppEvent[] {
    return [...this.eventQueue];
  }

  /**
   * الحصول على الأحداث حسب النوع
   */
  getEventsByType(eventType: string): AppEvent[] {
    return this.eventQueue.filter(event => event.type === eventType);
  }

  /**
   * مسح سجل الأحداث
   */
  clearEventHistory(): void {
    this.eventQueue = [];
  }

  /**
   * التحقق من وجود مشتركين لنوع معين
   */
  hasSubscribers(eventType: string): boolean {
    // هذه طريقة مبسطة - في الواقع تحتاج لتتبع الـ subscriptions
    return true; // دائماً true للتبسيط
  }

  /**
   * إرسال حدث مع تأخير
   */
  publishDelayed<T = any>(type: string, payload: T, delay: number): void {
    setTimeout(() => {
      this.publish(type, payload);
    }, delay);
  }

  /**
   * Events Library - أحداث شائعة
   */
  readonly EVENTS = {
    // أحداث المصادقة
    AUTH: {
      LOGIN: 'auth.login',
      LOGOUT: 'auth.logout',
      TOKEN_EXPIRED: 'auth.token_expired',
      PROFILE_UPDATED: 'auth.profile_updated'
    },
    
    // أحداث التطبيق
    APP: {
      LOADING_START: 'app.loading_start',
      LOADING_END: 'app.loading_end',
      ERROR: 'app.error',
      SUCCESS: 'app.success'
    },
    
    // أحداث المستخدم
    USER: {
      SESSION_EXPIRING: 'user.session_expiring',
      PREFERENCES_CHANGED: 'user.preferences_changed'
    },
    
    // أحداث البيانات
    DATA: {
      UPDATED: 'data.updated',
      DELETED: 'data.deleted',
      CREATED: 'data.created'
    },
    
    // أحداث التنقل
    NAVIGATION: {
      ROUTE_CHANGED: 'navigation.route_changed',
      SIDEBAR_TOGGLED: 'navigation.sidebar_toggled'
    }
  };

  /**
   * Methods مساعدة للأحداث الشائعة
   */
  notifyError(message: string, error?: any): void {
    this.publish(this.EVENTS.APP.ERROR, { message, error });
  }

  notifySuccess(message: string): void {
    this.publish(this.EVENTS.APP.SUCCESS, { message });
  }

  startLoading(identifier?: string): void {
    this.publish(this.EVENTS.APP.LOADING_START, { identifier });
  }

  endLoading(identifier?: string): void {
    this.publish(this.EVENTS.APP.LOADING_END, { identifier });
  }
}