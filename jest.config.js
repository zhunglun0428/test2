module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.mjs$": "babel-jest"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es|other-es-lib))"],
  
  moduleFileExtensions: [
    "js",
    "json",
    "vue",
    "mjs"
  ],
  
  testMatch: [
    "**/tests/**/*.spec.[jt]s?(x)"
  ]
  
}
