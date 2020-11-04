

const section = document.querySelector("#cart-section");
let total = 0;

displayCart();

/* Affichage du contenu du panier, des boutons de suppression et d'annulation du panier ainsi que du formulaire de contact */
/*affichage contenu du panier */
function displayCart() {

    if (localStorage.getItem('cartProducts') !== null) {
        let products = JSON.parse(localStorage.getItem('cartProducts'));
        total = 0; // Réinitialisation du total à 0

        section.insertAdjacentHTML("afterbegin", `
        <h2>Panier</h2>
            <table class="cart-section__table" style="margin-top:50px;display:flex;flex-direction:column;align-items:center;">
                <thead>
                    <tr>
                        <th>Image</th>              
                        <th>Nom</th>
                        <th>Lense</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody class="cart-section__commande">
                </tbody>
            </table>
         
        `);

        let commande = document.querySelector(".cart-section__commande");

        products.forEach( (product, index) => {
            
            total = total + (product.price * product.quantity);

            
            commande.insertAdjacentHTML("beforeend", `
                <tr>
                    <td><img src="${product.imageUrl}" alt="photo camera" style="width:70px;border: 2px solid black;"></td>
                    <td>${product.name}</td>
                    <td>${product.selectedLense}</td>
                    <td><button class="cart-section__remove product-${index}">-</button>${product.quantity}<button class="cart-section__add product-${index}">+</button></td>
                    <td>${(product.price * product.quantity/100).toFixed(2).replace(".",",")} €</td>
                    <td><button class="cart-section__delete product-${index}">X</button></td>
                </tr>
                
            `);
        })

       
        section.insertAdjacentHTML("beforeend", `
            <div class="total">
            <p class="cart-section__total">Total : ${(total/100).toFixed(2).replace(".",",")} €</p>
            <button class="cart-section__cancelCart">Annuler le panier</button>
            </div>
        `);



/*formulaire de contact pour valider la commande*/
        section.insertAdjacentHTML("beforeend", `
            <div class="formulaire" style="text-align:start;">
            <p class="">Formulaire à remplir pour valider la commande : </p>
            <form class="cart-form" action="post" type="submit">
                <div class="cart-form__group">
                    <label for="firstname">Prénom : </label>
                    <input id="firstname" type="text" placeholder="Votre prénom" maxlength="30" pattern="[A-Za-z]{2,}" required />
                </div>
                <div class="cart-form__group">
                    <label for="name">Nom : </label>
                    <input id="name" type="text" placeholder="Votre nom" maxlength="50" pattern="[A-Za-z]{2,}" required />
                </div>
                <div class="cart-form__group">
                    <label for="address">Adresse  : </label>
                    <input id="address" type="text" placeholder="Votre adresse" maxlength="200" required />
                </div>
                <div class="cart-form__group">
                    <label for="city">Ville : </label>
                    <input id="city" type="text" placeholder="Votre ville" maxlength="30" required />
                </div>
                <div class="cart-form__group">
                    <label for="email">Email : </label>
                    <input id="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}" placeholder="exemple@email.com" maxlength="30" required />
                </div>
                <button id="submit-btn" style="border:2 solid black;border-radius:2rem;padding:2px;margin:10px;background-color:#c20aa3;color:#fff;">Valider le panier</button>
            </form>
            </div>
        `);

      
        const removeOneBtn = document.querySelectorAll(".cart-section__remove");
        removeOneBtn.forEach((btn) => {
            btn.addEventListener('click', e => {
                removeOneProduct(e, products);
            })
        })

        const addOneBtn = document.querySelectorAll(".cart-section__add");
        addOneBtn.forEach((btn) => {
            btn.addEventListener('click', e => {
                addOneProduct(e, products);
            })
        })
        
        const deleteBtn = document.querySelectorAll(".cart-section__delete");
        deleteBtn.forEach((btn) => {
            btn.addEventListener('click', e => {
                deleteProduct(e, products);
            });
        });

        const cancelCartBtn = document.querySelector(".cart-section__cancelCart");
        cancelCartBtn.addEventListener('click', () => {
            cancelCart();
        });
      
        const form = document.querySelector(".cart-form");
        form.addEventListener('submit', e => {
            e.preventDefault();
            submitForm();
        });

    } else {
        section.insertAdjacentHTML("afterbegin", `
            <h2>Panier</h2>
            <p class="cart-section__vide">
                Votre panier est vide ! 
                <br/>
                <a href="./index.html">Revenir à la page d'accueil</a>
            </p>
        `)
    }
}

/* Augmente de 1 la quantité d'un même produit. */
function addOneProduct(e, products) {
    let index = e.target.classList[1].slice(-1);
    products[index].quantity++;
    localStorage.setItem('cartProducts', JSON.stringify(products));
    refreshSectionAndCart();
}

/* Diminue de 1 la quantité d'un même produit. S'il passe à 0 alors le produit est supprimé du panier */
function removeOneProduct(e, products) {
    let index = e.target.classList[1].slice(-1);
    products[index].quantity--;
    
    if (products[index].quantity <= 0) {
        products.splice(index, 1);       
        if (products.length === 0 ) {
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
    let index = e.target.classList[1].slice(-1);
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

    let contact = {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("name").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    };

    let products = [];
    if (localStorage.getItem('cartProducts') !== null) {
        let productObj = JSON.parse(localStorage.getItem('cartProducts'));
        
        productObj.forEach( p => {
            products.push(p._id);
        })
    }

    let contactProducts = JSON.stringify({
        contact, 
        products
    })

    postOrder(contactProducts);
};

/* 
    Requête POST
    Envoi au serveur l'objet contact et le tableau d'id products au format string
    Enregistrement de l'objet contact et l'orderId reçus du serveur, ainsi que le total de la commande sur le localStorage.
    Changement de page -> confirmation.html
*/
function postOrder(contactProducts){

    fetch("http://localhost:3000/api/cameras/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body: contactProducts
    }).then(response => {
        return response.json();
    }).then( r => {
        localStorage.setItem('contact', JSON.stringify(r.contact));
        localStorage.setItem('orderId', JSON.stringify(r.orderId));
        localStorage.setItem('total', JSON.stringify(total));
        localStorage.removeItem('cartProducts');
        window.location.replace("./confirmation.html");
    }).catch((e) => {
        displayError();
        console.log(e);
    })
}