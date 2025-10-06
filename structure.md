📦 src/
├── ├── 🎯 main.ts
├── ├── 🎨 styles.scss
├── ├── 🌐 index.html
├── │
├── ├── 🔧 app/
├── │    ├── app.config.ts                    # ⚙️  App Configuration
├── │    ├── app.routes.ts                    # 🗺️  Main Routing
├── │    └── app-shell.component.ts           # 🐚  App Shell (Progress, Toasts)
├── │    
├── │    
├── ├── 🛡️  core/                        # 🏗️  Core Module (Singleton)
├── │    ├── interceptors/                # 🔄 جميع الـ Interceptors هنا
├── │    │   ├── api.interceptor.ts
├── │    │   ├── auth.interceptor.ts
├── │    │   ├── cache.interceptor.ts
├── │    │   ├── loading.interceptor.ts
├── │    │   ├── logging.interceptor.ts
├── │    │   └── timeout.interceptor.ts
├── │    │
├── │    ├── guards/                      # 🛡️  جميع الـ Guards
├── │    │   ├── auth.guard.ts
├── │    │   ├── role.guard.ts
├── │    │   ├── permission.guard.ts
├── │    │   └── can-deactivate.guard.ts
├── │    │
├── │    ├── services/                    # 🔧 الـ Services الأساسية
├── │    │   ├── auth.service.ts
├── │    │   ├── api.service.ts
├── │    │   ├── config.service.ts
├── │    │   ├── seo.service.ts
├── │    │   ├── layout.service.ts
├── │    │   ├── toast.service.ts
├── │    │   ├── storage.service.ts
├── │    │   └── event-bus.service.ts
├── │    │
├── │    ├── models/                      # 📊 الـ Models الأساسية
├── │    │   ├── user.model.ts
├── │    │   ├── api-response.model.ts
├── │    │   ├── role.enum.ts
├── │    │   └── permission.enum.ts
├── │    │
├── │    ├── utils/                       # 🛠️  الـ Utilities
├── │    │   ├── constants.ts
├── │    │   ├── helpers.ts
├── │    │   └── validators.ts
├── │    │
├── │    └── core.module.ts               # 📦 Core Module
├── │    
├── ├── 🔀 routing/                      # 🗺️  إدارة المسارات
├── │   ├── resolvers/
├── │   │   ├── user.resolver.ts
├── │   │   ├── product.resolver.ts
├── │   │   └── category.resolver.ts
├── │   │
├── │   └── strategies/
├── │       └── custom-preload.strategy.ts
├── │
├── ├──── http/                            # 🌐 إدارة الـ HTTP (مستقل)
├── │    ├── http-error.handler.ts
├── │    └── http-options.factory.ts
├── │
├── ├── 🎭 auth/                              # 🔐 Authentication Module
├── │    ├── components/
├── │    │   ├── login/
├── │    │   │   ├── login.component.ts
├── │    │   │   ├── login.component.html
├── │    │   │   └── login.component.scss
├── │    │   ├── register/
├── │    │   │   ├── register.component.ts
├── │    │   │   ├── register.component.html
├── │    │   │   └── register.component.scss
├── │    │   └── forgot-password/
├── │    │       ├── forgot-password.component.ts
├── │    │       ├── forgot-password.component.html
├── │    │       └── forgot-password.component.scss
├── │    │
├── │    ├── services/
├── │    │   └── auth-facade.service.ts
├── │    │
├── │    └── auth.routes.ts
├── │
├── ├── 👥 admin/                             # 🛠️  Admin Module (Lazy)
├── │    ├── pages/
├── │    │   ├── dashboard/
├── │    │   │   ├── admin-dashboard.component.ts
├── │    │   │   ├── admin-dashboard.component.html
├── │    │   │   └── admin-dashboard.component.scss
├── │    │   ├── users-management/
├── │    │   ├── products-management/
├── │    │   └── orders-management/
├── │    │
├── │    ├── components/
├── │    │   ├── user-form/
├── │    │   └── product-form/
├── │    │
├── │    ├── services/
├── │    │   └── admin.service.ts
├── │    │
├── │    └── admin.routes.ts
├── │
├── ├── 👔 staff/                             # 💼 Staff Module (Lazy)
├── │    ├── pages/
├── │    │   ├── dashboard/
├── │    │   │   ├── staff-dashboard.component.ts
├── │    │   │   ├── staff-dashboard.component.html
├── │    │   │   └── staff-dashboard.component.scss
├── │    │   ├── order-management/
├── │    │   └── customer-management/
├── │    │
├── │    └── staff.routes.ts
├── │
├── ├── 🛍️  customer/                         # 👤 Customer Module (Lazy)
├── │    ├── pages/
├── │    │   ├── profile/
├── │    │   │   ├── profile.component.ts
├── │    │   │   ├── profile.component.html
├── │    │   │   └── profile.component.scss
├── │    │   ├── orders/
├── │    │   └── addresses/
├── │    │
├── │    └── customer.routes.ts
├── │
├── ├── 🏪 features/                          # 🎯 Feature Modules (Lazy)
├── │    ├── products/
├── │    │   ├── pages/
├── │    │   │   ├── product-list/
├── │    │   │   │   ├── product-list.component.ts
├── │    │   │   │   ├── product-list.component.html
├── │    │   │   │   └── product-list.component.scss
├── │    │   │   └── product-details/
├── │    │   │       ├── product-details.component.ts
├── │    │   │       ├── product-details.component.html
├── │    │   │       └── product-details.component.scss
├── │    │   │
├── │    │   ├── components/
├── │    │   │   ├── product-grid/
├── │    │   │   ├── product-filters/
├── │    │   │   └── product-gallery/
├── │    │   │
├── │    │   ├── services/
├── │    │   │   └── product.service.ts
├── │    │   │
├── │    │   ├── state/
├── │    │   │   └── product.store.ts
├── │    │   │
├── │    │   └── products.routes.ts
├── │    │
├── │    ├── cart/
├── │    │   ├── pages/
├── │    │   │   └── cart-page/
├── │    │   │       ├── cart-page.component.ts
├── │    │   │       ├── cart-page.component.html
├── │    │   │       └── cart-page.component.scss
├── │    │   │
├── │    │   ├── components/
├── │    │   │   ├── cart-item/
├── │    │   │   └── cart-summary/
├── │    │   │
├── │    │   ├── services/
├── │    │   │   └── cart.service.ts
├── │    │   │
├── │    │   ├── state/
├── │    │   │   └── cart.store.ts
├── │    │   │
├── │    │   └── cart.routes.ts
├── │    │
├── │    ├── orders/
├── │    │   ├── pages/
├── │    │   │   ├── order-list/
├── │    │   │   └── order-details/
├── │    │   │
├── │    │   ├── services/
├── │    │   │   └── order.service.ts
├── │    │   │
├── │    │   └── orders.routes.ts
├── │    │
├── │    └── dashboard/                       # 📊 Role-based Dashboards
├── │        ├── admin-dashboard/
├── │        ├── staff-dashboard/
├── │        └── customer-dashboard/
├── │
├── ├── 🧩 shared/                            # 🔄 Shared Module
├── │    ├── components/
├── │    │   ├── ui/                          # 🎨 UI Components
├── │    │   │   ├── button/
├── │    │   │   │   ├── button.component.ts
├── │    │   │   │   ├── button.component.html
├── │    │   │   │   └── button.component.scss
├── │    │   │   ├── input/
├── │    │   │   ├── select/
├── │    │   │   ├── modal/
├── │    │   │   ├── table/
├── │    │   │   ├── pagination/
├── │    │   │   ├── loading-spinner/
├── │    │   │   └── toast/
├── │    │   │
├── │    │   ├── layout/                      # 🏗️  Layout Components
├── │    │   │   ├── header/
├── │    │   │   │   ├── header.component.ts
├── │    │   │   │   ├── header.component.html
├── │    │   │   │   └── header.component.scss
├── │    │   │   ├── footer/
├── │    │   │   ├── sidebar/
├── │    │   │   └── breadcrumb/
├── │    │   │
├── │    │   └── business/                    # 💼 Business Components
├── │    │       ├── product-card/
├── │    │       ├── rating-stars/
├── │    │       └── search-box/
├── │    │
├── │    ├── directives/                      # ⚡ Directives
├── │    │   ├── debounce-click.directive.ts
├── │    │   ├── tooltip.directive.ts
├── │    │   ├── lazy-image.directive.ts
├── │    │   ├── permission.directive.ts
├── │    │   └── role.directive.ts
├── │    │
├── │    ├── pipes/                           # 🛠️  Pipes
├── │    │   ├── price.pipe.ts
├── │    │   ├── truncate.pipe.ts
├── │    │   ├── safe-html.pipe.ts
├── │    │   ├── highlight.pipe.ts
├── │    │   └── format-phone.pipe.ts
├── │    │
├── │    ├── models/                          # 📊 Shared Models
├── │    │   ├── base/
├── │    │   │   ├── base-model.ts
├── │    │   │   └── base-response.ts
├── │    │   ├── user/
├── │    │   ├── product/
├── │    │   └── order/
├── │    │
├── │    ├── utils/                           # 🛠️  Shared Utilities
├── │    │   ├── form-validators.ts
├── │    │   ├── rxjs-operators.ts
├── │    │   ├── date-utils.ts
├── │    │   └── number-utils.ts
├── │    │
├── │    └── shared.module.ts                 # 📦 Shared Module
├── │
├── ├── 📄 pages/                            # 🎭 Standalone Pages
├── │    ├── not-found/
├── │    │   ├── not-found.component.ts
├── │    │   ├── not-found.component.html
├── │    │   └── not-found.component.scss
├── │    ├── error/
├── │    │   ├── error.component.ts
├── │    │   ├── error.component.html
├── │    │   └── error.component.scss
├── │    ├── maintenance/
├── │    │   ├── maintenance.component.ts
├── │    │   ├── maintenance.component.html
├── │    │   └── maintenance.component.scss
├── │    └── access-denied/
├── │        ├── access-denied.component.ts
├── │        ├── access-denied.component.html
├── │        └── access-denied.component.scss
├── │
├── ├── 🎨 themes/                           # 🎨 Theming System
├── │    ├── _variables.scss
├── │    ├── _mixins.scss
├── │    ├── light-theme.scss
├── │    ├── dark-theme.scss
├── │    └── responsive.scss
├── │
├── ├── 📁 assets/                           # 📚 Assets
├── │    ├── images/
├── │    │   ├── icons/
├── │    │   ├── products/
├── │    │   └── backgrounds/
├── │    ├── fonts/
├── │    ├── i18n/
├── │    │   ├── ar.json
├── │    │   └── en.json
├── │    └── data/
├── │        └── mock/
├── │            ├── users.mock.ts
├── │            ├── products.mock.ts
├── │            └── orders.mock.ts
├── │
├── ├── ⚙️  environments/                    # ⚙️  Environments
├── │    ├── environment.ts
├── │    ├── environment.development.ts
├── │    ├── environment.staging.ts
├── │    ├── environment.production.ts
├── │    └── runtime-config.json
├── │
└── └── 🧪 testing/                          # 🧪 Testing/
    ├── ├── mocks/
    ├── │   ├── user.mock.ts
    ├── │   ├── product.mock.ts
    ├── │   └── api.mock.ts
    ├── ├── helpers/
    ├── │   ├── test-utils.ts
    ├── │   └── router-testing.ts
    └── └── builders/
        ├── ├── user.builder.ts
        └── └── product.builder.ts






