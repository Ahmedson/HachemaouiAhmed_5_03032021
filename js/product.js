const displayProductWhoHasBeenClicked = () => {

    // window.location renvoie un objet location contenant des informations sur L'URL actuelle
    // search est une propriété qui retourne la partie de l'URL qui suit le symbole « ? », avec ce symbole inclus.

    // The URLSearchParams() constructor creates and returns a new URLSearchParams object.
    // The get() method of the URLSearchParams interface returns the first value associated 
    // to the given search parameter.  URLSearchParams.get('id') 


    // EXEMPLE EN 3 LIGNES
    // const quertString_url_id = window.location.search;
    // const urlSearchParams = new URLSearchParams(quertString_url_id);
    // const id = urlSearchParams.get('id');



    // EXEMPLE EN 1 LIGNE
    const id = new URLSearchParams(window.location.search).get('id');

    // ON PASSE L'ID DANS LA REQUÊTE
    fetch(`http://localhost:3000/api/cameras/${id}`)
        .then(data => data.json())
        // ON RÉCUPÈRE L'OBJET EXPLOITABLE 
        .then(article => {
            // ON INJECTE LE CONTENU DYNAMIQUE GRÂCE AU PROPRIÉTÉ QUI RÉCUPÈRE LES VALEUR DE L'OBJET

            document.querySelector('.page-produit')
                .innerHTML += `<article id="${article._id}">
                                <div class="image">
                                    <img src="${article.imageUrl}" alt="">
                                </div>
                                <div class="info-panier">
                                    <div class="info">
                                        <h2>Caméra vintage ${article.name}</h2>
                                        <p><small>Référence : ${article._id}</small></p>
                                        <p>${article.description}</p>
                                        <p class="prix">${article.price} €</p>
                                        <form method="get" action="traitement.php">
                                            <label for="lentille">Choisir sa lentille</label>
                                            <select name="lentille" id="lentille">
                                        
                                            </select>
                                        </form>
                                    </div>
                                    <div>
                                        <div id="panier" class="panier">
                                            <p>Ajouter au panier</p>
                                            <img src="../logo/panier-ajouter.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </article>`;

            // Injection des options de la liste déroulantes pour les lentilles via boucles for
            for (let i = 0; i < article.lenses.length; i++) {
                document.querySelector('#lentille')
                    .innerHTML += `<option value="${i}">${article.lenses[i]}</option>`;
            }

            let elementPanierPageProduit = document.getElementById('panier');

            elementPanierPageProduit.onselectstart = new Function("return false");

            elementPanierPageProduit.addEventListener('click', (event) => {

                let id = event.currentTarget.parentNode.parentNode.parentNode.id;
                addProductInLocalStorage(id);

            });
        })
        .catch(function (error) {
            alert('Une erreur est survenue sur la page product.js : ' + error);
        });
}

displayProductWhoHasBeenClicked();
displayRedPointWithNumberOfProductsInBasket();