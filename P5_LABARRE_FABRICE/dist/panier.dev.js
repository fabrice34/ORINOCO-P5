"use strict";

var section = document.querySelector("#cart-section");
var total = 0;
displayCart();
/* Affichage du contenu du panier, des boutons de suppression et d'annulation du panier ainsi que du formulaire de contact */

/*affichage contenu du panier */

function displayCart() {
  if (localStorage.getItem('cartProducts') !== null) {
    var products = JSON.parse(localStorage.getItem('cartProducts'));
    total = 0; // Réinitialisation du total à 0

    section.insertAdjacentHTML("afterbegin", "\n        <h2>Panier</h2>\n            <table class=\"cart-section__table\" style=\"margin-top:50px;display:flex;flex-direction:column;align-items:center;\">\n                <thead>\n                    <tr>\n                        <th>Image</th>              \n                        <th>D\xE9signation</th>\n                        <th>Lense</th>\n                        <th>Quantit\xE9</th>\n                        <th>Prix</th>\n                        <th>Supprimer</th>\n                    </tr>\n                </thead>\n                <tbody class=\"cart-section__commande\">\n                </tbody>\n            </table>\n         \n        ");
    var commande = document.querySelector(".cart-section__commande");
    products.forEach(function (product, index) {
      total = total + product.price * product.quantity;
      commande.insertAdjacentHTML("beforeend", "\n                <tr>\n                    <td><img src=\"".concat(product.imageUrl, "\" alt=\"photo camera\" style=\"width:70px;border: 2px solid black;\"></td>\n                    <td>").concat(product.name, "</td>\n                    <td>").concat(product.selectedLense, "</td>\n                    <td><button class=\"cart-section__remove product-").concat(index, "\">-</button>").concat(product.quantity, "<button class=\"cart-section__add product-").concat(index, "\">+</button></td>\n                    <td>").concat((product.price * product.quantity / 100).toFixed(2).replace(".", ","), " \u20AC</td>\n                    <td><button class=\"cart-section__delete product-").concat(index, "\">X</button></td>\n                </tr>\n                \n            "));
    });
    section.insertAdjacentHTML("beforeend", "\n            <div class=\"total\">\n            <p class=\"cart-section__total\">Total : ".concat((total / 100).toFixed(2).replace(".", ","), " \u20AC</p>\n            <button class=\"cart-section__cancelCart\">Annuler le panier</button>\n            </div>\n        "));
    /*formulaire de contact pour valider la commande*/

    section.insertAdjacentHTML("beforeend", "\n            <div class=\"formulaire\" style=\"text-align:start;\">\n            <p class=\"\">Formulaire \xE0 remplir pour valider la commande : </p>\n            <form class=\"cart-form\" action=\"post\" type=\"submit\">\n                <div class=\"cart-form__group\">\n                    <label for=\"firstname\">Pr\xE9nom : </label>\n                    <input id=\"firstname\" type=\"text\" placeholder=\"Votre pr\xE9nom\" maxlength=\"30\" pattern=\"[A-Za-z]{2,}\" required />\n                </div>\n                <div class=\"cart-form__group\">\n                    <label for=\"name\">Nom : </label>\n                    <input id=\"name\" type=\"text\" placeholder=\"Votre nom\" maxlength=\"50\" pattern=\"[A-Za-z]{2,}\" required />\n                </div>\n                <div class=\"cart-form__group\">\n                    <label for=\"address\">Adresse  : </label>\n                    <input id=\"address\" type=\"text\" placeholder=\"Votre adresse\" maxlength=\"200\" required />\n                </div>\n                <div class=\"cart-form__group\">\n                    <label for=\"city\">Ville : </label>\n                    <input id=\"city\" type=\"text\" placeholder=\"Votre ville\" maxlength=\"30\" required />\n                </div>\n                <div class=\"cart-form__group\">\n                    <label for=\"email\">Email : </label>\n                    <input id=\"email\" type=\"email\" pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}\" placeholder=\"exemple@email.com\" maxlength=\"30\" required />\n                </div>\n                <button id=\"submit-btn\" style=\"border:2 solid black;border-radius:2rem;padding:2px;margin:10px;background-color:#c20aa3;color:#fff;\">Valider le panier</button>\n            </form>\n            </div>\n        ");
    var removeOneBtn = document.querySelectorAll(".cart-section__remove");
    removeOneBtn.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        removeOneProduct(e, products);
      });
    });
    var addOneBtn = document.querySelectorAll(".cart-section__add");
    addOneBtn.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        addOneProduct(e, products);
      });
    });
    var deleteBtn = document.querySelectorAll(".cart-section__delete");
    deleteBtn.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        deleteProduct(e, products);
      });
    });
    var cancelCartBtn = document.querySelector(".cart-section__cancelCart");
    cancelCartBtn.addEventListener('click', function () {
      cancelCart();
    });
    var form = document.querySelector(".cart-form");
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitForm();
    });
  } else {
    section.insertAdjacentHTML("afterbegin", "\n            <h2>Panier</h2>\n            <p class=\"cart-section__vide\">\n                Votre panier est vide ! \n                <br/>\n                <a href=\"./index.html\">Revenir \xE0 la page d'accueil</a>\n            </p>\n        ");
  }
}
/* Augmente de 1 la quantité d'un même produit. */


