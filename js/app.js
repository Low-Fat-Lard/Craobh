const pageCache = {};

async function navigateTo(page, key) {
  const content = document.getElementById('content');
  let htmlContent = '';

  if (pageCache[page]) {
    // Load from cache if available
    htmlContent = pageCache[page];
  } else {
    try {
      let response = await fetch(`./html/${key}/${page}.html`);
      if (response.ok) {
        htmlContent = await response.text();
        pageCache[page] = htmlContent;
      } else {
        response = await fetch(`./404.html`);
        htmlContent = await response.text();
        pageCache[page] = htmlContent;
      }
    } catch (error) {
        response = await fetch(`./404.html`);
        htmlContent = await response.text();
        pageCache[page] = htmlContent;
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
    blogData.forEach((blog, index) => {
      const button = document.createElement("button");
      button.innerHTML = blog.title;
      button.onclick = function() {
        navigateTo(blog.url, 'pages');
      };
      document.getElementById("home").appendChild(button);
    });
}

navigateTo('home', 'home')
