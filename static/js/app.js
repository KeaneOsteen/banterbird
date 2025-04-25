const username = "admin";

function renderPost(post) {
    const template = document
        .getElementById("post-template")
        .content.cloneNode(true);
    template.querySelector(".username").innerText = post.username;
    template.querySelector(".message").innerText = post.message;
    document.getElementById("feed").appendChild(template);
}

async function submitPost() {
    const message = document.getElementById("postInput").value;
    if (!message.trim()) return;

    try {
        const response = await fetch("/api/add_post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, message }),
        });

        if (response.ok) {

            renderPost({ username, message });
            document.getElementById("postInput").value = "";
        } else {
            console.log("😭 Server rejected the post", await response.text());
        }
    } catch (error) {
        console.log("😭 Post failed", error);
    }
}

