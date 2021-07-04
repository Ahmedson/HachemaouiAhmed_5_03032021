const getBtnDeleteBasket = () => {
    return document.getElementById('delete-basket');
}

const getArrayProductsInLocalStorage = () => {
    return produitLocalStorage = JSON.parse(localStorage.getItem('products'));
}

const getSpanRedPointForCount = () => {
    return document.getElementById('nombre-produit-dans-panier');
}

let getIdProductOnClick = () => {
    return id = event.currentTarget.parentNode.parentNode.parentNode.id;
}

const getTheArticle = () => {
    return event.currentTarget.parentNode.parentNode.parentNode;
}

const getSectionForm = () => {
    return document.querySelector('.section-form');
}

const getBtnValidation = () => {
    return document.getElementById('validation');
}

const getDivInSectionResume = () => {
    return document.querySelector('.total-prix-articles');
}

const maskSectionCommandAndDisplayDeleteBtn = () => {
    getSectionForm().style.display = 'none';
    getBtnDeleteBasket().style.display = 'block';
}

// **********************************************************************************************

// Affiche le nombre d'article dans le panier dans un point rouge
const displayRedPointWithNumberOfProductsInBasket = () => {

    // Variable qui va contenir le nombre total d'articles dans le panier
    let totalArticle = 0;

    // S'il y a un élément span et au moins un produit dans le localStorage
    if (getSpanRedPointForCount() && getArrayProductsInLocalStorage()) {

        // On boucle dans le tableau des produits
        for (let i = 0; i < getArrayProductsInLocalStorage().length; i++) {

            // À chaque tour de boucle on ajoute le nombre de produits dans notre variable,
            totalArticle += produitLocalStorage[i].quantity;
            // On rend visible le span en lui ajoutant une classe
            getSpanRedPointForCount().classList.add('visible');
            // On injecte le contenu de la variable totalArticle dans le span
            getSpanRedPointForCount().textContent = totalArticle;
        }

    } else {
        // Sinon on retire la classe "visible"
        getSpanRedPointForCount().classList.remove('visible');
    }
}

// **********************************************************************************************

// Affiche un résumé de la commande
const displayTotalCommande = () => {
    let totalPrice = 0;
    let totalArticles = 0;
    let produitLocalStorage = getArrayProductsInLocalStorage();

    // Si il y a au moins un produit dans le localStorage
    if (produitLocalStorage) {

        // On boucle dans le tableau des produits
        for (let i = 0; i < produitLocalStorage.length; i++) {

            // On fait un appel api en lui passant l'id de l'objet
            fetch(`http://localhost:3000/api/cameras/${produitLocalStorage[i].id}`)
                .then(data => data.json())
                // On récupère l'objet 
                .then(article => {

                    // À chaque tour de boucle on ajoute le prix de l'article selon sa quantité
                    totalPrice += (article.price * produitLocalStorage[i].quantity);
                    // et la quantité de chaque article
                    totalArticles += produitLocalStorage[i].quantity;

                    // On récupère la section qui va contenir le récapitulatif
                    let sectionResume = document.getElementById('resume');

                    // S'il n'y a qu'un article on affiche du texte au singulier
                    if (totalArticles === 1) {
                        sectionResume.innerHTML = `<div class="total-prix-articles">
                                                    <h2>Résumé du contenu de votre panier</h2>
                                                    <p>Nombre d'article au panier : ${totalArticles}</p>
                                                    <p>Prix de l'article : ${totalPrice} €</p>
                                                    <a href="#commande"><button id="validation" type="button">Valider la commande</button></a>
                                                </div>`;
                    } else {
                        // Sinon au pluriel
                        sectionResume.innerHTML = `<div class="total-prix-articles">
                                                    <h2>Résumé du contenu de votre panier</h2>
                                                    <p>Nombre d'articles au panier : ${totalArticles}</p>
                                                    <p>Prix total des articles : ${totalPrice} €</p>
                                                    <a href="#commande"><button id="validation" type="button">Valider la commande</button></a>
                                                </div>`;
                    }
                    // On change le texte du bouton "retourner à la boutique" en supprimant le lien
                    getBtnDeleteBasket().innerHTML = "Vider le panier";
                    // On change la couleur du texte
                    getBtnDeleteBasket().style.color = "black";
                    onClickOnBtnValidationDisplaySectionFormAndRemoveBtnDeleteBasketAndBtnValidation();

                    // S'il n'y a plus de produits dans le localStorage
                    if (!getArrayProductsInLocalStorage()) {

                        // Supprimer la section récapitulatif de la commande
                        getDivInSectionResume().remove();
                        modifyTextSectionBasketAndBtnDeleteBasketWhenBasketIsEmpty("Vous n'avez plus d'article au panier");
                    }
                })
                .catch(function (error) {
                    alert('Une erreur est survenue dans la fonction displayTotalCommande()' + error);
                });
        }
    }
}

