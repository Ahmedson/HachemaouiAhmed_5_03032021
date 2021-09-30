async function displayProductWhoHasBeenClicked() {

    const product = await getProductWhoHasBeenClicked();

    displayProductOnProductPage(product);
    addEventOnClikOnDivAddOnBasket(product._id);
    displayRedPointWithNumberOfProductsInBasket();
}

// **********************************************************************************************

function getProductWhoHasBeenClicked() {
    // window.location renvoie un objet location contenant des informations sur L'URL actuelle
    // search est une propriété qui retourne la partie de l'URL qui suit le symbole « ? », avec ce symbole inclus.

    //L’interface URLSearchParams définit des méthodes utilitaires pour travailler 
    // avec la chaîne de requête (les paramètres GET) d’une URL.
    // URLSearchParams.get() : Retourne la première valeur associée au paramètre de recherche donné.

    // EXEMPLE EN 3 LIGNES
    // const queryString_url_id = window.location.search;
    // const urlSearchParams = new URLSearchParams(queryString_url_id);
    // const id = urlSearchParams.get('id');

    // En une ligne
    const id = new URLSearchParams(window.location.search).get('id');

    return getProduct(id);
}

// **********************************************************************************************

// On affiche le produit en le passant en paramètre pour accèder à ses propriétés et leurs valeurs
function displayProductOnProductPage(article) {

    document.querySelector('.page-produit')
        .innerHTML = `<article id="${article._id}">
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
}

// **********************************************************************************************

// Crée un événement sur la div ajouter au panier et appelle la fonction d'ajout de produit
function addEventOnClikOnDivAddOnBasket(id) {
    let elementPanierPageProduit = document.getElementById('panier');

    elementPanierPageProduit.onselectstart = new Function("return false");

    elementPanierPageProduit.addEventListener('click', () => {

        addProductInLocalStorage(id);
    });
}

// **********************************************************************************************

displayProductWhoHasBeenClicked();