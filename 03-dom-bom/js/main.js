// UNTIL DEADLINE:

// OPTIMIZE RESPONSIVE STYLE

// ADD COMMENTS

'use strict';

window.onload = () => {
  window.scrollTo(0, 0);

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

  const fetchPostData = fetch('https://api.myjson.com/bins/152f9j')
    .then(status)
    .then(json)
    .catch(error => {
      console.log(
        `There was a problem with representing the data. ${error}`
      );
    });

  fetchPostData.then(data => {
    let postData = data.data;
    getTags(postData);
    sortPostsByTags(postData);
    renderPosts(postData);
    searchPosts(postData);
    loadPosts(postData);
    handleTagSelection(postData);
    recoverPosts(postData);
  });

  let postBlock = document.getElementById('primary-content');
  let loadingPos = 0;

  // get and render tag list
  const getTags = data => {
    if (!localStorage.getItem('selectedTags')) {
      localStorage.selectedTags = '';
    }
    let tagListElement = document.getElementById('tag-selection').querySelector('div');
    let tagList = [];

    for (let i = 0; i < data.length; i++) {
      let postTags = data[i].tags;
      for (let j = 0; j < postTags.length; j++) {
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

  // sort posts by date and selected tags
  const sortPostsByTags = data => {
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

      let comparison = Date.parse(b.createdAt) - Date.parse(a.createdAt);
      if (localStorage.selectedTags.length > 0) {
        comparison = countTags(b) - countTags(a);
        if (comparison === 0) {
          comparison = Date.parse(b.createdAt) - Date.parse(a.createdAt);
        }
      }

      return comparison;
    });
  };

  // create post DOM elements
  const createPostElement = (postData, postIndex) => {
    let date = new Date(postData.createdAt);
    let dateToDisplay = date.toLocaleString();

    const prepareElement = {
      'post': function(element) {
        element.setAttribute('index', postIndex);
      },
      'deleteIcon': element => {
        element.appendChild(document.createElement('div'));
        element.appendChild(document.createElement('div'));
        deletePost(element);
      },
      'postTitle': element => element.innerHTML = postData.title,
      'postDescription': element => element.innerHTML = postData.description,
      'postImage': element => element.setAttribute('src', postData.image),
      'postImageBlock': element => element.appendChild(postImage),
      'postDate': element => element.innerHTML = dateToDisplay,
      'postTags': element => {
        for (let j = 0; j < postData.tags.length; j++) {
          let tag = document.createElement('li');
          tag.innerHTML = postData.tags[j];
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

    return post;
  };

  // display data
  const renderPosts = (data, searchInput = '') => {
    if (!localStorage.getItem('deletedPosts')) {
      localStorage.deletedPosts = '';
    }

    for (let i = loadingPos; i < loadingPos + 10; i++) {
      if (i === data.length) {break}
      let deletedPosts = localStorage.deletedPosts.split(',');
      let postNotDeleted = !deletedPosts.includes(i.toString());
      let matchSearchInput = data[i].title.toLowerCase().includes(searchInput);

      if (postNotDeleted && matchSearchInput) {
        let post = createPostElement(data[i], i);
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
          let footer = document.querySelector('footer');
          let contentEndPos = document.body.offsetHeight - footer.offsetHeight;

          if (window.innerHeight + window.scrollY >= contentEndPos) {
            loadingPos += 10;
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