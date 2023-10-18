const form = document.getElementById("form")

let request = {}




form.addEventListener("change", (e) => {
    request[e.target.name] = e.target.value

})

form.addEventListener("submit", (e) => {

    document.getElementById("link-box").innerHTML += ``
    e.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("X-API-KEY", "69816e9dcd096eeb5a7d1bf713751f1a59fe59ac");
    myHeaders.append("Content-Type", "application/json");


    var raw = JSON.stringify({
        "q": request["query"],
        "gl": "uz"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://google.serper.dev/search", requestOptions)
        .then(response => response.json())
        .then((result) => {
            // console.log(result)
            const organic = result["organic"]
            const related = result["relatedSearches"]
            const extra = result["peopleAlsoAsk"]
            const searchParams = result["searchParameters"]
            console.log(organic);
            organic.forEach((e) => {
                console.log(e);

                if (!e.imageUrl == true) {
                    document.getElementById("link-box").innerHTML += `   <div class="resone">
                            <div class="site-main flex gap-3 items-center mb-4 cursor-pointer" id="${e.link}">
                        <img src="/assets/media/globe.png"
                            class="w-7 h-7 rounded-full" alt="${e.title}">
                        <h2 class="font-bold text-3xl">${e.title}</h2>
                        </div>
                     <p class="w-96 mb-5">${e.snippet}</p>
                    </div>
                `
                }
                else {
                    document.getElementById("link-box").innerHTML += `   <div class="resone">
                    <div class="site-main flex gap-3 items-center mb-4 cursor-pointer" id="${e.link}">
                <img src="${e.imageUrl}"
                    class="w-7 h-7 rounded-full" alt="${e.title}">
                <h2 class="font-bold text-3xl">${e.title}</h2>
                </div>
             <p class="w-96 mb-5">${e.snippet}</p>
            </div>
        `
                }
                // document.getElementById("link-box").innerHTML = ""

            });



        })


    console.log(request);
})