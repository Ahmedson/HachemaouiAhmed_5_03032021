function remerciementPageCommande() {
    // On récupère l'objet renvoyée par le serveur et stocké dans le localStorage
    let contactOrderIdProductsObject = JSON.parse(localStorage.getItem('ContactOrderIdProducts'));

    if (contactOrderIdProductsObject) {
        getArrayProductsInLocalStorage();
        let totalPrice = 0;
        // On boucle dans le tableau pour récuperer le prix total pour chaque article
        for (let produit of produitLocalStorage) {
            // On additione à chaque tour de boucle
            totalPrice += produit.price;
        }
        // On récupère l'élément dans lequel on injecte notre code HTML avec les valeurs correspondante
        document.querySelector('.recapitulatif-commande')
            .innerHTML = `<div class="resume">
                            <h2>Bonjour ${contactOrderIdProductsObject.contact.firstName}. <br> Merci d'avoir passé commande chez orinoco.</h2>
                            <p>Votre commande pour un montant de ${totalPrice}€ a été validé</p><br>
                            <p id="id">Votre identifiant de commande est le : <br><br>
                                ${contactOrderIdProductsObject.orderId}</p>
                            <p>Elle vous sera livré sous 72h à l'adresse suivante : <br><br>
                                ${contactOrderIdProductsObject.contact.address} à ${contactOrderIdProductsObject.contact.city}</p>
                               <br> <p style="text-align: right">L'équipe d'Orinoco</p>      
                         </div>`;

        localStorage.clear();
    } else {
        // Si le localStorage ne contient pas d'informations sur le client alors on redirige vers index.html
        window.location.href = "index.html";
    }
}

remerciementPageCommande();