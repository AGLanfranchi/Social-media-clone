function callApi(data) {
    let url="/api/comment"
    let options ={
        method: "POST",
              headers: {
                "X-API-Token": window.sessionStorage.getItem('token'),
                "Content-Type" : "application/json"
         },
                body: JSON.stringify(data)
            }

    return fetch(url, options).then(response => response.json());
}

function showPosts(posts) {
    let template = document.getElementById("post-template")
    let container = document.getElementById("posts-container")

    posts.forEach(post => {      
        let clone = template.content.firstElementChild.cloneNode(true)
        clone.getElementsByTagName('h2')[0].textContent = post.title
        clone.getElementsByClassName('body')[0].textContent = post.body
        clone.querySelector('input[name=post_id]').setAttribute('value', post.id)

        if (post.image_id) {
                clone.getElementsByTagName('img')[0].src = "/uploads/" + post.filepath
            }

        if (post.comment_id) {
            clone.getElementsByClassName('comments')[0].textContent = post.body
        }

        clone.querySelector('form').addEventListener('submit', function (event) {
            event.preventDefault()
            let data = new FormData(event.target);
            let comment = data.get("commentsBox");
            let post_id = data.get("post_id");

            console.log(event.target, data.get('commentsBox', data.get('post_id')))

            callApi({ "comment": comment, "post_id": post_id }).then(function(
                //Somthing here
            ){

            })
        })
    
        container.appendChild(clone)
        })
    }

let itemsPerPage = 3
let currentPage = 0

function loadPosts() {
    let offset = itemsPerPage * currentPage

    fetch('/api/posts?offset=' + offset).then(response => {
        //Display the posts in the page
       
        response.json().then(result => {
            console.log(result)
            // result.forEach(showPosts)
            showPosts(result)
        })
    })
}

function nextPage() {
    currentPage++
    loadPosts()
}

loadPosts()

