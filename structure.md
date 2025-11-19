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
├── │    │   ├── validators.
├── │    │   └── app-initializer.ts
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

📦layouts
 ┣ 📂admin-layout
 ┣ 📂customer-layout
 ┣ 📂main-layout
 ┃ ┣ 📜main-layout.css
 ┃ ┣ 📜main-layout.html
 ┃ ┣ 📜main-layout.spec.ts
 ┃ ┗ 📜main-layout.ts
 ┗ 📂staff-layout






📦 src/
├── 🎯 main.ts                          # Application Bootstrap
├── 🎨 styles.scss                      # Global Styles
├── 🌐 index.html                       # HTML Template
│
├── 🔧 app/                             # 🚀 Application Root
│   ├── app.config.ts                   # ⚙️  App Configuration (APP_INITIALIZER هنا)
│   ├── app.routes.ts                   # 🗺️  Main Routing Configuration
│   └── app.component.ts                # 🎯 Root Component
│
├── 🛡️ core/                           # 🏗️  Core Infrastructure
│   ├── interceptors/                   # 🔄 HTTP Interceptors
│   │   ├── index.ts                    # 📦 Interceptors Barrel Export
│   │   ├── api.interceptor.ts          # 🌐 API Base Configuration
│   │   ├── auth.interceptor.ts         # 🔐 Authentication
│   │   ├── error.interceptor.ts        # ❌ Error Handling (دمج http-error)
│   │   ├── cache.interceptor.ts        # 💾 Caching
│   │   ├── loading.interceptor.ts      # ⏳ Loading States
│   │   ├── logging.interceptor.ts      # 📝 Logging
│   │   └── timeout.interceptor.ts      # ⏰ Request Timeout
│   │
│   ├── guards/                         # 🛡️  Route Guards
│   │   ├── index.ts                    # 📦 Guards Barrel Export
│   │   ├── auth.guard.ts               # 🔐 Authentication Guard
│   │   ├── role.guard.ts               # 👥 Role-based Access
│   │   ├── permission.guard.ts         # 📋 Permission-based Access
│   │   └── can-deactivate.guard.ts     # 🚫 Prevent Navigation
│   │
│   ├── services/                       # 🔧 Global Singleton Services
│   │   ├── index.ts                    # 📦 Services Barrel Export
│   │   ├── auth.service.ts             # 🔐 Authentication State
│   │   ├── api.service.ts              # 🌐 HTTP Client Wrapper
│   │   ├── config.service.ts           # ⚙️  Runtime Configuration
 
