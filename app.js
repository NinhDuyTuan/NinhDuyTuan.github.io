
// tạo trang top headline
fetch('https://gnews.io/api/v4/top-headlines?&token=583a949c45730fcea275e88f1289389d&lang=en')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const news = data.articles;
        let html = "";
        let result = document.getElementById("result");
        for (let i = 0; i < news.length; i++) {
            let image = news[i].image;
            let content = news[i].content;
            let title = news[i].title;
            let url = news[i].url;
            let time = news[i].publishedAt;
            let description = news[i].description
            html += `
            <div class="section row" id="result">
            <div class="col-12 col-md-6 col-lg-4 img"><img src='${image}'></div>
            <div class="col-12 col-md-6 col-lg-8 content">
                <h3><a href =${url} target="_blank">${title}</a></h3><br>
                <i><small><small>${time}</small></small></i><br>
                <span>${description}</span>                
            </div> </div><hr>`
        }
        result.innerHTML = html;
    });

// begin modal search
const search = document.querySelector(".btn-search");
const modal = document.querySelector(".modal-search");
const modalClose = document.querySelector(".modal-close");
const modalBody = document.querySelector(".body-modal");

function inputSearch() {
    modal.classList.add('open-modal');
}
function closeModal() {
    modal.classList.remove('open-modal');
}
modal.addEventListener('click', closeModal);

modalBody.addEventListener('click', function (event) {
    event.stopPropagation();
})
//end modal


//begin search info

function searchButton() {
    let result = document.getElementById("result");
    let key = document.getElementById("keywords").value;
    let dateTo = document.getElementById("datepicker-to").value; 
    let dateFrom = document.getElementById("datepicker-from").value;
    from = dateFrom + "T00:00:00Z";
    to = dateTo + "T00:00:00Z";
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById('loader').classList.add('hidden');
        modal.classList.remove('open-load');
        const mySearch = JSON.parse(this.responseText);
        let search = mySearch.articles;
        let searchLine = ""
        for (var key in search) {
            let searchImage = search[key].image;
            let searchUrl = search[key].url;
            let searchTitle = search[key].title;
            let searchTime = search[key].publishedAt;
            let searchDescription = search[key].description;
            
            searchLine += `
                <div class="section row" id="result">
                <div class="col-12 col-md-6 col-lg-4 img"><img src='${searchImage}'></div>
                <div class="col-12 col-md-6 col-lg-8 content">
                    <h3><a href =${searchUrl} target="_blank">${searchTitle}</a></h3><br>
                    <i><small><small>${searchTime}</small></small></i><br>
                    <span>${searchDescription}</span>                
                </div> </div><hr>`

        }
        result.innerHTML = searchLine;
        
    }
    
    if (key == "") {
        alert('Bạn chưa nhập thông tin tìm kiếm ?');
    } else {
        if (to == "" && from == "") {
            let url = "https://gnews.io/api/v4/search?q=" + key + "&token=583a949c45730fcea275e88f1289389d";
            xhttp.open("GET", url);
            xhttp.send();
            modal.classList.remove('open-modal');

        } else if(to && from){
            let url = "https://gnews.io/api/v4/search?q=" + key + "&token=583a949c45730fcea275e88f1289389d";
            url += "&from=" + from + "&to=" + to ;
            console.log(url);
            xhttp.open("GET", url);
            xhttp.send();
            modal.classList.remove('open-modal');
        }
        document.getElementById('loader').classList.remove('hidden');
    }

}