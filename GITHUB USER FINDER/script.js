const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const profileContainer = document.getElementById("profile-container");
const errorContainer = document.getElementById("error-container");

const avatar = document.getElementById("avatar");
const nameElement = document.getElementById("name");
const usernameElement = document.getElementById("username");
const bioElement = document.getElementById("bio");
const locationElement = document.getElementById("location");
const joinedDateElement = document.getElementById("joined-date");
const profileLink = document.getElementById("profile-link");

const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");

const companyElement = document.getElementById("company");
const blogElement = document.getElementById("blog");
const twitterElement = document.getElementById("twitter");

const companyContainer = document.getElementById("company-container");
const blogContainer = document.getElementById("blog-container");
const twitterContainer = document.getElementById("twitter-container");
const reposContainer = document.getElementById("repos-container");

searchBtn.addEventListener("click", searchUser);
searchInput.addEventListener("keypress", (e) => {
     if (e.key === "Enter") searchUser();
});

async function searchUser() {
     const username = searchInput.value.trim();
     if (!username) {
          alert("Please enter a username");
          return;
     }

     try {
          profileContainer.classList.add("hidden");
          errorContainer.classList.add("hidden");

          const response = await fetch(`https://api.github.com/users/${username}`);
          if (!response.ok) throw new Error("User not found");

          const userData = await response.json();

          displayUserData(userData);
          fetchRepositories(userData.repos_url);

     } catch (error) {
          showError();
          console.log(error);
          
     }
}

async function fetchRepositories(url) {
     reposContainer.innerHTML = `<div class="loading-repos">Loading repositories...</div>`;
     try {
          const response = await fetch(url);
          const reposData = await response.json();
          displayRepos(reposData);
     } catch (error) {
          reposContainer.innerHTML = `<div class="no-repos">Failed to load repositories</div>`;
     }
}

function displayRepos(reposList) {
     if (!Array.isArray(reposList) || reposList.length === 0) {
          reposContainer.innerHTML = `<div class="no-repos">No repositories found</div>`;
          return;
     }

     reposContainer.innerHTML = "";
     reposList.forEach((repo) => {
          const repoCard = document.createElement("div");
          repoCard.className = "repo-card";

          repoCard.innerHTML = `
               <a href="${repo.html_url}" target="_blank" class="repo-name">
                    <i class="fas fa-code-branch"></i> ${repo.name}
               </a>
               <p class="repo-description">${repo.description || "No description available"}</p>
               <div class="repo-meta">
                    ${repo.language ? `<div><i class="fas fa-circle"></i> ${repo.language}</div>` : ""}
                    <div><i class="fas fa-star"></i> ${repo.stargazers_count}</div>
                    <div><i class="fas fa-code-fork"></i> ${repo.forks_count}</div>
                    <div><i class="fas fa-history"></i> ${formatDate(repo.updated_at)}</div>
               </div>
          `;

          reposContainer.appendChild(repoCard);
     });
}

function displayUserData(userData) {
     avatar.src = userData.avatar_url;
     nameElement.textContent = userData.name || userData.login;
     usernameElement.textContent = `@${userData.login}`;
     bioElement.textContent = userData.bio || "NO BIO AVAILABLE";

     locationElement.textContent = userData.location || "NOT SPECIFIED";
     joinedDateElement.textContent = formatDate(userData.created_at);

     profileLink.href = userData.html_url;
     followers.textContent = userData.followers;
     following.textContent = userData.following;
     repos.textContent = userData.public_repos;

     companyElement.textContent = userData.company || "NOT SPECIFIED";

     if (userData.blog) {
          blogElement.textContent = userData.blog;
          blogElement.href = userData.blog.startsWith("http")
               ? userData.blog
               : `https://${userData.blog}`;
     } else {
          blogElement.textContent = "NO WEBSITE";
          blogElement.href = "#";
     }

     if (userData.twitter_username) {
          twitterElement.textContent = `@${userData.twitter_username}`;
          twitterElement.href = `https://twitter.com/${userData.twitter_username}`;
     } else {
          twitterElement.textContent = "NO TWITTER";
          twitterElement.href = "#";
     }

     blogContainer.style.display = "flex";
     twitterContainer.style.display = "flex";

     profileContainer.classList.remove("hidden");
}

function showError() {
     errorContainer.classList.remove("hidden");
     profileContainer.classList.add("hidden");
}

function formatDate(date) {
     return new Date(date).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
     });
}