// **********************************************************************************************

// Ajoute un produit dans le panier à partir de la page index.html et product.html
const addProductInLocalStorage = (id) => {

    let notInTheLocalStorage = true;

    // On fait un appel api en lui passant l'id de l'objet
    fetch(`http://localhost:3000/api/cameras/${id}`)
        .then(data => data.json())
        // On récupère l'objet 
        .then(article => {

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
        })
        .catch(function (error) {
            alert('Une erreur est survenue dans la fonction addProductInLocalStorage() ' + error);
        });
}

// **********************************************************************************************

// Ajoute un produit à partir de la page product.html
const addProductInBasket = () => {
    let divQuantity = event.currentTarget.previousElementSibling;
    let pPrice = event.currentTarget.parentNode.previousElementSibling.lastElementChild;

    // On boucle dans le tableau des produits
    for (let i = 0; i < getArrayProductsInLocalStorage().length; i++) {

        // Dès qu'un produit possède le même id que celui cliqué
        if (produitLocalStorage[i].id === getIdProductOnClick()) {

            // On fait un appel api en lui passant l'id de l'objet
            fetch(`http://localhost:3000/api/cameras/${produitLocalStorage[i].id}`)
                .then(data => data.json())
                // On récupère l'objet 
                .then(article => {

                    // On lui ajoute 1 dans le localStorage
                    produitLocalStorage[i].quantity += 1;
                    // On recalcul le prix total en fonction de la quantité
                    produitLocalStorage[i].price = (article.price * produitLocalStorage[i].quantity);
                    // On modifie le quantité et le prix à travers le DOM
                    divQuantity.innerHTML = `Quantité : ${produitLocalStorage[i].quantity}`;
                    pPrice.innerHTML = `${produitLocalStorage[i].price} €`;
                    // On set le localStorage
                    localStorage.setItem('products', JSON.stringify(produitLocalStorage));
                    displayRedPointWithNumberOfProductsInBasket();
                    maskSectionCommandAndDisplayDeleteBtn();

                })
                .catch(function (error) {
                    alert('Une erreur est survenue dans la fonction addProductInBasket() ' + error);
                });
        }
    }
}

// **********************************************************************************************

