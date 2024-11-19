const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("articles", function (collectionApi) {
    return collectionApi.getAll()[0].data.articles;
  });

  // Add markdown filter
  const md = new markdownIt();
  eleventyConfig.addFilter("markdown", (content) => md.render(content));

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
