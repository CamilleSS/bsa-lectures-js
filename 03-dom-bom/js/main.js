// UNTIL DEADLINE:

// REMOVE SOME EVENT LISTENERS

// CREATE CLASS FOR DATA HANDLING

// OPTIMIZE RESPONSIVE STYLE

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

  fetch('https://api.myjson.com/bins/152f9j')
    .then(status)
    .then(json)
    .then(data => {
      let postData = data.data;
      getTags(postData);
      sortPostsByDate(postData);
      sortPostsByTags(postData);
      renderPosts(postData);
      searchPosts(postData);
      loadPosts(postData);
      handleTagSelection(postData);
      recoverPosts(postData);
    }).catch(error => {
      console.log(
        `There was a problem with representing the data. ${error}`
      );
    });

  let postBlock = document.getElementById('primary-content');
  let loadingPos = 0;

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
  const renderPosts = (data, searchInput = '') => {
    for (let i = loadingPos; i < loadingPos + 10; i++) {
      if (i === data.length) {break}
      if (!'deletedPosts' in localStorage) {
        localStorage.deletedPosts = '';
      }
      let date = new Date(data[i].createdAt);
      let dateToDisplay = date.toLocaleString();

      let deletedPosts = localStorage.deletedPosts.split(',');
      let postNotDeleted = !deletedPosts.includes(i.toString());
      let matchSearchInput = data[i].title.toLowerCase().includes(searchInput);

      if (postNotDeleted && matchSearchInput) {
        let prepareElement = {
          'post': function(element) {
            element.setAttribute('index', i);
          },
          'deleteIcon': element => {
            element.appendChild(document.createElement('div'));
            element.appendChild(document.createElement('div'));
            deletePost(element);
          },
          'postTitle': element => {element.innerHTML = data[i].title},
          'postDescription': element => {element.innerHTML = data[i].description},
          'postImage': element => {element.setAttribute('src', data[i].image)},
          'postImageBlock': element => {element.appendChild(postImage)},
          'postDate': element => {element.innerHTML = dateToDisplay},
          'postTags': element => {
            for (let j = 0; j < data[i].tags.length; j++) {
              let tag = document.createElement('li');
              tag.innerHTML = data[i].tags[j];
              element.appendChild(tag);
            }
          }
        };

        let constructElement = (tagName,
                                className = '',
                                ownFunction,
                                postChild = true) => {
          let element = document.createElement(tagName);
          if (className) {element.className = className}
          prepareElement[ownFunction](element);
          if (postChild) {post.appendChild(element)}
          return element;
        };

        let post = constructElement('div', 'post', 'post', false);
        let deleteIcon = constructElement('div', 'delete-icon', 'deleteIcon');
        let postTitle = constructElement('h3', '', 'postTitle');
        let postDescription = constructElement('p', 'post-description', 'postDescription');
        let postImage = constructElement('img', '', 'postImage');
        let postImageBlock = constructElement('div', 'post-image-block', 'postImageBlock');
        let postDate = constructElement('p', 'post-date', 'postDate');
        let postTags = constructElement('ul', 'post-tags', 'postTags');

        postBlock.appendChild(post);
      } else {
        loadingPos++;
      }
    }
  };

  // load posts on scroll if user gets the end of the list of them
  const loadPosts = data => {
      window.addEventListener('scroll', () => {
        if (loadingPos < data.length - 10) {
          let header = document.querySelector('header');
          let title = document.getElementById('title');
          let primaryContent = document.getElementById('primary-content');

          let pixelsToContentBottom = header.offsetHeight +
                                      title.offsetHeight +
                                      primaryContent.offsetHeight;
          if (window.innerHeight + window.scrollY >= pixelsToContentBottom) {
            loadingPos += 10;
            sortPostsByDate(data);
            sortPostsByTags(data);
            let searchInput = document.getElementById('search-field').value;
            renderPosts(data, searchInput);
          }
        }
      });
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

        loadingPos = 0;
        sortPostsByDate(data);
        sortPostsByTags(data);
        removeChildren(postBlock);
        let searchInput = document.getElementById('search-field').value;
        renderPosts(data, searchInput);
      });
  };

  // search posts by input
  const searchPosts = data => {
    let searchInput = document.getElementById('search-field');
    searchInput.addEventListener('keyup', () => {
      let value = searchInput.value.toLowerCase();
      loadingPos = 0;
      removeChildren(postBlock);
      renderPosts(data, value);
    });
  };

  // delete post
  const deletePost = (icon) => {
    icon.addEventListener('click', function() {
      let post = this.parentElement;
      post.remove();
      localStorage.deletedPosts += `,${post.getAttribute('index')}`;
    });
  };

  // recover all posts after deletion
  const recoverPosts = data => {
    document.getElementById('posts-recover')
      .addEventListener('click', () => {
        if (localStorage.deletedPosts) {
          localStorage.deletedPosts = '';

          loadingPos = 0;
          sortPostsByDate(data);
          sortPostsByTags(data);
          removeChildren(postBlock);
          let searchInput = document.getElementById('search-field').value;
          renderPosts(data, searchInput);
        }
      });
  };

  // set multiple attributes
  const setAttributes = (element, attrs) => {
    for (let key in attrs) {
      element.setAttribute(key, attrs[key]);
    }
  };

  // remove every child node from an element
  const removeChildren = element => {
    while (element.hasChildNodes()) {
      element.removeChild(element.childNodes[0]);
    }
  }
};