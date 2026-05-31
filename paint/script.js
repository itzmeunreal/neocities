const forminit = new Forminit();

document.getElementById("sketchForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const status = document.getElementById("formStatus");
    status.style.display = "block";
    status.style.color = "#888";
    status.textContent = "sending...";
    const { data, error } = await forminit.submit("l2oj4i0hu9j", new FormData(e.target));
    if (error) {
        status.style.color = "#ff4444";
        status.textContent = "something went wrong... try again!";
        return;
    }
    status.style.color = "#1DB954";
    status.textContent = "drawing sent! thanks :)";
    e.target.reset();
    e.target.style.display = "none";
});
