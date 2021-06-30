
if (localStorage.length > 0) {
    document.querySelector('.page-panier').classList.remove('panier-vide');
    document.querySelector('.page-panier').innerHTML = "";

    if (getArrayProductsInLocalStorage()) {
        for (let i = 0; i < getArrayProductsInLocalStorage().length; i++) {

            let id = getArrayProductsInLocalStorage()[i].id;

            fetch(`http://localhost:3000/api/cameras/${id}`)
                .then(data => data.json())
                // ON RÉCUPÈRE L'OBJET EXPLOITABLE 
                .then(article => {

                    let lentilles = "", j = 0;
                    while (j < article.lenses.length) {
                        lentilles += `<option value="${j}">${article.lenses[j]}</option>`;
                        j++
                    }

                    document.querySelector('.page-panier')
                        .innerHTML += `<article id="${article._id}">
                                    <div class="image">
                                        <img src="${article.imageUrl}" alt="">
                                    </div>
                                        <div class="info-panier">
                                            <div class="info">
                                            <h2>Caméra vintage ${article.name}</h2>
                                            <form method="get" action="traitement.php">
                                                <label for="lentille">Choisir sa lentille</label>
                                                <select name="lentille" class="lentille">
                                                        ${lentilles};                           
                                                </select>
                                            </form>
                                            <p class="prix">${article.price * getArrayProductsInLocalStorage()[i].quantity} €</p>
                                        </div>
                                        <div id="panier" class="panier">
                                            <span class="retirer-un"> - </span>
                                            <div >Quantité : ${getArrayProductsInLocalStorage()[i].quantity} </div>
                                            <span class="ajouter-un"> + </span>
                                        <div>
                                    </div>
                                </article>`;

                    let boutonsAjouterUn = document.querySelectorAll('.ajouter-un');

                    for (let k = 0; k < boutonsAjouterUn.length; k++) {

                        boutonsAjouterUn[k].addEventListener('click', () => {

                            addProductInBasket();
                            displayTotalCommande();
                        })
                    }

                    let boutonsRetirerUn = document.querySelectorAll('.retirer-un');

                    for (let l = 0; l < boutonsRetirerUn.length; l++) {

                        boutonsRetirerUn[l].addEventListener('click', () => {

                            removeProductInBasket();
                            displayTotalCommande();

                            
                        })
                    }
                })
                .catch(function (error) {
                    alert('Une erreur est survenue : ' + error);
                })
        }
    }
    affichagePointRouge();
    displayTotalCommande();
    supprimerTotalitePanier();
    


} else {

    panierVide('Votre panier est vide');

}

// displayTotalCommande();
testFormulaireComplet();


// ajouterUn();




