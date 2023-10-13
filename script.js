function getGithubUser(username) {
    return fetch("https://api.github.com/users/" + username)
        .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    });
}

function onSearchClick() {
    const username_input = document.getElementById('search_input');
    let username = username_input.value;

    // Start loading
    getGithubUser(username)
        .then(finishLoading)
        .catch(error);
}

function finishLoading(data) {

    const image_label = document.getElementById("profile_image");
    const name_label = document.getElementById("user_profile_name");
    const login_label = document.getElementById("user_profile_hashtag");

    const repos_number = document.getElementById("number_of_repos");
    const followers_number = document.getElementById("number_of_followers");
    const following_number = document.getElementById("number_of_following");

    const biography = document.getElementById("biography_label");

    const twitter_label = document.getElementById("user_twitter");
    const company_label = document.getElementById("user_company");
    const blog_label = document.getElementById("user_blog");
    const location_label = document.getElementById("user_location");

    const joined_label = document.getElementById("date");

    console.log(data)

    image_label.src = data.avatar_url;
    name_label.innerText = data.name;
    login_label.innerText = "@" + data.login;

    repos_number.innerText = data.public_repos;
    followers_number.innerText = data.followers;
    following_number.innerText = data.following;

    biography.innerText = (data.bio || 'Not available'); // if data.bio is null, use '—'

    twitter_label.innerText = (data.twitter_username || 'Not available'); // if data.twitter_username is null, use '—'
    company_label.innerText = (data.company || 'Not available'); // if data.company is null, use '—'
    blog_label.innerText = (data.blog || 'Not available'); // if data.blog is null, use '—'
    location_label.innerText = (data.location || 'Not available'); // if data.location is null, use '—'

    // Format date for joined:
    let date = new Date(data.created_at);
    let options = {year: 'numeric', month: 'long', day: 'numeric' };
    joined_label.innerText = date.toLocaleDateString('en-UK', options);

    const username_input = document.getElementById('search_input');
    username_input.value = '';
    
}

function error(data) {
    alert("Error: " + data.status);
}