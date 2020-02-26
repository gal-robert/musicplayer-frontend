var jsmediatags = window.jsmediatags;

(async function () {
    let json = await fetch("dist/data/songpath.json").then(res => res.json());
    let container = document.getElementById("listContainer");
    for (let i = 0; i < json.length; i++) {
        var urlstring = "http://localhost:7882/" + json[i]
        jsmediatags.read(urlstring, {
            onSuccess: tag => {
                let tags = tag.tags
                container.innerHTML += `<li data-id="${i}" onclick="playSelectedSong(${i})"> ${tags.artist} - ${tags.title}</li>`
            }
        })
        if(i === 499) console.log("finished loading")
    }
})();

playSelectedSong = async (id) => {
    let json = await fetch("dist/data/songpath.json").then(res => res.json());

    let songID = json[id];
    let player = document.getElementById("player");
    player.setAttribute("src", songID);
    var urlstring = "http://localhost:7882/" + songID

    jsmediatags.read(urlstring, {
        onSuccess: tag => {
            var tags = tag.tags;
        }
    })

    player.play();
}