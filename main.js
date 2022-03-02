let inputInn = document.body.querySelector(".inputINN");
let inputCompany = document.body.querySelector(".inputCompany");
let inputName = document.body.querySelector(".inputName");
let inputFullName = document.body.querySelector(".inputFullName");
let inputAddress = document.body.querySelector(".inputAddress");

let inn;
let name;

let hintOne = document.body.querySelector(".hintOne");
let hintTwo = document.body.querySelector(".hintTwo");
let hintThree = document.body.querySelector(".hintThree");
let hintFour = document.body.querySelector(".hintFour");
let hintFive = document.body.querySelector(".hintFive");

function check(name) {
    let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
    let token = "bdde2680be179d3098660efeeba7919f14e2b484";
    let query = name;
    
    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
    }
    
    fetch(url, options)
    .then(response => response.json())
    .then(result => {
        inputCompany.value = result.suggestions[0].value;
        inputName.value = result.suggestions[0].data.name.short_with_opf;
        inputFullName.value = result.suggestions[0].data.name.full_with_opf;
        inputInn.value = result.suggestions[0].data.inn;
        inputAddress.value = result.suggestions[0].data.address.value;
        
    })
    .catch(error => console.log("error", error));
}

function hint(value) {
    if(inputCompany.value != ""){

        document.body.querySelector(".hints").classList.remove("active");

        let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
        let token = "bdde2680be179d3098660efeeba7919f14e2b484";
        let query = value;

        var options = { 
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({query: query})
        }

        fetch(url, options)
        .then(response => response.json())
        .then(result => {

            if(result.suggestions[0]){
                hintOne.classList.remove("active");
                hintOne.style.borderBottom = "1px dashed black";
                document.body.querySelector(".titleOne").innerHTML = result.suggestions[0].value;
                document.body.querySelector(".innOne").innerHTML = result.suggestions[0].data.inn;
                document.body.querySelector(".addressOne").innerHTML = result.suggestions[0].data.address.value;
            } else{
                document.body.querySelector(".titleOne").innerHTML = "Результатов нет";
                document.body.querySelector(".innOne").innerHTML = null;
                document.body.querySelector(".addressOne").innerHTML = null;
                hintOne.style.border = "none";
            }

            if(result.suggestions[1]){
                hintTwo.classList.remove("active");
                document.body.querySelector(".titleTwo").innerHTML = result.suggestions[1].value;
                document.body.querySelector(".innTwo").innerHTML = result.suggestions[1].data.inn;
                document.body.querySelector(".addressTwo").innerHTML = result.suggestions[1].data.address.value;
            } else{
                hintTwo.classList.add("active");
            }

            if(result.suggestions[2]){
                hintThree.classList.remove("active");
                document.body.querySelector(".titleThree").innerHTML = result.suggestions[2].value;
                document.body.querySelector(".innThree").innerHTML = result.suggestions[2].data.inn;
                document.body.querySelector(".addressThree").innerHTML = result.suggestions[2].data.address.value;
            } else{
                hintThree.classList.add("active");
            }

            if(result.suggestions[3]){
                hintFour.classList.remove("active");
                document.body.querySelector(".titleFour").innerHTML = result.suggestions[3].value;
                document.body.querySelector(".innFour").innerHTML = result.suggestions[3].data.inn;
                document.body.querySelector(".addressFour").innerHTML = result.suggestions[3].data.address.value;
            } else{
                hintFour.classList.add("active");
            }

            if(result.suggestions[4]){
                hintFive.classList.remove("active");
                document.body.querySelector(".titleFive").innerHTML = result.suggestions[4].value;
                document.body.querySelector(".innFive").innerHTML = result.suggestions[4].data.inn;
                document.body.querySelector(".addressFive").innerHTML = result.suggestions[4].data.address.value;
            } else{
                hintFive.classList.add("active");
            }
    
        })
        .catch(error => console.log("error", error));

    } else {
        document.body.querySelector(".hints").classList.add("active");
    }
}

function clickOnHints(e) {

    let titleHint;

    if(e.target.closest(".hintOne") ){
        let elem = e.target.closest(".hintOne");
        titleHint = elem.querySelector("h4").innerHTML;
    } else if(e.target.closest(".hintTwo") ){
        let elem = e.target.closest(".hintTwo");
        titleHint = elem.querySelector("h4").innerHTML;
    } else if(e.target.closest(".hintThree") ){
        let elem = e.target.closest(".hintThree");
        titleHint = elem.querySelector("h4").innerHTML;
    } else if(e.target.closest(".hintFour") ){
        let elem = e.target.closest(".hintFour");
        titleHint = elem.querySelector("h4").innerHTML;
    } else if(e.target.closest(".hintFive") ){
        let elem = e.target.closest(".hintFive");
        titleHint = elem.querySelector("h4").innerHTML;
    }

    check(titleHint);

    document.body.querySelector(".hints").classList.add("active");

}

hint();

document.body.querySelector(".hints").addEventListener("click", clickOnHints);
