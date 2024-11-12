module.exports = function (eleventyConfig) {
  // Collection for articles
  // eleventyConfig.addCollection("articles", function (collectionApi) {
  //     return collectionApi.getFilteredByGlob("./src/articles/*.md");
  // });

  return {
    dir: {
      input: "/src",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
