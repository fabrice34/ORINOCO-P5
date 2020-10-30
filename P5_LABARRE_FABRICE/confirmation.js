/* Récupération des différents éléments dans le localStorage afin de les afficher au chargement de la page */

const confirmation = document.querySelector("#confirmation-section");
const contact = JSON.parse(localStorage.getItem("contact"));
const orderId = JSON.parse(localStorage.getItem("orderId"));
const total = JSON.parse(localStorage.getItem('total'));

confirmation.insertAdjacentHTML("beforeend",`
    <h2>Confirmation de la commande : </h2>
    <ul>
        <li class="confirmation-section__coord">Vos coordonnées : </li>
        <li>Nom : ${contact.lastName}</li>
        <li>Prénom : ${contact.firstName}</li>
        <li>Adresse : ${contact.address}</li>
        <li>Ville : ${contact.city}</li>
        <li>Email : ${contact.email}</li>
    </ul>
    <h3>Total : ${(total/100).toFixed(2).replace(".",",")} €</h3>
    <h3>Numéro de la commande : </br> ${orderId}</h3>
`);

localStorage.removeItem('contact');
localStorage.removeItem('total');
localStorage.removeItem('orderId');