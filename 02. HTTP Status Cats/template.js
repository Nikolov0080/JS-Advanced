(async() => {

    Handlebars.registerPartial(
        'cat',
        await fetch('./Single_Cat_Temp.hbs').then(x => x.text()));

    const template = Handlebars.compile(await fetch('./all-Cats_Temp.hbs')
        .then(x => x.text()));

    const result = template({ cats })

    document.querySelector('#allCats').innerHTML += result

    let buttonLoad = document.querySelectorAll('.showBtn');

    buttonLoad.forEach(x => {
        x.addEventListener('click', load)

    });

    function load(e) {

        let current = e.target.parentNode.querySelector('div')
        let { display } = e.target.parentNode.querySelector('.status').style

        if (display == 'none') {
            e.target.innerHTML = 'Hide Status Text';
            e.target.parentNode.querySelector('.status').style.display = 'block'
        } else {
            e.target.parentNode.querySelector('.status').style.display = 'none'
            e.target.innerHTML = 'Show status code';
        }
    }
})();