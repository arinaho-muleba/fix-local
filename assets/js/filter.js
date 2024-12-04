let debounceTimer;
document.addEventListener("DOMContentLoaded", async () => {
  const useSemanticSearch = true;
  const fullURL = window.location.href;
  const type = fullURL.includes("fix")
    ? "howToFix"
    : fullURL.includes("stories")
    ? "stories"
    : fullURL.includes("report")
    ? "howToReport"
    : "";
  const pagefind = await import("/pagefind/pagefind.js");
  const categoryFilter = document.getElementById("categoryFilter");
  const subcategoryFilter = document.getElementById("subcategoryFilter");
  const locationFilter = document.getElementById("locationFilter");
  const searchInput = document.getElementById("search");
  const articles = document.querySelectorAll("div article");

  const subcategoriesData = {
    locations: ["Johannesburg", "Cape Town"],
    categories: [
      "Electricity",
      "Environment",
      "Health",
      "Parks and Recreation",
      "Roads, Transport and Traffic",
      "Safety and Security",
      "Storm Water and Flooding",
      "Water and Sanitation",
    ],
    subcategories: {
      Electricity: [
        "blackout/supply",
        "meter reading",
        "pre-paid meter",
        "streetlights",
        "wires/cables",
        "equipment damage / exposure",
      ],
      Environment: ["pollution", "litter", "fallen trees"],
      Health: [
        "clinic challenges",
        "hospital challenges",
        "air pollution",
        "water pollution",
        "wood safety",
        "pest control",
        "noise pollution",
      ],
      "Parks and Recreation": [
        "fallen trees",
        "grass cutting",
        "sports grounds",
        "parks",
        "playgrounds",
        "communal gyms",
      ],
      "Roads, Transport and Traffic": [
        "potholes",
        "pavements",
        "traffic lights",
        "storm water drains",
        "streetlights",
        "public transport (buses, taxis, trains)",
        "unsafe road surface, markings and signage",
      ],
      "Safety and Security": [
        "neighborhood watch",
        "police/cpf",
        "lighting in the area",
        "long grass",
        "squatters",
        "drugs/drinking behaviour",
        "fire fighting",
      ],
      "Storm Water and Flooding": [
        "flooding",
        "roads and stormwater",
        "storm water blockages",
      ],
      "Water and Sanitation": [
        "pipes",
        "sewerage",
        "streams and rivers",
        "refuse collection",
        "toilets",
        "no water",
      ],
    },
  };
  // Populate subcategories based on selected category
  categoryFilter.addEventListener("change", function () {
    const selectedCategory = this.value;
    // Clear previous options
    subcategoryFilter.innerHTML =
      '<option value="">Select Subcategory</option>';

    // Populate subcategory filter based on selected category
    if (selectedCategory && subcategoriesData[selectedCategory]) {
      subcategoriesData[selectedCategory].forEach((subcat) => {
        const option = document.createElement("option");
        option.value = subcat;
        option.textContent = subcat;
        subcategoryFilter.appendChild(option);
      });
    }

    filterArticles();
  });

  // Handle subcategory, location, and search changes
  subcategoryFilter.addEventListener("change", filterArticles);
  locationFilter.addEventListener("change", filterArticles);
  searchInput.addEventListener("input", (event) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      filterArticles();
    }, 500);
  });
  // Function to filter articles based on selected filters
  async function filterArticles() {
    const selectedCategory = categoryFilter.value.toLowerCase();
    const selectedSubcategory = subcategoryFilter.value.toLowerCase();
    const selectedLocation = locationFilter.value.toLowerCase();
    const searchText = searchInput.value.toLowerCase();
    if (useSemanticSearch) {
      const parent = document.querySelector("#articleList");
      const spinner = document.querySelector("#spinner-wrapper");
      parent.style.display = "none";
      spinner.style.display = "flex";
      const baseURL = window.env.BASE_URL + "/content";
      const url = new URL(baseURL);

      url.searchParams.append("limit", -1);
      url.searchParams.append("selectedType", type);
      if (selectedCategory !== "") {
        url.searchParams.append("tags", selectedCategory);
      }
      if (selectedLocation !== "") {
        url.searchParams.append(
          "selectedLocation",
          selectedLocation.charAt(0).toUpperCase() +
            selectedLocation.slice(1).toLowerCase()
        ); //make it sentence case to work with the back end
      }
      if (selectedSubcategory !== "") {
        url.searchParams.append("tags", selectedSubcategory);
      }
      if (searchText !== "") {
        url.searchParams.append("search", searchText);
      }

      try {
        const results = await fetch(url.toString());
        const jsonBody = await results.json();

        const orderedMap = jsonBody.reduce((acc, item) => {
          acc[item.id] = item.index;
          return acc;
        }, {});
        const sortedArticles = Array.from(articles).sort((a, b) => {
          const aValue =
            orderedMap[a.id] !== undefined
              ? orderedMap[a.id]
              : Number.MIN_VALUE;
          const bValue =
            orderedMap[b.id] !== undefined
              ? orderedMap[b.id]
              : Number.MIN_VALUE;
          return aValue - bValue;
        });

        articles.forEach((item) => {
          item.remove();
        });

        sortedArticles.forEach((node) => {
          if (node.id in orderedMap) {
            node.style.display = "";
          } else {
            node.style.display = "none";
          }
          parent.appendChild(node);
        });
      } catch (e) {
        console.log(e);
      }

      parent.style.display = "grid";
      spinner.style.display = "none";
    } else {
      pagefind.init();
      if (searchText === "") {
        articles.forEach((article) => {
          article.style.display = "";
        });
      } else {
        const search = await pagefind.search(searchText);
        const results = await Promise.all(
          search.results.map(async (page) => {
            return await page.data();
          })
        );
        const filteredResults = results
          .filter((item) => {
            return item.url.split("/").length === 4;
          })
          .map((item) => item.url.split("/")[2]);

        articles.forEach((article) => {
          if (filteredResults.includes(article.id)) {
            article.style.display = "";
          } else {
            article.style.display = "None";
          }
        });
      }
    }
  }
});
