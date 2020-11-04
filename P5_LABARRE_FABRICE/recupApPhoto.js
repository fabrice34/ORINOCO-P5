const url = "http://localhost:3000/api/cameras"

/* Permet de récupérer les produits depuis le serveur  */ 

fetch(url)
    .then((response) => response.json())
    .then(products => {
        console.log(products)
        displayAllProducts(products);
    })
    .catch(e => displayError());

    /* 
    Affichage de tous les produits sous forme de liste 
    À l'aide de la balise <a> : envoi de l'id du produit sélectionné vers la page produit.html
    */
function displayAllProducts(products) {

    const productList = document.getElementById("productList"); 

    products.forEach( product => {

        productList.insertAdjacentHTML("beforeend",`
            <li class="product" style= "border: 2px solid black; border-radius:4px; list-style: none;box-shadow: 0px 6px 6px black; margin : 100px 250px 100px 250px;padding-bottom:30px;" >
                <h2 class="product__name">${product.name}</h2>
                <img class="product__img" src="${product.imageUrl}" alt="photo camera" style= "width:300px;border:2px solid black;border-radius:5px;">
                <div class="product__price" style="color: rgb(161, 24, 14);margin-bottom:10px;">${(product.price/100).toFixed(2).replace(".",",")}€</div>
                <a class="product__btn" href="./produit.html?${product._id}" style= "border: 2px solid #000103;border-radius:1rem;padding:5px;text-decoration:none;color:#000103;background-color:#c20aa3;">Plus de détails</a>
            </li>
            `
        )
    })
}