module.exports = {
    srcDir: 'client/',
    server: {
        port: 8080
    },
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [
        'material-design-icons-iconfont/dist/material-design-icons.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        {src: '~/plugins/Vuelidate'},
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        ['@nuxtjs/vuetify', { ssr: false }]
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [],
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    }
}