function addOneProduct(e, products) {
  var index = e.target.classList[1].slice(-1);
  products[index].quantity++;
  localStorage.setItem('cartProducts', JSON.stringify(products));
  refreshSectionAndCart();
}
/* Diminue de 1 la quantité d'un même produit. S'il passe à 0 alors le produit est supprimé du panier */


function removeOneProduct(e, products) {
  var index = e.target.classList[1].slice(-1);
  products[index].quantity--;

  if (products[index].quantity <= 0) {
    products.splice(index, 1);

    if (products.length === 0) {
      localStorage.removeItem('cartProducts');
    } else {
      localStorage.setItem('cartProducts', JSON.stringify(products));
    }
  } else {
    localStorage.setItem('cartProducts', JSON.stringify(products));
  }

  refreshSectionAndCart();
}
/* 
    Permet de supprimer le produit sélectionné. 
    On récupère l'index correspondant grâce au dernier caractère du nom de la classe.
    On se sert ensuite de cet index pour supprimer le bon produit dans le tableau products du localStorage
 */


function deleteProduct(e, products) {
  var index = e.target.classList[1].slice(-1);
  products.splice(index, 1);
  localStorage.setItem('cartProducts', JSON.stringify(products));

  if (products.length === 0) {
    localStorage.removeItem('cartProducts');
  }

  refreshSectionAndCart();
}
/* Annulation de tout le panier */


function cancelCart() {
  localStorage.removeItem('cartProducts');
  refreshSectionAndCart();
}
/* Réinitialise la section "cart-section" ainsi que le nombre de produits du panier (header) */


function refreshSectionAndCart() {
  section.innerHTML = "";
  displayCart();
  verifPanier();
}
/* 
    Récupération des valeurs de l'input dans l'objet contact
    Récupération des id des produits du panier dans le tableau products
    L'objet contact et le tableau products sont formattés en string avant d'être envoyé dans la fonction postOrder
*/


function submitForm() {
  var contact = {
    firstName: document.getElementById("firstname").value,
    lastName: document.getElementById("name").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value
  };
  var products = [];

  if (localStorage.getItem('cartProducts') !== null) {
    var productObj = JSON.parse(localStorage.getItem('cartProducts'));
    productObj.forEach(function (p) {
      products.push(p._id);
    });
  }

  var contactProducts = JSON.stringify({
    contact: contact,
    products: products
  });
  postOrder(contactProducts);
}

;
/* 
    Requête POST
    Envoi au serveur l'objet contact et le tableau d'id products au format string
    Enregistrement de l'objet contact et l'orderId reçus du serveur, ainsi que le total de la commande sur le localStorage.
    Changement de page -> confirmation.html
*/

function postOrder(contactProducts) {
  fetch("http://localhost:3000/api/cameras/order", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: contactProducts
  }).then(function (response) {
    return response.json();
  }).then(function (r) {
    localStorage.setItem('contact', JSON.stringify(r.contact));
    localStorage.setItem('orderId', JSON.stringify(r.orderId));
    localStorage.setItem('total', JSON.stringify(total));
    localStorage.removeItem('cartProducts');
    window.location.replace("./confirmation.html");
  })["catch"](function (e) {
    displayError();
    console.log(e);
  });
}