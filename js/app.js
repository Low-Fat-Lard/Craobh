const pageCache = {};

async function navigateTo(page, key) {
  const content = document.getElementById('content');
  let htmlContent = '';

  try {
    const response = await fetch(`./html/${key}/${page}.html`);
    htmlContent = response.ok ? await response.text() : await fetch(`./404.html`).then(res => res.text());
    pageCache[page] = { content: htmlContent, key: key };
  } catch (error) {
    htmlContent = await fetch(`./404.html`).then(res => res.text());
    pageCache[page] = { content: htmlContent, key: key };
  }

  content.innerHTML = htmlContent;
  if (page === 'home' && htmlContent !== '') {
    displayBlogLinks();
  } else if (page === 'quiz' && htmlContent !== '') {
    displayQuiz();
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

const fetchQuizData = async () => {
  const storedReviews = localStorage.getItem('reviews');
  return storedReviews ? JSON.parse(storedReviews, (key, value) => {
    if (key === 'nextReviewDate') {
      return new Date(value);
    }
    return key === 'streak' ? parseInt(value, 10) : value;
  }) : [];
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

const displayQuizLinks = async () => {
    const localStorage = await fetchQuizData();  
    let quizData = [];
    if(localStorage.length > 0) {
      quizData = localStorage;
    } else {
      quizData = await fetchBlogData();
    }
    quizData.forEach((blog, index) => {
      const button = document.createElement("button");
      button.innerHTML = blog.title;
      button.onclick = function() {
        navigateTo(blog.url, 'pages');
      };
      document.getElementById("reviewList").appendChild(button);
    });
}

navigateTo('home', 'home')
