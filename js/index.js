const loadAllPosts = async (searchText = '') => {
  try {
      let apiUrl = 'https://openapi.programming-hero.com/api/retro-forum/posts';

      if (searchText) {
          apiUrl += `?category=${searchText}`;
      }

      const res = await fetch(apiUrl);
      const data = await res.json();
      const allPostsInfo = data.posts;

      // Display posts
      displayAllPosts(allPostsInfo);
  } catch (error) {
      console.error('Error loading posts:', error);
  }
};


const displayAllPosts = (allPostsInfo)=>{
  // console.log(allPostsInfo);

  const postContainer = document.getElementById("post-container");
  postContainer.textContent = '';

  allPostsInfo.forEach(allPosts => {
      // console.log(allPosts);
      const postsDiv = document.createElement("div");
  const status = allPosts.isActive;

  postsDiv.innerHTML = `
      <div class="flex flex-col justify-center items-center lg:flex lg:flex-row lg:item-left lg:justify-start p-5 card card-side latest-post shadow-lg">
          <div>
              <div class="w-[72px] h-[72px] rounded-2xl relative">
                  <img src="${
                      allPosts.image
                  }" class="rounded-2xl" alt="Products"/>
                  <div id="active-status" class="w-2 h-2 bg-green-500 rounded-full absolute -right-0 -top-0 ${
                    status ? "bg-green-400" : "bg-red-500"
                  }"></div>
              </div>
          </div>
          
          <div class="mb-5 ml-5">
              <div class="flex gap-6">
                  <p class="font-bold"># ${allPosts.category}</p>
                  <p class="font-bold">Author:  ${allPosts.author.name}</p>
              </div>
              
              <div class="border-b border-dashed border-gray-400">
                  <h2 class=" card-title text-2xl font-extrabold text-[#131318] mb-3">${
                    allPosts.title
                  }</h2>
                  <p class="text-[#13131863] mb-3">${allPosts.description}</p>
              
              </div>
              <div class="flex justify-between gap-5 mt-4">
                  <div class="flex gap-5">
                      <p>
                          <i class="fa-solid fa-message text-gray-500"></i> ${
                            allPosts.comment_count
                          }
                      </p>    
                      <p>
                          <i class="fa-solid fa-eye"></i> ${
                            allPosts.view_count
                          }
                      </p> 
                      <p>
                          <i class="fa-regular fa-clock"></i> ${
                            allPosts.posted_time
                          } PM
                      </p>
                  </div>
                  <div  id="add-in-read-collection" onclick="addCount('${allPosts.id}')" class="bg-green-500 pl-1 justify-center items-center w-6 h-6 rounded-full">
                      <div id="envelope" class=""  ><i class="fa-solid fa-envelope text-white "></i></div>
                  </div>
              </div>
          </div>
      </div>
      
      `;
      postContainer.appendChild(postsDiv);
  });
  //hide loading spinner
  toggleLoadingSpinner(false);
}

const addCount = async (id) => {
  try {
      console.log('clicked', id);
      
      // Convert id to a number if it's a string
      id = parseInt(id);

      // Fetch data from the API for the clicked item
      const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?=${id}`);
      const data = await res.json();
      const clickedPost = data.posts.find(post => post.id === id);

      // Get the container element
      const abc = document.getElementById("mark-as-read-container");
      
      // Create HTML elements for the clicked post
      if (clickedPost) {
          const abcDiv = document.createElement("div");
          abcDiv.classList.add("post-item");
          abcDiv.innerHTML = `
              <div id="mark-as-read-div" class="flex justify-between p-4 mb-4 gap-2 bg-white rounded-2xl">
                  <div>
                      <h1>${clickedPost.title}</h1>
                  </div>
                  <div class="">
                      <p><i class="fa-solid fa-eye"></i> ${clickedPost.view_count || 0}</p>
                  </div>
              </div>
          `;
          abc.appendChild(abcDiv); // Append the created div to the container
      } 
      else {
          console.log('No post found with the clicked id:', id);
      }
      //   read count
  let markAsRead = document.getElementById("mark_as_read");
  markAsRead.innerText = incressValue(parseInt(markAsRead.innerText));
  console.log(markAsRead.innerText);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Function to handle search
const handleSearch = () => {
  // Show loading spinner
  toggleLoadingSpinner(true);

  // Get the search field
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value.toLowerCase();

  if (searchText === 'comedy' || searchText === 'coding' || searchText === 'music' || searchText === '') {
      // console.log('Found');
      loadAllPosts(searchText);
  } else {
      // console.log('Not found');
      // Clear the post container
      const postContainer = document.getElementById('post-container');
      postContainer.innerHTML = '';

      // Create a message for the "missing" search
      const postDiv = document.createElement('div');
      postDiv.classList.add('w-full', 'h-[120px]', 'rounded-[24px]','bg-gray-200', 'p-8');
      postDiv.innerHTML = `
          <h1 class="text-3xl font-bold text-red-400">Your searching on '${searchText}' is Missing</h1>
      `;
      postContainer.appendChild(postDiv);
      toggleLoadingSpinner(false);
  }
  
};


//toggleLoading spinner

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
      loadingSpinner.classList.remove('hidden');
  } else {
      // hiding the loading spinner for at least 2000 milliseconds
      setTimeout(() => {
          loadingSpinner.classList.add('hidden');
      }, 2000);
  }
};

// load all latest posts
const loadLatestPost = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await res.json();
  displayLatestPosts(data);
};
function displayLatestPosts(latestPosts) {
  console.log(latestPosts);
  const latestPostContainer = document.getElementById("latest-post-container");
  for (const latestPost of latestPosts) {
    const latestPostsTitle = latestPost.title;
    const latestPostsCoverImg = latestPost.cover_image;
    const latestPostsProfileImg = latestPost.profile_image;
    const latestPostDiv = document.createElement("div");
    latestPostDiv.innerHTML = `
        <div class="latest-post shadow-lg">
            <figure class="p-6">
            <img src="${latestPostsCoverImg}" alt="latestPostsCoverImg" class="rounded-xl" />
            </figure>
            <div class="flex flex-col px-6 pb-6">
                <div>
                    <p><i class="fa-solid fa-calendar-days text-[#12132d99]"></i> <span class="mulish-4 text-[#12132d99]">${
                      latestPost.author.posted_date
                        ? latestPost.author.posted_date
                        : "No publish date"
                    }</span></p>
                </div>
                <div>
                    <h2 class="text-[#12132D] text-[18px] mulish-8 my-4">${latestPostsTitle}</h2>
                    <p class="mulish-4 text-[#12132d99] mb-3">${
                      latestPost.description
                    }</p>
                </div>
                <div class="flex gap-2">
                    <div class="w-[44px] h-[44px] rounded-full" ><img src="${latestPostsProfileImg}" class="w-[44px] h-[44px] rounded-full" alt=""></div>
                    <div class="flex flex-col">
                        <h1 class="mulish-7 text-[#12132D]">${
                          latestPost.author.name
                        }</h1>
                        <p class="mulish-4 text-[14px] text-[#12132d99]">${
                          latestPost.author.designation
                            ? latestPost.author.designation
                            : "Unknown"
                        }</p>
                    </div>
            </div>
            </div>
        </div>
        
        `;
    latestPostContainer.appendChild(latestPostDiv);
  }
}
// simple count function
function incressValue(value) {
  return (value += 1);
}
//   callback
loadLatestPost();
loadAllPosts();