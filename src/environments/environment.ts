import { get } from "http";

export const environment = {
    massage:"from environment file",
    // production: false,
    baseUrl: 'https://ecommerce.routemisr.com/api/v1/',
    // appVersion: '1.0.0',

    auth: {
        tokenKey: 'auth_token',
        // refreshTokenKey: 'refresh_token',
        tokenExpiry: 3600 // seconds
    },


    api: {
        auth: {
            login: () => 'auth/signin',
            register: () => 'auth/signup',
            forgetpassword: () => 'auth/forgotPasswords',
            logout: () => 'auth/logout',
            verifyResetCode: () => 'auth/verifyResetCode',
            changeMyPassword: () => 'users/changeMyPassword',
            resetPassword: () => 'auth/resetPassword',
            changePassword: () => 'users/changeMyPassword',
            UpdateUserData: () => 'users/updateMe/',
            users: () => 'users',
            verifyToken: () => 'auth/verifyToken'
        },
        categories: {
            getAllCategories: () => 'categories',
            getCategoryById: (id: string) => `categories/${id}`,
        },
        subCategories: {
            getAllSubCategories: () => 'subcategories',
            getSubCategoryById: (id: string) => `subcategories/${id}`,
            getSubCategoriesByCategoryId: (categoryId: string) => `categories/${categoryId}/subcategories`,
        },
        brand: {
            getAllBrands: () => 'brands',
            getBrandById: (id: string) => `brands/${id}`,
        },
        products: {
            getAllProducts: () => 'products',
            getProductById: (id: string) => `products/${id}`,
            // getProductsByCategoryId: (categoryId:string)=> `categories/${categoryId}/products`,
            // getProductsBySubCategoryId: (subCategoryId:string)=> `subcategories/${subCategoryId}/products`,
            // getProductsByBrandId: (brandId:string)=> `brands/${brandId}/products`,
            // getProductsByFilter: ()=> 'products/filter',
            // getProductsBySearch: ()=> 'products/search',
            // getTopSellingProducts: ()=> 'products/top-selling',
            // getNewArrivals: ()=> 'products/new-arrivals',
            // getDiscountedProducts: ()=> 'products/discounted',
            // getRelatedProducts: (productId:string)=> `products/${productId}/related`,
            // getProductReviews: (productId:string)=> `products/${productId}/reviews`,
            // addProductReview: (productId:string)=> `products/${productId}/reviews`,
            // getProductQuestions: (productId:string)=> `products/${productId}/questions`,
            // addProductQuestion: (productId:string)=> `products/${productId}/questions`,
            // getProductAnswers: (productId:string, questionId:string)=> `products/${productId}/questions/${questionId}/answers`,
            // addProductAnswer: (productId:string, questionId:string)=> `products/${productId}/questions/${questionId}/answers`,
            // getProductVariants: (productId:string)=> `products/${productId}/variants`,
            // getProductStock: (productId:string)=> `products/${productId}/stock`,
            // getProductImages: (productId:string)=> `products/${productId}/images`,
            // addProductImage: (productId:string)=> `products/${productId}/images`,
            // getProductVideos: (productId:string)=> `products/${productId}/videos`,
            // addProductVideo: (productId:string)=> `products/${productId}/videos`,
            // getProductSpecifications: (productId:string)=> `products/${productId}/specifications`,
            // addProductSpecification: (productId:string)=> `products/${productId}/specifications`,
            // getProductAttributes: (productId:string)=> `products/${productId}/attributes`,
            // addProductAttribute: (productId:string)=> `products/${productId}/attributes`,
            // getProductTags: (productId:string)=> `products/${productId}/tags`,
            // addProductTag: (productId:string)=> `products/${productId}/tags`,
        },
        wishlist: {
            addProductToWishlist: () => `wishlist`, // POST with productId in body
            removeProductFromWishlist: (productId: string) => `wishlist/${productId}`,
            getUserWishlist: () => 'wishlist',
        },
        cart: {
            addItemToCart: () => 'cart', // POST with productId and quantity in body
            removeItemFromCart: (itemId: string) => `cart/${itemId}`,
            updateItemQuantity: (itemId: string) => `cart/${itemId}`, // PUT with quantity in body
            getUserCart: () => 'cart', // GET
            clearCart: () => 'cart' // DELETE
        },
        orders: {
            
            getAllOrders: () => 'orders', // GET
            getUserOrderById: (orderId: string) => `orders/user/${orderId}`,
            //placeOrder: ()=> 'orders',
            //getOrderById: (orderId:string)=> `orders/${orderId}`,
            //cancelOrder: (orderId:string)=> `orders/${orderId}/cancel`,
            //returnOrder: (orderId:string)=> `orders/${orderId}/return`, 
            //getOrderStatus: (orderId:string)=> `orders/${orderId}/status`, 
            //getOrderInvoice: (orderId:string)=> `orders/${orderId}/invoice`,
            //downloadOrderInvoice: (orderId:string)=> `orders/${orderId}/invoice/download`, 
            //trackOrder: (orderId:string)=> `orders/${orderId}/track`, 
            //reorder: (orderId:string)=> `orders/${orderId}/reorder`, 
            //getPaymentMethods: ()=> 'orders/payment-methods', 
            //applyCoupon: ()=> 'orders/apply-coupon',
            //removeCoupon: ()=> 'orders/remove-coupon',
            //getShippingMethods: ()=> 'orders/shipping-methods', 
            //calculateShipping: ()=> 'orders/calculate-shipping' 
        },
        addresses: {
            addNewAddress: () => 'addresses', // POST with address details in body
            deleteAddress: (addressId: string) => `addresses/${addressId}`, // DELETE
            getUserAddresses: () => 'addresses', // GET
            getAddressById: (addressId: string) => `addresses/${addressId}`, // GET
            //updateAddress: (addressId: string) => `addresses/${addressId}` // PUT with updated details in body
        },
            



    },


    // ⚙️ Application Settings
    // app: {
    //     name: 'MyStore Dev',
    //     version: '1.0.0',
    //     defaultLanguage: 'en',
    //     supportedLanguages: ['ar', 'en'],
    //     itemsPerPage: 10,
    //     maxFileSize: 5 * 1024 * 1024 // 5MB
    // },

    // 🔧 Feature Flags
    // features: {
    //     enableDebug: true,
    //     enableAnalytics: false,
    //     enableServiceWorker: false,
    //     enablePWA: false
    // },

    // 📊 External Services
    // services: {
    //     googleAnalytics: '',
    //     sentry: '',
    //     stripe: 'pk_test_...'
    // },

    // 🕒 Timeouts
    timeouts: {
        api: 30000,
        upload: 60000,
        download: 60000
    },

    retries:{
        api: 3,
    }

}