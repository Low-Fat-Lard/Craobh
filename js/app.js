async function navigateTo(page) {
  const content = document.getElementById('content');
  let htmlContent = '';

  try {
    if(page == 'home') {
      runHome();
    }  
    const response = await fetch(`./html/${page}.html`);
    htmlContent = await response.text();
  } catch (error) {
    htmlContent = '<h1>Page Not Found</h1><p>The requested page was not found.</p>';
  }

  content.innerHTML = htmlContent;
}  

function runHome() {
  document.getElementById("home").innerHTML = 'portal'
}

navigateTo('home')
