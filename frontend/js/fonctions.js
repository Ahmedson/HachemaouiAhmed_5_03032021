const getBtnDeleteBasket = () => document.getElementById('delete-basket');

const getArrayProductsInLocalStorage = () => produitLocalStorage = JSON.parse(localStorage.getItem('products'));

const getSpanRedPointForCount = () => document.getElementById('nombre-produit-dans-panier');

const getIdProductOnClick = () => idClicked = event.currentTarget.parentNode.parentNode.parentNode.id;

const getTheArticle = () => event.currentTarget.parentNode.parentNode.parentNode;

const getSectionForm = () => document.querySelector('.section-form');

const getBtnValidation = () => document.getElementById('validation');

const getDivInSectionResume = () => document.querySelector('.total-prix-articles');

const maskSectionFormAndDisplayDeleteBtn = () => {
    getSectionForm().style.display = 'none';
    getBtnDeleteBasket().style.display = 'block';
}

// **********************************************************************************************

const getProduct = (id) => {

    return fetch(`http://localhost:3000/api/cameras/${id}`)
        .then((data) => { return data.json() })
        .then(article => { return article })
        .catch(function (error) { console.log('Une erreur est survenue dans le fonction getProduct() => ' + error); });
}

// **********************************************************************************************

// Affiche le nombre d'article dans le panier dans un point rouge
function displayRedPointWithNumberOfProductsInBasket() {

    // Variable qui va contenir le nombre total d'articles dans le panier
    let totalArticle = 0;

    // S'il y a un élément span et au moins un produit dans le localStorage
    if (getSpanRedPointForCount() && getArrayProductsInLocalStorage()) {
        // On rend visible le span en lui ajoutant une classe
        getSpanRedPointForCount().classList.add('visible');

        // On boucle dans le tableau des produits
        for (let i = 0; i < getArrayProductsInLocalStorage().length; i++) {
            // À chaque tour de boucle on ajoute le nombre de produits dans notre variable,
            totalArticle += produitLocalStorage[i].quantity;
        }

        // On injecte le contenu de la variable totalArticle dans le span
        getSpanRedPointForCount().textContent = totalArticle;

    } else {
        // Sinon on retire la classe "visible"
        getSpanRedPointForCount().classList.remove('visible');
    }
}

// **********************************************************************************************

// Ajoute un produit dans le panier à partir de la page index.html et product.html
async function addProductInLocalStorage(id) {

    let notInTheLocalStorage = true;
    let article = await getProduct(id);

    // S'il n'y a pas de produit dans le localStorage
    if (!getArrayProductsInLocalStorage()) {
        // On crée un tableau
        let produitLocalStorage = [];
        // On push un objet contenant l'id, la quantité (1) et le prix
        produitLocalStorage.push({ id: article._id, quantity: 1, price: article.price });
        // On set le localStorage
        localStorage.setItem('products', JSON.stringify(produitLocalStorage));

        // S'il y a au moins un produit dans le localStorage
    } else if (getArrayProductsInLocalStorage()) {
        // On boucle dans le tableau des produits
        for (let i = 0; i < getArrayProductsInLocalStorage().length; i++) {
            // S'il y a un produit qui a le même id que le produit cliqué
            if (produitLocalStorage[i].id === id) {
                // On ajoute 1 à la quantité
                produitLocalStorage[i].quantity += 1;
                // On calcul le prix total de ce même article
                produitLocalStorage[i].price = article.price * produitLocalStorage[i].quantity;
                // On set le localStorage
                localStorage.setItem('products', JSON.stringify(produitLocalStorage));
                // On change la variable pour que la prochaine condition soit fausse
                notInTheLocalStorage = false;
            }
        }
        // Si le produit ne se trouve pas dans le tableau des produits
        if (notInTheLocalStorage) {
            // On push un objet contenant l'id, la quantité (1) et le prix
            produitLocalStorage.push({ id: article._id, quantity: 1, price: article.price });
            // On set le localStorage
            localStorage.setItem('products', JSON.stringify(produitLocalStorage));
        }
    }
    // alert('Votre article a bien été ajouté au panier.');
    displayRedPointWithNumberOfProductsInBasket();
}

// **********************************************************************************************

// Récupère le bouton pour y rajouter un lien vers la page home
// Affiche un texte (en paramètre) dans la section-panier selon que le panier est
// vide, vidé d'un coup ou vidé par suppression des articles
function modifyTextSectionBasketAndBtnDeleteBasketWhenBasketIsEmpty(text) {

    let sectionPanier = document.querySelector('.page-panier');

    sectionPanier.innerHTML = `<p>${text}<p>`;
    sectionPanier.classList.add('panier-supprimer');

    getBtnDeleteBasket().innerHTML = '<a href="index.html" class="retourBoutique">Retourner à la boutique</a>';
    displayRedPointWithNumberOfProductsInBasket();
}

// **********************************************************************************************

function onClickOnBtnValidationDisplaySectionFormAndRemoveBtnDeleteBasketAndBtnValidation() {

    getBtnValidation().addEventListener('click', () => {

        getBtnDeleteBasket().style.display = 'none';
        getSectionForm().style.display = 'flex';
        getBtnValidation().style.display = 'none';
    })
}

// **********************************************************************************************