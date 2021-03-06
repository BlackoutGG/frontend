import colors from "vuetify/es5/util/colors";

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    // Doc: https://auth.nuxtjs.org
    "@nuxtjs/auth"
    // "@nuxtjs/recaptcha"
  ],
  // recaptcha: {
  //   hideBoolean: true,
  //   siteKey: "6LeMXSYTAAAAAH4mKMnph1jHnepNhX9O4bGk_Jjs",
  //   version: 2,
  //   size: "normal"
  // },
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/schemes
   */
  auth: {
    redirect: {
      login: "/",
      logout: "/",
      home: "/"
    },
    strategies: {
      local: {
        login: {
          url: "/auth/login",
          method: "post",
          propertyName: "token"
        },
        logout: false,
        user: { url: "/auth/user", method: "get", propertyName: "user" }
      }
    },
    plugins: [{ src: "~/plugins/axios.js" }]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: "http://localhost:5000"
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
        // light: {
        //   primary: "#fafafa",
        //   secondary: colors.grey.lighten1,
        //   accent: colors.grey.lighten1
        // }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
