module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-prettier-scss"],
  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: [
          "vertical",
          "decrement",
          "increment",
          "start",
          "end",
        ],
      },
    ],
    "font-family-no-missing-generic-family-keyword": [
      true,
      {
        ignoreFontFamilies: ["PrStart", "W95FA", "Digital"],
      },
    ],
  },
};
