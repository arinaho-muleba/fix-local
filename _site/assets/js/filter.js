document.addEventListener("DOMContentLoaded", () => {
  const categoryFilter = document.getElementById("categoryFilter");
  const subcategoryFilter = document.getElementById("subcategoryFilter");
  const locationFilter = document.getElementById("locationFilter");
  const searchInput = document.getElementById("search");
  const articles = document.querySelectorAll("div a");

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
    console.log("", selectedCategory);
    // Clear previous options
    subcategoryFilter.innerHTML =
      '<option value="">Select Subcategory</option>';

    // Populate subcategory filter based on selected category
    if (selectedCategory && subcategoriesData.subcategories[selectedCategory]) {
      subcategoriesData.subcategories[selectedCategory].forEach((subcat) => {
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
  searchInput.addEventListener("input", filterArticles);

  // Function to filter articles based on selected filters
  function filterArticles() {
    const selectedCategory = categoryFilter.value.toLowerCase();
    const selectedSubcategory = subcategoryFilter.value.toLowerCase();
    const selectedLocation = locationFilter.value.toLowerCase();
    const searchText = searchInput.value.toLowerCase();

    articles.forEach((article) => {
      const articleTags = article.dataset.tags.toLowerCase().split("$ ");
      const articleLocation = article.dataset.location.toLowerCase();
      const articleTitle = article.dataset.title.toLowerCase();
      const articleDescription = article.dataset.description.toLowerCase();

      // Check if the article matches the filter
      const matchesCategory =
        !selectedCategory || articleTags.includes(selectedCategory);
      const matchesSubcategory =
        !selectedSubcategory || articleTags.includes(selectedSubcategory);
      const matchesLocation =
        !selectedLocation || articleLocation === selectedLocation;
      const matchesSearch =
        !searchText ||
        articleTitle.includes(searchText) ||
        articleDescription.includes(searchText);

      // Show or hide the article based on match results
      if (
        matchesCategory &&
        matchesSubcategory &&
        matchesLocation &&
        matchesSearch
      ) {
        article.style.display = "";
      } else {
        article.style.display = "none";
      }
    });
  }
});
