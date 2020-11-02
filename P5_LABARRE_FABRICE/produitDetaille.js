/* Récupération de l'id du produit sélectionné dans la page précédente */
const productId = window.location.search.substr(1); 

const url = `http://localhost:3000/api/cameras/${productId}`;

/* Récupération du produit avec l'id associé depuis le serveur */ 

fetch(url)
    .then((response) => response.json())
    .then(product => {
        displayProduct(product);
    })
    .catch(e => {
        displayError();
        console.log(e);
    });

/* 
    Fonction d'affichage du produit
*/
function displayProduct(product) {

    const productSection = document.querySelector(".product-section");

    productSection.insertAdjacentHTML("afterbegin", `
        <h2>${product.name}</h2>
        <img src="${product.imageUrl}" alt="photo camera" style="width:400px;border: 2px solid black;">
        <p>${product.description}</p>
        <div>Prix: ${(product.price/100).toFixed(2).replace(".",",")}€</div>
        <label for="lense-select">Type de lentille</label>
        <select class="product-section__select" name="" id="lenses-select"></select>
        <button class="addToCart">Ajouter au panier <i class="fas fa-shopping-cart"></i></button> 
        `
    );


    let addToCartBtn = document.querySelector(".addToCart");

    /* Évènement "click" : lance la fonction d'ajout du produit au panier */
    addToCartBtn.addEventListener('click', () => {

        let select = document.querySelector(".product-section__select");
        product.selectedLense = select.options[select.selectedIndex].value;

        addToCart(product);
    })

    let select = document.querySelector(".product-section__select");
    product.lenses.forEach (function (lense) {
        let option = document.createElement("option");
        option.value = lense;
        option.textContent = lense;
        select.appendChild(option);
    })
    
}

/* 
    Ajout du produit au panier. 
    Si le localStorage est vide elle crée un nouveau tableau cartProducts et l'enregistre dans le localStorage
    Sinon elle récupère le tableau du localStorage, ajoute le nouveau produit, et enregistre le nouveau tableau
*/
function addToCart (product) {

    let cartProducts = []

    let saveToCartProduct = {
        _id: product._id,
        imageUrl: product.imageUrl,
        name: product.name,
        price: product.price,
        quantity: 1,
        selectedLense: product.selectedLense
    }

    let newDifferentProduct = true;

    if (localStorage.getItem('cartProducts') === null) {

        cartProducts.push(saveToCartProduct);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }
    else { 
        cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        
        cartProducts.forEach((prod) => {
            if (product._id === prod._id && product.selectedLense === prod.selectedLense) {
                prod.quantity++;
                newDifferentProduct = false;
            }
        })

        if (newDifferentProduct) cartProducts.push(saveToCartProduct);

        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }

    verifPanier();
    alert("le produit a bien été ajouter au panier");
    

}