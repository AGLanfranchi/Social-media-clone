

function showPost(post) {
    let template = document.getElementById("post-template")
    let container = document.getElementById("posts-container")

    let clone = template.content.firstElementChild.cloneNode(true)

    clone.getElementsByTagName('h2')[0].textContent = post.title
    clone.getElementsByClassName('body')[0].textContent = post.body

    container.appendChild(clone)
}

let itemsPerPage = 3
let currentPage = 0

function loadPosts() {
    let offset = itemsPerPage * currentPage

    fetch('/api/posts?offset=' + offset).then(response => {
        //Display the posts in the page
       
        response.json().then(result => {
            console.log(result)
            result.forEach(showPost)
        })
    })
}

function nextPage() {
    currentPage++
    loadPosts()
}

loadPosts()