│   │
│   └── config/                         # ⚙️  Core Configuration
│       └── app-initializer.config.ts   # 🎯 App Initialization Logic
│
├── 🔀 routing/                         # 🗺️  Advanced Routing
│   ├── resolvers/                      # 📍 Route Resolvers
│   │   ├── index.ts                    # 📦 Resolvers Barrel Export
│   │   ├── user.resolver.ts            # 👤 User Data Resolver
│   │   ├── product.resolver.ts         # 🏷️  Product Data Resolver
│   │   └── category.resolver.ts        # 📂 Category Data Resolver
│   │
│   └── strategies/                     # 🎯 Routing Strategies
│       └── custom-preload.strategy.ts  # ⚡ Custom Preloading
│
├── 🎭 features/                        # 🎯 Feature-Based Structure
│   ├── auth/                           # 🔐 Authentication Feature
│   │   ├── components/                 # 🎨 Auth Components
│   │   │   ├── login/                  # 🔑 Login Component
│   │   │   ├── register/               # 📝 Register Component
│   │   │   └── forgot-password/        # 🔓 Forgot Password
│   │   ├── services/                   # 🔧 Auth Feature Services
│   │   │   └── auth-facade.service.ts  # 🎯 Auth Facade Pattern
│   │   ├── routes/                     # 🗺️  Auth Routes
│   │   │   └── auth.routes.ts          # 📋 Auth Route Configuration
│   │   └── utils/                      # 🛠️  Auth Utilities
│   │       └── auth-validators.ts      # ✅ Auth-specific Validators
│   │
│   ├── admin/                          # ⚙️  Admin Feature (Lazy)
│   │   ├── pages/                      # 📄 Admin Pages
│   │   │   ├── dashboard/              # 📊 Admin Dashboard
│   │   │   ├── users-management/       # 👥 Users Management
│   │   │   ├── products-management/    # 🏷️  Products Management
│   │   │   └── orders-management/      # 📦 Orders Management
│   │   ├── components/                 # 🎨 Admin Components
│   │   │   ├── user-form/              # 👤 User Form
│   │   │   └── product-form/           # 🏷️  Product Form
│   │   ├── services/                   # 🔧 Admin Services
│   │   │   └── admin.service.ts        # 🎯 Admin Business Logic
│   │   └── routes/                     # 🗺️  Admin Routes
│   │       └── admin.routes.ts         # 📋 Admin Route Configuration
│   │
│   ├── products/                       # 🏷️  Products Feature (Lazy)
│   │   ├── pages/                      # 📄 Product Pages
│   │   │   ├── product-list/           # 📋 Products Listing
│   │   │   └── product-details/        # 🔍 Product Details
│   │   ├── components/                 # 🎨 Product Components
│   │   │   ├── product-grid/           # 🔲 Products Grid
│   │   │   ├── product-filters/        # ⚙️  Filtering System
│   │   │   └── product-gallery/        # 🖼️  Image Gallery
│   │   ├── services/                   # 🔧 Product Services
│   │   │   └── product.service.ts      # 🎯 Product Business Logic
│   │   ├── state/                      # 🧠 Product State Management
│   │   │   └── product.store.ts        # 📊 Product State (Signal Store)
│   │   └── routes/                     # 🗺️  Product Routes
│   │       └── products.routes.ts      # 📋 Product Route Configuration
│   │
│   └── dashboard/                      # 📊 Dashboard Feature (Lazy)
│       ├── admin-dashboard/            # ⚙️  Admin Dashboard
│       ├── staff-dashboard/            # 💼 Staff Dashboard
│       └── customer-dashboard/         # 👤 Customer Dashboard
│
├── 🧩 shared/                          # 🔄 Shared Resources
│   ├── components/                     # 🎨 Reusable Components
│   │   ├── ui/                         # ⚡ Base UI Components
│   │   │   ├── button/                 # 🎯 Button Component
│   │   │   ├── input/                  # 📝 Input Component
│   │   │   ├── select/                 # 🔽 Select Component
│   │   │   ├── modal/                  # 🪟 Modal Component
│   │   │   ├── table/                  # 📊 Table Component
│   │   │   ├── pagination/             # 🔢 Pagination Component
│   │   │   ├── loading-spinner/        # ⏳ Loading Component
│   │   │   └── toast/                  # 🔔 Toast Component
│   │   │
│   │   ├── layout/                     # 🏗️  Layout Components
│   │   │   ├── header/                 # 🔝 Header Component
│   │   │   ├── footer/                 # 🔚 Footer Component
│   │   │   ├── sidebar/                # 📐 Sidebar Component
│   │   │   └── breadcrumb/             # 🧭 Breadcrumb Component
│   │   │
│   │   └── business/                   # 💼 Business Components
│   │       ├── product-card/           # 🏷️  Product Card
│   │       ├── rating-stars/           # ⭐ Rating Component
│   │       └── search-box/             # 🔍 Search Component
│   │
│   ├── directives/                     # ⚡ Directives
│   │   ├── index.ts                    # 📦 Directives Barrel Export
│   │   ├── debounce-click.directive.ts # ⏳ Debounce Click
│   │   ├── tooltip.directive.ts        # 💡 Tooltip Directive
│   │   ├── lazy-image.directive.ts     # 🖼️  Lazy Load Images
│   │   ├── permission.directive.ts     # 📋 Permission-based UI
│   │   └── role.directive.ts           # 👥 Role-based UI
│   │
│   ├── pipes/                          # 🛠️  Pipes
│   │   ├── index.ts                    # 📦 Pipes Barrel Export
│   │   ├── price.pipe.ts               # 💰 Price Formatting
│   │   ├── truncate.pipe.ts            # ✂️  Text Truncation
│   │   ├── safe-html.pipe.ts           # 🔒 Safe HTML
│   │   ├── highlight.pipe.ts           # 🎯 Text Highlighting
│   │   └── format-phone.pipe.ts        # 📞 Phone Formatting
│   │
│   ├── models/                         # 📊 Data Models & Types
│   │   ├── index.ts                    # 📦 Models Barrel Export
│   │   ├── base/                       # 🏗️  Base Models
│   │   │   ├── base-model.ts           # 📐 Base Model Interface
│   │   │   └── base-response.ts        # 📨 Base API Response
│   │   ├── user/                       # 👤 User Models
│   │   │   ├── user.model.ts           # 👤 User Interface
│   │   │   ├── user-role.enum.ts       # 🎭 User Roles
│   │   │   └── user-permission.enum.ts # 📋 User Permissions
│   │   ├── product/                    # 🏷️  Product Models
│   │   │   └── product.model.ts        # 🏷️  Product Interface
│   │   ├── order/                      # 📦 Order Models
│   │   │   └── order.model.ts          # 📦 Order Interface
│   │   └── api/                        # 🌐 API Models
│   │       └── api-response.model.ts   # 📨 API Response Wrapper
│   │
│   ├── utils/                          # 🛠️  Utilities & Helpers
│   │   ├── index.ts                    # 📦 Utilities Barrel Export
│   │   ├── constants/                  # 📋 Application Constants
│   │   │   ├── app.constants.ts        # ⚙️  App Constants
│   │   │   ├── api.constants.ts        # 🌐 API Constants
│   │   │   └── ui.constants.ts         # 🎨 UI Constants
│   │   ├── helpers/                    # 🛠️  Helper Functions
│   │   │   ├── date.helpers.ts         # 📅 Date Utilities
│   │   │   ├── string.helpers.ts       # 📝 String Utilities
│   │   │   ├── number.helpers.ts       # 🔢 Number Utilities
│   │   │   └── array.helpers.ts        # 🧮 Array Utilities
│   │   ├── validators/                 # ✅ Validation Functions
│   │   │   ├── form.validators.ts      # 📋 Form Validators
│   │   │   ├── auth.validators.ts      # 🔐 Auth Validators
│   │   │   └── business.validators.ts  # 💼 Business Validators
│   │   └── rxjs/                       # 🔄 RxJS Utilities
│   │       └── operators.ts            # ⚡ Custom Operators
│   │
│   └── layouts/                        # 🎨 Layout System
│       ├── main-layout/                # 🏠 Main Layout
│       ├── admin-layout/               # ⚙️  Admin Layout
│       ├── staff-layout/               # 💼 Staff Layout
│       └── customer-layout/            # 👤 Customer Layout
│
├── 📄 pages/                           # 🎭 Standalone Pages
│   ├── not-found/                      # 404 Page
│   ├── error/                          # ❌ Error Page
│   ├── maintenance/                    # 🛠️  Maintenance Page
│   └── access-denied/                  # 🚫 Access Denied Page
│
├── 🎨 themes/                          # 🎨 Theming System
│   ├── _variables.scss                 # 🎯 CSS Variables
│   ├── _mixins.scss                    # 🔧 SCSS Mixins
│   ├── light-theme.scss                # ☀️  Light Theme
│   ├── dark-theme.scss                 # 🌙 Dark Theme
│   └── responsive.scss                 # 📱 Responsive Design
│
├── 📁 assets/                          # 📚 Static Assets
│   ├── images/                         # 🖼️  Images
│   │   ├── icons/                      # ⚡ Icons
│   │   ├── products/                   # 🏷️  Product Images
│   │   └── backgrounds/                # 🎨 Background Images
│   ├── fonts/                          # 🔤 Custom Fonts
│   ├── i18n/                           # 🌐 Internationalization
│   │   ├── ar.json                     # 📖 Arabic Translations
│   │   └── en.json                     # 📖 English Translations
│   └── data/                           # 📊 Mock Data
│       └── mock/                       # 🧪 Test Data
│           ├── users.mock.ts           # 👤 Mock Users
│           ├── products.mock.ts        # 🏷️  Mock Products
│           └── orders.mock.ts          # 📦 Mock Orders
│
├── ⚙️ environments/                    # ⚙️  Environment Configs
│   ├── environment.ts                  # 🏠 Development
│   ├── environment.production.ts       # 🚀 Production
│   ├── environment.staging.ts          # 🧪 Staging
│   └── runtime-config.json             # ⚙️  Runtime Configuration
│
└── 🧪 testing/                         # 🧪 Testing Utilities
    ├── mocks/                          # 🎭 Test Mocks
    │   ├── http.mocks.ts               # 🌐 HTTP Mocks
    │   ├── auth.mocks.ts               # 🔐 Auth Mocks
    │   └── data.mocks.ts               # 📊 Data Mocks
    ├── helpers/                        # 🛠️  Test Helpers
    │   ├── test-utils.ts               # ⚡ Testing Utilities
    │   └── router-testing.ts           # 🗺️  Router Testing
    └── builders/                       # 🏗️  Test Data Builders
        ├── user.builder.ts             # 👤 User Builder
        └── product.builder.ts          # 🏷️  Product Builder