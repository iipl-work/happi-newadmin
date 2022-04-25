export const salesAdminMenuItems = [
    {
        id: 3,
        label: "dashboard",
        icon: "ri-admin-fill",
        link: '/',
        access : null,
        iframe:"https://charts.mongodb.com/charts-project-0-quszd/public/dashboards/60b1e630-20f9-4be5-8da7-90977ddaa299"
    },
    {
        id: 2,
        label: "CMS",
        icon: "ri-hand-heart-line",
        isMenuCollapsed: false,
        access : "CMS",
        subItems: [
            {
                id: 3,
                label: "Categories",
                icon: "ri-database-2-fill",
                link: '/categories-categories',
                iframe:"https://iipl.retool.com/embedded/public/19b6b78a-655f-4157-b729-110b98d20b1f"
            },
            {
                id:11,
                label: 'Products', 
                link: '/cms-products',
                iframe:"https://iipl.retool.com/embedded/public/55919278-98c4-488d-b4a6-07f7656b5166"
            },
            {
                id:11,
                label: 'Media', 
                link: '/cms-media',
                iframe:"https://iipl.retool.com/embedded/public/dda138a0-c3b2-436c-9067-cf844c6180fa"
            },
            {
                id:11,
                label: 'Banners', 
                link: '/cms-banners',
                iframe:"https://iipl.retool.com/embedded/public/b6e11bbc-561a-4df1-9c68-4080b3b77f05"
            },
            {
                id:11,
                label: 'Related Product', 
                link: '/cms-RelatedProduct',
                iframe:"https://iipl.retool.com/embedded/public/a4304063-64fc-4fe3-a70b-5980bb8b5ad1"
            },
            {
                id: 5,
                label: 'ProductStock& Price Update',
                link: '/cms-productstock&priceupdate',
                iframe:"https://iipl.retool.com/embedded/public/86067111-3c0f-4d8f-adc6-b0f5d7bbf31f"
            },
            {
                id:11,
                label: 'Home Page', 
                link: '/cms-homepage',
                iframe:"https://iipl.retool.com/embedded/public/85cbd665-8429-4380-a83a-58e10870aaed"
            },
            {
                id:11,
                label: 'Happi Pages', 
                link: '/cms-happipages',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },
            {
                id:11,
                label: 'Blogs', 
                link: '/cms-blogs',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },
            {
                id:11,
                label: 'Reviews', 
                link: '/cms-reviews',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },
            {
                id:11,
                label: 'Stores', 
                link: '/cms-stores',
                iframe:"https://iipl.retool.com/embedded/public/87085300-1558-4181-adad-877f1ac3ad84"
            },
            {
                id:11,
                label: 'Campaign Builders', 
                link: '/cms-campaignbuilders',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },
        ]
    },    
    {
        id: 2,
        label: "Orders & Stock",
        icon: "ri-list-ordered",
        isMenuCollapsed: false,
        access : "Orders & Stock",
        subItems: [
            {
                id: 5,
                label: 'Orders',
                link: '/orders-orders',
                iframe:"https://iipl.retool.com/embedded/public/b98efbcc-0003-4a92-9247-15c2a03b357c"
            },
            {
                id:11,
                label: 'Stores Stock Page',
                link: '/orders-storesstockpage',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },
            {
                id:11,
                label: 'Stock & Price Updateing',
                link: '/orders-stockpriceupdateing',
                iframe:"https://iipl.retool.com/embedded/public/86067111-3c0f-4d8f-adc6-b0f5d7bbf31f"
            },
            {
                id:11,
                label: 'Cart User Details',
                link: '/orders-cartuserdetails',
                iframe:"https://iipl.retool.com/embedded/public/a29ead64-c620-456b-93e5-84c655496129"
            },
            {
                id:11,
                label: 'Abandoned Cart',
                link: '/orders-abandonedcart',
                iframe:"https://iipl.retool.com/embedded/public/676a07f7-0afd-4724-83dc-17cde22d9d45"
            },
        ]
    },
    {
        id: 2,
        label: "User Management",
        icon: "ri-account-box-line",
        isMenuCollapsed: false,
        access : "User Management",
        subItems: [
            {
                id: 5,
                label: 'Users',
                link: '/users-users',
                iframe:"https://iipl.retool.com/embedded/public/cec17873-c7c2-4f60-a359-a0f5a51c769d"
            },
            {
                id:11,
                label: 'Merchant Details',
                link: '/orders-merchantdetails',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },
        ]
    },
    {
        id: 2,
        label: "Offers & Vouchers",
        icon: "ri-folder-user-fill",
        isMenuCollapsed: false,
        access : "Offers & Vouchers",
        subItems: [
            {
                id: 5,
                label: 'Offers',
                link: '/offers-offers',
                iframe:"https://iipl.retool.com/embedded/public/20d12cc2-0be6-435c-ab65-b182b376d01c"
            },
            // {
            //     id:11,
            //     label: 'OneTime CouponCode(Category)',
            //     link: '/offers-ocodec',
            //     iframe:"https://iipl.retool.com/embedded/public/a11d4915-a8bf-4e11-8363-390257eb7df4"
            // },
            {
                id:11,
                label: 'OneTime CouponCode',
                link: '/offers-ocodep',
                iframe:"https://iipl.retool.com/embedded/public/a11d4915-a8bf-4e11-8363-390257eb7df4"
            },
            {
                id:11,
                label: 'Vouchers',
                link: '/offers-vouchers',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },
        ]
    },
    {
        id: 2,
        label: "Leads",
        icon: "ri-folder-line",
        isMenuCollapsed: false,
        access : "Leads",
        subItems: [
            {
                id: 5,
                label: 'Campaign Leads',
                link: '/leads-campaignleads',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },
            {
                id:11,
                label: 'Report & Export Filter ',
                link: '/leads-reportexportfilter',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },
            {
                id: 5,
                label: 'Laptop & Mobiles Leads',
                link: '/offers-laptopmobileleads',
                iframe:"https://iipl.retool.com/embedded/public/bdafbdb5-13f0-4324-bd47-1670d21d68e7"
            },
            {
                id: 9,
                label: 'Employee Leads',
                link: '/leads-employeeleads',
                iframe:"https://iipl.retool.com/embedded/public/92e2f6ee-65ca-40bd-a962-5f38f488b005"
            },
            
        ]
    },
    {
        id: 2,
        label: "Following",
        icon: "ri-dashboard-line",
        isMenuCollapsed: false,
        access : "Following",
        subItems: [
            {
                id: 5,
                label: 'Social Media Followers',
                link: '/offers-socialmediafollowers',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },           
        ]
    },
    {
        id: 2,
        label: "Global Settings",
        icon: "ri-settings-2-fill",
        isMenuCollapsed: false,
        access : "Global Settings",
        subItems: [
            {
                id: 5,
                label: 'settings',
                link: '/gsettings-settings',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },    
            {
                id: 5,
                label: 'To Our Delivery Integrations',
                link: '/gsettings-toourdeliveryintegations',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },    
            {
                id: 5,
                label: 'Notification Template',
                link: '/gsettings-notitemplate',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },    
            {
                id: 5,
                label: 'CouponCode Template',
                link: '/gsettings-couponcodetemplate',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },           
        ]
    },
    {
        id: 2,
        label: "Reports",
        icon: "ri-home-2-line",
        isMenuCollapsed: false,
        access : "Reports",
        subItems: [
            {
                id: 5,
                label: 'Bajaj Stock',
                link: '/reports-bajajstock',
                iframe:"https://iipl.retool.com/embedded/public/d4ba7f11-798b-4cc7-bd33-527ba01e684e"
            },  
            {
                id: 5,
                label: 'Bajaj Stock Master',
                link: '/reports-bajajstockmaster',
                iframe:"https://iipl.retool.com/embedded/public/4966610a-777c-44b7-b2bc-6d1227e0c757"
            },  
            {
                id: 5,
                label: 'Bajaj Stock Report',
                link: '/reports-bajajstockreport',
                iframe:"https://iipl.retool.com/embedded/public/a2e201d3-50c2-411a-bc82-b8b26de525ad"
            },     
            {
                id: 5,
                label: 'Akshaya Patra',
                link: '/reports-akshyapatra',
                iframe:"https://iipl.retool.com/embedded/public/efc23a6f-8e6c-4546-b355-0ed712ebe547"
            },     
            {
                id: 5,
                label: 'Flipkart Stock Sync',
                link: '/reports-flipkartstocksync',
                iframe:"https://iipl.retool.com/embedded/public/67599e80-d8c4-455b-81b0-464f9b656b7e"
            },     
            {
                id: 5,
                label: 'Store Stock Report',
                link: '/reports-storestockreport',
                iframe:"https://iipl.retool.com/embedded/public/0248fd9c-2864-480c-965d-6761e90a638e"
            },    
            {
                id: 5,
                label: 'Ecom Stock report',
                link: '/reports-ecomstockreport',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },       
            {
                id: 5,
                label: 'Leads MIS Reports',
                link: '/reports-leadsmisreport',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },  
            {
                id: 5,
                label: 'Orders Report',
                link: '/reports-ordersreport',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },  
            {
                id: 5,
                label: 'Coupon & Voucher Code Report',
                link: '/reports-couponvouchercodereport',
                iframe:"https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f"
            },            
        ]
    },
    
] 