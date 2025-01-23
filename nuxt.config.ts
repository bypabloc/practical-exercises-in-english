import ViteYaml from "@modyfi/vite-plugin-yaml";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: false,
  devtools: { enabled: false },
  components: [{ path: "~/components", extensions: [".vue"] }],

  experimental: {
    asyncEntry: true,
  },
  app: {
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      title: "Practical Exercises In English",
      charset: "utf-8",
      meta: [
        {
          hid: "viewport",
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          hid: "description",
          name: "description",
          content: "Practical Exercises In English",
        },
        {
          hid: "author",
          name: "author",
          content: "Destacame",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "Practical Exercises In English",
        },
      ],
      link: [
        {
          hid: "icon",
          rel: "icon",
          href: "/favicon.ico",
        },
      ],
    },
  },
  modules: ["@unocss/nuxt", "@vueuse/nuxt", "@pinia/nuxt"],

  runtimeConfig: {
    public: {
      ENV: process.env.ENV || "prod",
    },
    private: {
      ENV: process.env.ENV || "prod",
    },
  },

  vite: {
    plugins: [
      ViteYaml(),
      process.env.ENV === "local" &&
        require("vite-plugin-inspect")({
          build: true,
          outputDir: ".vite-inspect",
        }),
    ],
    build: {
      target: "esnext",
      minify: false,
      cssCodeSplit: true,
    },
  },
});
