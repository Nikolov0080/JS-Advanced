import { monkeys } from "./monkeys.js";

(async() => {

    let da = Handlebars.compile(await fetch('./allMonkeys.hbs').then(x => x.text()))

    let result = da({ monkeys })

    document.querySelector('section').innerHTML += result

    let buttons = document.querySelectorAll('button');

    buttons.forEach(b => {
        b.addEventListener('click', toggle);
    });

    function toggle(e) {

        let x = e.target.parentNode.querySelector('p')

        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

})();