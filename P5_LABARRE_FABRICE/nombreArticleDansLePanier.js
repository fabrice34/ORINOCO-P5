let cart = document.querySelector(".cart");

verifPanier();

/* Vérifie s'il y a un produit dans le panier, notamment au chargement chaque page. Affiche le nombre de produits dans le panier. Affiche 0 s'il n'y en a pas */
function verifPanier() {
    console.log("verifPanier");
    div = document.querySelector(".cart__nb")
    let nb = 0;

    if (localStorage.getItem('cartProducts') !== null) {
        let cp = JSON.parse(localStorage.getItem("cartProducts"));
        
        cp.forEach((prod) => {
            nb = nb + prod.quantity;
        });
    } 
    div.textContent = nb;
    console.log("produit ajouter")
}


/* Affichage d'un message d'erreur si la connexion n'a pas pu se faire correctement avec le serveur */
function displayError() {
    const section = document.querySelector(".pL");
   
    section.insertAdjacentHTML("beforeend", `
        <p class="section__error">Suite à un problème technique nous ne pouvons afficher correctement la page. </br> Rééssayer plus tard.</p>
    `);

}