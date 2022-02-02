function callApi(data) {
  let url = "/api/comment";
  let options = {
    method: "POST",
    headers: {
      "X-API-Token": window.sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(url, options).then((response) => response.json());
}

function showPosts(posts) {
  let template = document.getElementById("post-template");
  let container = document.getElementById("posts-container");

  posts.forEach((post) => {
    let clone = template.content.firstElementChild.cloneNode(true);
    clone.getElementsByTagName("h2")[0].textContent = post.title;
    clone.getElementsByClassName("body")[0].textContent = post.body;
    clone.querySelector("input[name=post_id]").setAttribute("value", post.id);

    if (post.image_id) {
      clone.getElementsByTagName("img")[0].src = "/uploads/" + post.filepath;
    }

    let commentElement = clone.getElementsByClassName("comments")[0];

    loadComments(post.id, commentElement)

    clone.getElementsByClassName("deleteButton")[0].addEventListener("click", (event) => {
      event.preventDefault();
      deletePost(post.id)
    })

    clone.getElementsByClassName("likeButton")[0].addEventListener("click", (event) => {
      event.preventDefault();
      likePost(post.id)
    })

    if(window.sessionStorage.getItem('token')!==null){
    clone.querySelector("form").addEventListener("submit", function (event) {
      event.preventDefault();
      let data = new FormData(event.target);
      let comment = data.get("commentsBox");
      let post_id = data.get("post_id");
      let commentElement = clone.getElementsByClassName("comments")[0]
      callApi({ comment: comment, post_id: post_id }).then((res) => {
        loadComment(res.lastID, commentElement)
      })
    })
  }else{
    clone.querySelector('form').remove()
    let a = document.createElement('a')
    a.href = '/login.html'
    a.innerText = 'You must login to comment'
    clone.querySelector('.comment-form-wrapper').appendChild(a)
  }
    let likeElem = clone.getElementsByClassName('likes')[0]
    updatePostLikeCount(post.id, likeElem)

    container.appendChild(clone);
  });
}

function updatePostLikeCount(post_id, elem){
  fetch("/api/postlikecount?post_id=" + post_id).then((result) => {
    result.json().then(data=>{
      return elem.innerText =  + data[0].likes
    })
  })
}

function deletePost(post_id) {
  let options = {
    method: "DELETE",
    headers: {
      "X-API-Token": window.sessionStorage.getItem("token")
    }
  }
  fetch("/api/post?post_id=" + post_id, options).then((result) => {
    location.reload()
  })
}

function deleteComment(comment_id) {
  let options = {
    method: "DELETE",
    headers: {
      "X-API-Token": window.sessionStorage.getItem("token")
    }
  }
  fetch("/api/comment?comment_id=" + comment_id, options).then((result) => {
    location.reload()
  })
}

function loadComment(comment_id, parentElement) {
  fetch("/api/comment?comment_id=" + comment_id).then(
    (response) => {
      //Display the posts in the page
      response.json().then((result) => {
        result.forEach((comment) => {
          createCommentHTML(comment, parentElement)
        });
      });
    }
  );
}

function loadComments(post_id, parentElement) {
  let offset = itemsPerPage * currentPage;

  fetch("/api/comments?post_id=" + post_id + "&offset=" + offset).then(
    (response) => {
      //Display the posts in the page

      response.json().then((result) => {
        result.forEach((comment) => {
          createCommentHTML(comment, parentElement)
        })
      });
    }
  );
}

function createCommentHTML(comment, parentElement) {
  let d = document.createElement('div')
  let a = document.createElement('a')
  a.href = '#'
  a.innerText = "Delete"
  a.classList.add('deleteComment')
  a.addEventListener("click", (event) => {
    event.preventDefault();
    deleteComment(comment.id)
  })
  d.innerText = comment.body
  d.appendChild(a)
  parentElement.appendChild(d)
}

let itemsPerPage = 3;
let currentPage = 0;

function loadPosts() {
  let offset = itemsPerPage * currentPage;

  fetch("/api/posts?offset=" + offset).then((response) => {
    //Display the posts in the page

    response.json().then((result) => {
      console.log(result);
      // result.forEach(showPosts)
      showPosts(result);
    });
  });
}

function nextPage() {
  currentPage++;
  loadPosts();
}

function likePost(post_id){
  let options = {
    method: "POST",
    headers: {
      "X-API-Token": window.sessionStorage.getItem("token"),
      "Content-Type": "application/json"
    }
  }
  fetch("/api/like?post_id="+ post_id, options).then((result) => {
    location.reload()
  })
}

loadPosts();
