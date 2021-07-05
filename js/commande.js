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
                            <p id="id">Votre identifiant de commande est le : <br><br>
                                ${contactOrderIdProductsObject.orderId}</p>
                            <p>Le prix total de vos articles est de ${totalPrice} €</p>
                        </div>`;

        // let return_links = document.querySelectorAll('.return');
        
        // for(return_link of return_links){
        //     return_link.addEventListener('click', () => {
        //         localStorage.removeItem('products');
        //         localStorage.removeItem('ContactOrderIdProducts');
        //     })
        // }
        
        localStorage.clear();

    } else {
        window.location.href = "index.html";
    }
}

remerciementPageCommande();