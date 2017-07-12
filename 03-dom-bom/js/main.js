window.onload = () => {

  // handle navigation menu in the header
  (() => {
    const menuIcon = document.getElementById('menu-icon');
    menuIcon.addEventListener('click', () => {
      let nav = document.getElementById('header-nav');
      if (nav.style.display === 'none' || nav.style.display === '') {
        nav.style.display = 'block';
      } else {
        nav.style.display = 'none';
      }
    });
  })();

  // load posts
  let status = response => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  };

  let json = response => {
    return response.json();
  };

  fetch('posts.json')
    .then(status)
    .then(json)
    .then(data => {
      let postData = data.data;
      getTags(postData);
      sortPostsByDate(postData);
      sortPostsByTags(postData);
      renderPosts(postData);
      loadPosts(loadingPos);
      handleTagSelection(postData);
      searchPosts();
      deletePost();
      recoverPosts(postData);
    }).catch(error => {
      console.log(
        `There was a problem with representing the data. ${error}`
      );
    });

  let postBlock = document.getElementById('primary-content');
  const loadingPos = 0;

  // get and render tag list
  const getTags = data => {
    let tagListElement = document.getElementById('tag-selection').querySelector('div');

    let tagList = [];
    for (i = 0; i < data.length; i++) {
      let postTags = data[i].tags;
      for (j = 0; j < postTags.length; j++) {
        let tagName = postTags[j].toLowerCase();

        if (!tagList.includes(tagName)) {
          let tagElement = document.createElement('div');
          let tagInput = document.createElement('input');
          let tagLabel = document.createElement('label');

          tagElement.className = 'tag-element';
          setAttributes(tagInput, {
            'type': 'checkbox',
            'id': tagName,
            'name': 'tag',
            'value': tagName
          });
          tagInput.checked = localStorage.selectedTags.includes(tagName);
          tagLabel.setAttribute('for', tagName);
          tagLabel.innerHTML = tagName;

          tagList.push(tagName);
          tagElement.appendChild(tagInput);
          tagElement.appendChild(tagLabel);
          tagListElement.appendChild(tagElement);
        }
      }
    }
  };

  // sort posts by date
  const sortPostsByDate = data => {
    data.sort((a, b) => {
      let comparison = Date.parse(b.createdAt) - Date.parse(a.createdAt);
      return comparison;
    });
  };

  // sort posts by selected tags
  const sortPostsByTags = data => {
    if (localStorage.selectedTags.length > 0) {
      data.sort((a, b) => {
        const countTags = (post) => {
          let count = 0;

          for (let i = 0; i < post.tags.length; i++) {
            let tag = post.tags[i].toLowerCase();
            if (localStorage.selectedTags.includes(tag)) {
              count += 1;
            }
          }
          return count;
        };

        let aTagsNumber = countTags(a);
        let bTagsNumber = countTags(b);
        let comparison = bTagsNumber - aTagsNumber;

        if (comparison === 0) {
          comparison = Date.parse(b.createdAt) - Date.parse(a.createdAt);
        }
        return comparison;
      });
    }
  };

  // display data
  const renderPosts = data => {
    for (let i = loadingPos; i < 10; i++) {
      let date = new Date(data[i].createdAt);
      let dateToDisplay = date.toLocaleString();

      if (!'deletedPosts' in localStorage) {
        localStorage.deletedPosts = '';
      }

      if (!localStorage.deletedPosts.split(',').includes(i.toString())) {
        let post = document.createElement('div');
        let deleteIcon = document.createElement('div');
        let postTitle = document.createElement('h3');
        let postDescription = document.createElement('p');
        let postImageBlock = document.createElement('div');
        let postImage = document.createElement('img');
        let postDate = document.createElement('p');
        let postTags = document.createElement('ul');

        post.setAttribute('index', i);
        post.className = 'post';
        deleteIcon.className = 'delete-icon';
        postDescription.className = 'post-description';
        postImageBlock.className = 'post-image-block';
        postDate.className = 'post-date';
        postTags.className = 'post-tags';

        postTitle.innerHTML = data[i].title;
        postDescription.innerHTML = data[i].description;
        postImage.setAttribute('src', data[i].image);
        postDate.innerHTML = dateToDisplay;

        for (let j = 0; j < data[i].tags.length; j++) {
          let tag = document.createElement('li');
          tag.innerHTML = data[i].tags[j];
          postTags.appendChild(tag);
        }

        deleteIcon.appendChild(document.createElement('div'));
        deleteIcon.appendChild(document.createElement('div'));
        post.appendChild(deleteIcon);
        post.appendChild(postTitle);
        post.appendChild(postDescription);
        postImageBlock.appendChild(postImage);
        post.appendChild(postImageBlock);
        post.appendChild(postDate);
        post.appendChild(postTags);
        postBlock.appendChild(post);
      }
    }
  };

  // load posts on scroll if user gets the end of the list of them
  const loadPosts = pos => {

  };

  // handle tag selection
  const handleTagSelection = data => {
    document.getElementById('tag-selection').querySelector('button')
      .addEventListener('click', () => {
        let selectedTags = [];
        let tagElements = document.getElementsByName('tag');

        for (let i = 0; i < tagElements.length; i++) {
          if (tagElements[i].checked) {
            selectedTags.push(tagElements[i].value);
          }
        }
        localStorage.selectedTags = selectedTags;
        sortPostsByDate(data);
        sortPostsByTags(data);
        postBlock.innerHTML = '';
        renderPosts(data);
      });
  };

  // search posts by input
  const searchPosts = () => {
    let searchInput = document.getElementById('search-field');
    let posts = document.getElementsByClassName('post');
    searchInput.addEventListener('keyup', () => {
      let value = searchInput.value.toLowerCase();

      for (let i = 0; i < posts.length; i++) {
        posts[i].style.display = 'block';
        let postTitle = posts[i].querySelector('h3').innerHTML.toLowerCase();
        if (!postTitle.includes(value)) {
          posts[i].style.display = 'none';
        }
      }
    });
    deletePost();
  };

  // delete post
  const deletePost = () => {
    let deletedPosts = localStorage.deletedPosts.split(',');
    let deleteIcons = document.getElementsByClassName('delete-icon');

    for (let i = 0; i < deleteIcons.length; i++) {
      deleteIcons[i].addEventListener('click', function() {
        let post = this.parentElement;
        deletedPosts.push(post.getAttribute('index'));
        post.style.display = 'none';
        localStorage.deletedPosts = deletedPosts;
      });
    }
  };

  // recover all posts after deletion
  const recoverPosts = data => {
    document.getElementById('posts-recover')
      .addEventListener('click', () => {
        localStorage.deletedPosts = '';
        let posts = document.getElementsByClassName('post');

        for (let i = 0; i < posts.length; i++) {
          posts[i].style.display = 'block';
        }
        sortPostsByDate(data);
        sortPostsByTags(data);
        postBlock.innerHTML = '';
        renderPosts(data);
        console.log(localStorage.deletedPosts);
      });
  };

  // set multiple attributes
  const setAttributes = (element, attrs) => {
    for (let key in attrs) {
      element.setAttribute(key, attrs[key]);
    }
  };
};

// REMOVE SOME EVENT LISTENERS

// REPLACE DATA LINK

// CREATE CLASS FOR DATA HANDLING

// ontouchmove onwheel onscroll