import dotenv from 'dotenv';
dotenv.config();


export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets/**");
  eleventyConfig.addFilter("toJson", (value) => {
    return JSON.stringify(value);
  });
  eleventyConfig.addGlobalData('env', {
    BASE_URL: process.env.BACKEND_URL,
  });
}
 