const displayAllProducts = async () => {
    // [products] contient un tableau contenant chaque {produit} sous forme d'objet récuperé lors du fetch
    const products = await getProducts();
    
    // On boucle dans le tableau [products] où {product} représente chaque objet
    for (product of products) {
        // On affiche chaque produit tant qu'il y en a dans le tableau [products]
        displayProductOnIndexPage(product);
    }
    addEventOnClikOnBasketImg();
    displayRedPointWithNumberOfProductsInBasket();
}

// Retourne une promesse dont l'état est "fulfilled" et le résultat est un tableau contenant les produits sous forme d'objet
const getProducts = () => {
    return fetch("http://localhost:3000/api/cameras")
        .then((data) => { return data.json()})
        .then((jsonListProducts) => { return jsonListProducts })
        .catch((error) => { console.log('Une erreur est survenue dans la fonction getProducts() => ' + error); });
}

// On affiche le produit en le passant en paramètre pour accèder à ses propriétés et leurs valeurs
const displayProductOnIndexPage = (product) => {
    let lentilles = "", j = 0;
    while (j < product.lenses.length) {
        lentilles += `<option value="${j}">${product.lenses[j]}</option>`;
        j++
    }

    // On récupère notre section "page-accueil" et on inject le code HTML 
    document.querySelector('.page-accueil')
        .innerHTML += `<article id="${product._id}">
                                <a class="image" href="product.html?id=${product._id}">
                                    <img src="${product.imageUrl}" alt="">
                                </a>
                                <div class="info">
                                    <a href="product.html?id=${product._id}">
                                        <h2>Caméra vintage ${product.name}</h2>
                                        <p>${product.description}</p>
                                    </a>
                                    <form method="" action="">
                                        <label for="lentille">Choisir sa lentille</label>
                                        <select name="lentille" id="lentille" class="lentille">
                                            ${lentilles};
                                        </select>
                                    </form>
                                    <div class="prix-et-panier">
                                        <p class="prix">${product.price} €</p>
                                        <img class="ajout-panier-home" src="../logo/panier-ajouter2.png" alt="">
                                    </div>
                                </div>
                            </article>`;
}

// Crée un événement sur les boutons panier et appelle la fonction d'ajout de produit
const addEventOnClikOnBasketImg = () => {
    let elementsPanierPageAccueil = document.getElementsByClassName('ajout-panier-home');

    for (let i = 0; i < elementsPanierPageAccueil.length; i++) {

        elementsPanierPageAccueil[i].addEventListener('click', (event) => {

            addProductInLocalStorage(getIdProductOnClick());
        });
    }
}

// On appelle la fonction qui affichera tous les produits
// et initilisera les événements pour pouvoir ajouter au panier.
displayAllProducts();






