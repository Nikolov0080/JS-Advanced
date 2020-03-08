function solve() {
   "use strict"
   let productInfo = document.querySelectorAll('#add-new > input');
   let avbProducts = document.querySelector('#products > ul');
   let addButton = document.querySelector('#add-new > button');
   //
   let filterButton = document.querySelector('.filter > button');
   let filterText = document.querySelector('.filter > input');
   //
   let totalPrice = document.querySelector("body > h1:nth-child(4)");
   //
   let addItemButtons = document.querySelector("#products > ul");
   //
   let myProducts = document.querySelector('#myProducts > ul');
   //
   let buyButton = document.querySelector('#myProducts > button');
   //




   let _input = {
      name: productInfo[0],
      quantity: productInfo[1],
      price: productInfo[2]
   }

   // Listeners for buttons.
   //
   addItemButtons.addEventListener('click', addItemFunc);
   //
   addButton.addEventListener('click', addFunc);
   //
   filterButton.addEventListener('click', filterFunc);
   //
   buyButton.addEventListener('click', buyFunc);
   //


   let priceCounter = 0;

   function buyFunc(e) {
      this.parentNode.children[1].innerHTML = '';
      totalPrice.innerText = 'Total Price: 0.00'
   }

   function addItemFunc(e) {
      if (e.target.innerText === "Add to Client's List") {
         let number = e.target
            .parentNode
            .parentNode
            .children[1]
            .innerText
            .split(': ')[1];

         number -= 1;

         if (number == 0 || !number) {
            e.target.parentNode.parentNode.outerHTML = '';
            // return
         }
         e.target.parentNode.parentNode.children[1].innerText = `Available: ${number}`

         let product = createElement('li');
         let price = createElement('strong');

         price.innerText = e.target.parentNode.firstChild.innerText;
         product.innerText = e.target.parentNode.parentNode.firstChild.innerText;

         let forUpdateTotalPrice = Number(e.target.parentNode.firstChild.innerText)
            .toFixed(2);

         priceCounter += +forUpdateTotalPrice;


         totalPrice.innerText = `Total Price: ${priceCounter.toFixed(2)}`



         addChild([price], product);
         addChild([product], myProducts);

      }

   }

   function filterFunc(e) {
      let toFilter = document.querySelectorAll("#products > ul > li > span");

      toFilter.forEach(x => {
         let textF = x.innerText;
         let textI = filterText.value;

         if (textI.toString().toLowerCase().includes(textF.toString().toLowerCase())) {
            x.parentNode.style.display = 'block'
         }

         if (!(textF.toLowerCase().match(textI.toLowerCase()))) {
            x.parentNode.style.display = 'none'
         }

      });
   }

   function addFunc(e) {
      e.preventDefault();

      let productLI = createElement('li');
      let nameSpan = createElement('span');
      let quantityStrong = createElement('strong');

      let parDiv = createElement('div');

      let priceStrong = createElement('strong');
      let buttonAddToList = createElement('button');

      nameSpan.innerText = _input.name.value;
      quantityStrong.innerText = 'Available: ' + _input.quantity.value;
      priceStrong.innerText = Number(_input.price.value).toFixed(2);
      buttonAddToList.innerText = "Add to Client's List";

      addChild([priceStrong, buttonAddToList], parDiv);
      addChild([nameSpan, quantityStrong, parDiv], productLI);
      addChild([productLI], avbProducts);

   }

   function createElement(tag, id, cls) {

      let element = document.createElement(tag);

      if (id) {
         element.id = id;
      }

      if (cls) {
         element.classList.add(cls);
      }

      return element;
   }

   function addChild(children, parent) {

      children.forEach(child => {
         parent.appendChild(child);
      });

      return parent;
   }

}