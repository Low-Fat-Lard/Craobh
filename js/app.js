const pageCache = {};

async function navigateTo(page) {
  const content = document.getElementById('content');
  let htmlContent = '';

  if (pageCache[page]) {
    // Load from cache if available
    htmlContent = pageCache[page];
  } else {
    try {
      const response = await fetch(`${page}.html`);
      htmlContent = await response.text();

      // Cache the fetched HTML content
      pageCache[page] = htmlContent;
    } catch (error) {
      htmlContent = '<h1>Page Not Found</h1><p>The requested page was not found.</p>';
    }
  }
  content.innerHTML = htmlContent;
  if(page == 'home' && htmlContent != '') {
      displayBlogLinks();
  }
}

const fetchBlogData = async () => {
    try {
        const response = await fetch("./js/json/blog_data.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching blog data:", error);
        return [];
    }
};

const displayBlogLinks = async () => {
    const blogData = await fetchBlogData();  
    if (document.getElementById("home")) {
     blogData.forEach((blog, index) => {
      const button = document.createElement("li");
      button.innerHTML = blog.title;
      document.getElementById("home").innerHTML += button;
    }); 
    }
}

navigateTo('home')