// Retire un produit à partir de la page product.html
const removeProductInBasket = () => {
    let divQuantity = event.currentTarget.nextElementSibling;
    let pPrice = event.currentTarget.parentNode.previousElementSibling.lastElementChild;
    let product = getTheArticle();

    // On boucle dans le tableau des produits
    for (let i = 0; i < getArrayProductsInLocalStorage().length; i++) {

        // Dès qu'un produit possède le même id que celui cliqué
        if (produitLocalStorage[i].id === getIdProductOnClick()) {

            // On fait un appel api en lui passant l'id de l'objet
            fetch(`http://localhost:3000/api/cameras/${produitLocalStorage[i].id}`)
                .then(data => data.json())
                // On récupère l'objet 
                .then(article => {

                    // On lui ajoute 1 dans le localStorage
                    produitLocalStorage[i].quantity -= 1;
                    // On recalcul le prix total en fonction de la quantité
                    produitLocalStorage[i].price = article.price * produitLocalStorage[i].quantity;
                    // On modifie le quantité et le prix à travers le DOM
                    divQuantity.innerHTML = `Quantité : ${produitLocalStorage[i].quantity}`;
                    pPrice.innerHTML = `${produitLocalStorage[i].price} €`;
                    // On set le localStorage
                    localStorage.setItem('products', JSON.stringify(produitLocalStorage));
                    displayRedPointWithNumberOfProductsInBasket();
                    maskSectionCommandAndDisplayDeleteBtn();

                    // Si la quantité d'un article est égale à 0
                    if (produitLocalStorage[i].quantity === 0) {

                        // On supprime l'objet qui possède l'index de l'objet qui a la quantité égal à 0
                        produitLocalStorage.splice(i, 1);
                        // On supprimer l'article du DOM
                        product.remove();
                        // On set le localStorage
                        localStorage.setItem('products', JSON.stringify(produitLocalStorage));
                        displayRedPointWithNumberOfProductsInBasket();

                        // Si le tableau des article du localStorage est vide
                        if (produitLocalStorage.length === 0) {
                            // On supprimer le tableau
                            localStorage.removeItem('products');
                        }
                    }
                })
                .catch(function (error) {
                    alert('Une erreur est survenue dans la fonction removeProductInBasket() ' + error);
                });
        }
    }
}

// **********************************************************************************************

// Récupère le bouton pour y rajouter un lien vers la page home
// Affiche un texte (en paramètre) dans le section-panier selon que le panier est
// vide, vidé d'un coup ou vidé par suppression des articles
const modifyTextSectionBasketAndBtnDeleteBasketWhenBasketIsEmpty = (text) => {

    let sectionPanier = document.querySelector('.page-panier');

    sectionPanier.innerHTML = `<p>${text}<p>`;
    sectionPanier.classList.add('panier-supprimer');

    getBtnDeleteBasket().innerHTML = '<a href="index.html" class="retourBoutique">Retourner à la boutique</a>';
    displayRedPointWithNumberOfProductsInBasket();
}

// **********************************************************************************************

// Récupère le bouton, on lui place un événement au "click"
// On vide la totalité du localStorage
// On change le texte et l'apparence de la section ".page-panier"
const supprimerTotalitePanier = () => {

    if (getBtnDeleteBasket()) {

        getBtnDeleteBasket().addEventListener('click', () => {

            if (localStorage.length) {

                localStorage.clear();
                getDivInSectionResume().remove();
                modifyTextSectionBasketAndBtnDeleteBasketWhenBasketIsEmpty('Votre panier a bien été vidé');
            }
        })
    }
}

// **********************************************************************************************

const onClickOnBtnValidationDisplaySectionFormAndRemoveBtnDeleteBasketAndBtnValidation = () => {

    getBtnValidation().addEventListener('click', () => {

        getBtnDeleteBasket().style.display = 'none';
        getSectionForm().style.display = 'flex';
        getBtnValidation().style.display = 'none';
    })

}

// **********************************************************************************************
const testFormulaireComplet = () => {

    document.getElementById('submit').addEventListener('click', (e) => {
        // e.preventDefault();
        let inputs = document.querySelectorAll('.input-box input');
        for (let input of inputs) {
            // input.checkVXalidity();
            input.reportValidity();
        }

    })
}

    // **********************************************************************************************
    ;

async function send(e) {
    e.preventDefault();

    let products = [];

    for(let i = 0; i < getArrayProductsInLocalStorage().length; i++) {

        products.push(produitLocalStorage[i].id);

    }


    contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    }

    // setTimeout(() => {
        // fetch("https://mockbin.com/request", 
    fetch("http://localhost:3000/api/cameras/order",
    {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ contact: contact, products: products})
    })
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        console.log('vvv Retour du serveur : vvv')
        console.log(value);
        localStorage.setItem('ContactOrderIdProducts', JSON.stringify(value));
    })
    .catch(function (error) {
        alert('Une erreur est survenue dans la fonction send => ' + error);
    });
    // }, 100);

    // localStorage.removeItem('products');
    window.location.href = '../html/commande.html';
    
}

let form = document.getElementById("form");

if (form) {
    form.addEventListener("submit", send);
}
