export default {
    buildModules: ["@nuxt/typescript-build"],
    modules: ["@nuxtjs/axios"],
    server: {
        port: 3001,
    },
    axios: {
        proxy: true,
    },
    proxy: {
        "/api/": { target: "http://localhost:3000", pathRewrite: { "^/api/": "" } },
    },
};
