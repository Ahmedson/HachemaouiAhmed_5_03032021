const remerciementPageCommande = () => {
    let contactOrderIdProductsObject = JSON.parse(localStorage.getItem('ContactOrderIdProducts'));

    if (contactOrderIdProductsObject) {
        getArrayProductsInLocalStorage();
        let totalPrice = 0;

        for (let produit of produitLocalStorage) {
            totalPrice += produit.price;
        }

        document.querySelector('.recapitulatif-commande')
            .innerHTML = `<div class="resume">
                            <h2>Bonjour ${contactOrderIdProductsObject.contact.firstName}. <br> Merci d'avoir passé commande chez orinoco</h2>
                            <p>Votre commande pour un montant de ${totalPrice}€ a été validé</p><br>
                            <p id="id">Votre identifiant de commande est le : <br><br>
                                ${contactOrderIdProductsObject.orderId}</p>
                            <p>Elle vous sera livré sous 72h à l'adresse suivante : <br><br>
                                ${contactOrderIdProductsObject.contact.address} à ${contactOrderIdProductsObject.contact.city}</p>
                               <br> <p style="text-align: right">L'équipe d'Orinoco</p>
                            
                        </div>`;

        localStorage.clear();

    } else {
        window.location.href = "index.html";
    }
}

remerciementPageCommande();