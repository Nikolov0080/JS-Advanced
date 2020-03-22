let button = document.querySelector('#btnLoadTowns');
let input = document.querySelector('#towns');
let parentDiv = document.querySelector('#root');

button.addEventListener('click', renderFunc);

function renderFunc() {

    if (input.value == '') {

        alert('some cities pls');
        return;
    }

    let cities = input.value.split(',').filter(x => !!x);

    let obj = {
        cities
    }

    fetch('./tmp.hbs')
        .then(x => x.text())
        .then(template => {

            let data = Handlebars.compile(template);
            parentDiv.innerHTML = data(obj);
        })





    // fetch(`https://restcountries.eu/rest/v2/name/united`)
    //     .then(x => x.json())
    //     .then(x => {

    //         let data = []

    //         for (let i = 0; i < x.length; i++) {
    //             data.push(x[i].name)
    //         }

    //         let template = `<ul>
    //   {{#each data}}
    //     <li>{{this}}</li>
    //   {{/each}}
    // </ul>`

    //         let obj = {
    //             data
    //         }

    //         let data1 = Handlebars.compile(template);

    //         parentDiv.innerHTML = data1(obj);


    //     })




}