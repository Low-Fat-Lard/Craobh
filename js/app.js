async function navigateTo(page) {
  const content = document.getElementById('content');
  let htmlContent = '';

  try {
    const response = await fetch(`./html/${page}.html`);
    htmlContent = await response.text();
    console.log(htmlContent)
  } catch (error) {
    htmlContent = '<h1>Page Not Found</h1><p>The requested page was not found.</p>';
  }

  content.innerHTML = htmlContent;
}
