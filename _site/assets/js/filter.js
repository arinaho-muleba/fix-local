let debounceTimer;

document.addEventListener("DOMContentLoaded", () => {
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
  searchInput.addEventListener("input",(event)=>{
    clearTimeout(debounceTimer);
    debounceTimer=setTimeout(()=>{
      filterArticles()

    },150)
  } );
  // Function to filter articles based on selected filters
  async function filterArticles() {
    const parent = document.querySelector("#articleList");
    const spinner=document.querySelector("#spinner-wrapper")
    parent.style.display="none"
    spinner.style.display="flex"
    const selectedCategory = categoryFilter.value.toLowerCase();
    const selectedSubcategory = subcategoryFilter.value.toLowerCase();
    const selectedLocation = locationFilter.value.toLowerCase();
    const searchText = searchInput.value.toLowerCase();

    const baseURL = window.env.BASE_URL+"/content";
    const url = new URL(baseURL);

    url.searchParams.append("limit", -1);
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

      const orderMap = new Map(jsonBody.map((item, index) => [item.id, index]));

      const sortedArticles = Array.from(articles).sort(
        (a, b) => orderMap.get(a.id) - orderMap.get(b.id)
      );
      articles.forEach((item) => {
        item.remove();
      });
      
      sortedArticles.forEach((node) => {
        if(orderMap.has(node.id)){
          node.style.display = "";
        }else{
          node.style.display="none";
        }
        parent.appendChild(node);
      });
    } catch (e) {
      console.log(e);
    }

    parent.style.display="grid"
    spinner.style.display="none"
  }
});
