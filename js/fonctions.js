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

const getSectionCommande = () => {
    return document.querySelector('.section-commande');
}

const getBtnValidation = () => {
    return document.getElementById('validation');
}

const getDivInSectionResume = () => {
    return document.querySelector('.total-prix-articles');
}

const maskSectionCommandAndDisplayDeleteBtn = () => {
    getSectionCommande().style.display = 'none';
    getBtnDeleteBasket().style.display = 'block';
}

// Récupère la balise span, créer une variable qui va contenir le nombre d'article
// Vérifie que le localStorage contient la clés "products"
// Calcul le nombre d'article
// Puis rajoute la class "visible" et le nombre
// Sinon supprime la class "visible"
const affichagePointRouge = () => {

    let totalArticle = 0;

    if (getSpanRedPointForCount()) {
        if (localStorage.length > 0) {
            for (let i = 0; i < getArrayProductsInLocalStorage().length; i++) {

                totalArticle += produitLocalStorage[i].quantity;
                getSpanRedPointForCount().classList.add('visible');
                getSpanRedPointForCount().innerHTML = totalArticle;
            }

        } else {
            getSpanRedPointForCount().classList.remove('visible');
        }
    }
}

const displayTotalCommande = () => {
    let totalPrice = 0;
    let totalArticles = 0;
    let produitLocalStorage = getArrayProductsInLocalStorage();

    if (produitLocalStorage) {
        for (let i = 0; i < produitLocalStorage.length; i++) {

            fetch(`http://localhost:3000/api/cameras/${produitLocalStorage[i].id}`)
                .then(data => data.json())
                // ON RÉCUPÈRE L'OBJET EXPLOITABLE 
                .then(article => {

                    // if (produitLocalStorage[i] !== undefined) {

                    totalPrice += (article.price * produitLocalStorage[i].quantity);
                    totalArticles += produitLocalStorage[i].quantity;

                    let sectionResume = document.getElementById('resume');

                    if (totalArticles === 1) {
                        sectionResume.innerHTML = `<div class="total-prix-articles">
                                                    <h2>Résumé du contenu de votre panier</h2>
                                                    <p>Nombre d'article au panier : ${totalArticles}</p>
                                                    <p>Prix de l'article : ${totalPrice} €</p>
                                                    <a href="#commande"><button id="validation" type="button">Valider la commande</button></a>
                                                </div>`;
                    } else {
                        sectionResume.innerHTML = `<div class="total-prix-articles">
                                                    <h2>Résumé du contenu de votre panier</h2>
                                                    <p>Nombre d'articles au panier : ${totalArticles}</p>
                                                    <p>Prix total des articles : ${totalPrice} €</p>
                                                    <a href="#commande"><button id="validation" type="button">Valider la commande</button></a>
                                                </div>`;
                    }
                    getBtnDeleteBasket().innerHTML = "Vider le panier";
                    getBtnDeleteBasket().style.color = "black";
                    onClickOnBtnValidation();
                    // }

                    if (!getArrayProductsInLocalStorage()) {
                        getDivInSectionResume().remove();
                        panierVide("Vous n'avez plus d'article au panier");
                    }
                })
        }
    }

    // affichagePointRouge();
}

// Récupère l'ID du produit cliqué / Récupère l'article via l'API grâce à l'ID
// Puis récupère le contenu de la clé "products" du localStorage 
// Si eie n'existe pas : crée un tableau push un objet { id, quantité, prix} et set le localStorage
// sinon bouclé dans dans le tableau pour trouver l'objet qui contient le même ID
// si il est trouvé rajouté 1 en quantité et mettre à jour le prix et set le localStorage
// sinon push un objet {id, quantité, prix} et set le localStorage
const addProductInLocalStorage = (id) => {

    let notInTheLocalStorage = true;

    fetch(`http://localhost:3000/api/cameras/${id}`)
        .then(data => data.json())
        // ON RÉCUPÈRE L'OBJET EXPLOITABLE 
        .then(article => {

            if (!getArrayProductsInLocalStorage()) {

                let produitLocalStorage = [];
                produitLocalStorage.push({ id: article._id, quantity: 1, price: article.price });
                localStorage.setItem('products', JSON.stringify(produitLocalStorage));

            } else if (getArrayProductsInLocalStorage()) {

                for (let i = 0; i < getArrayProductsInLocalStorage().length; i++) {

                    if (produitLocalStorage[i].id === id) {
                        produitLocalStorage[i].quantity += 1;
                        produitLocalStorage[i].price = article.price * produitLocalStorage[i].quantity;
                        localStorage.setItem('products', JSON.stringify(produitLocalStorage));
                        notInTheLocalStorage = false;
                    }
                }
                if (notInTheLocalStorage) {

                    produitLocalStorage.push({ id: article._id, quantity: 1, price: article.price });
                    localStorage.setItem('products', JSON.stringify(produitLocalStorage));
                }
            }
            affichagePointRouge();

        })
        .catch(function (error) {
            alert('Une erreur est survenue : ' + error);
        });
}

const addProductInBasket = () => {
    let divQuantity = event.currentTarget.previousElementSibling;
    let pPrice = event.currentTarget.parentNode.previousElementSibling.lastElementChild;

    if (getArrayProductsInLocalStorage()) {

        for (let i = 0; i < getArrayProductsInLocalStorage().length; i++) {

            if (produitLocalStorage[i].id === getIdProductOnClick()) {

                fetch(`http://localhost:3000/api/cameras/${produitLocalStorage[i].id}`)
                    .then(data => data.json())
                    // ON RÉCUPÈRE L'OBJET EXPLOITABLE 
                    .then(article => {

                        produitLocalStorage[i].quantity += 1;
                        produitLocalStorage[i].price = (article.price * produitLocalStorage[i].quantity);

                        divQuantity.innerHTML = `Quantité : ${produitLocalStorage[i].quantity}`;
                        pPrice.innerHTML = `${produitLocalStorage[i].price} €`;

                        localStorage.setItem('products', JSON.stringify(produitLocalStorage));
                        affichagePointRouge();
                        maskSectionCommandAndDisplayDeleteBtn();

                    })
            }
        }
    }
}
const removeProductInBasket = () => {
    let divQuantity = event.currentTarget.nextElementSibling;
    let pPrice = event.currentTarget.parentNode.previousElementSibling.lastElementChild;
    let product = getTheArticle();

    if (getArrayProductsInLocalStorage()) {

        for (let i = 0; i < getArrayProductsInLocalStorage().length; i++) {

            if (produitLocalStorage[i].id === getIdProductOnClick()) {

                fetch(`http://localhost:3000/api/cameras/${produitLocalStorage[i].id}`)
                    .then(data => data.json())
                    // ON RÉCUPÈRE L'OBJET EXPLOITABLE 
                    .then(article => {

                        produitLocalStorage[i].quantity -= 1;
                        produitLocalStorage[i].price = article.price * produitLocalStorage[i].quantity;

                        divQuantity.innerHTML = `Quantité : ${produitLocalStorage[i].quantity}`;
                        pPrice.innerHTML = `${produitLocalStorage[i].price} €`;

                        localStorage.setItem('products', JSON.stringify(produitLocalStorage));
                        affichagePointRouge();
                        maskSectionCommandAndDisplayDeleteBtn();

                        if (produitLocalStorage[i].quantity === 0) {

                            // if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
                            getArrayProductsInLocalStorage();
                            produitLocalStorage.splice(i, 1);
                            product.remove();
                            localStorage.setItem('products', JSON.stringify(produitLocalStorage));
                            affichagePointRouge();

                            if (produitLocalStorage.length === 0) {

                                localStorage.removeItem('products');
                            }
                            // }                                                        
                        }

                    })
            }
        }
    }
}

// Récupère le bouton pour y rajouter un lien vers la page home
// Affiche un texte (en paramètre) dans le section-panier selon que le panier est
// vide, vidé d'un coup ou vidé par suppression des articles
const panierVide = (text) => {
    let sectionPanier = document.querySelector('.page-panier');

    sectionPanier.innerHTML = `<p>${text}<p>`;
    sectionPanier.classList.add('panier-supprimer');

    getBtnDeleteBasket().innerHTML = '<a href="index.html" class="retourBoutique">Retourner à la boutique</a>';
    getBtnDeleteBasket().style.marginTop = 0;
    affichagePointRouge();
}

// Récupère le bouton, on lui place un événement au "click"
// On vide la totalité du localStorage
// On change le texte et l'apparence de la section ".page-panier"
const supprimerTotalitePanier = () => {

    if (getBtnDeleteBasket()) {

        getBtnDeleteBasket().addEventListener('click', () => {

            if (localStorage.length) {

                localStorage.clear();
                getDivInSectionResume().remove();
                getBtnDeleteBasket().style.marginTop = 0;
                panierVide('Votre panier a bien été vidé');
            }
        })
    }
}

const onClickOnBtnValidation = () => {

    getBtnValidation().addEventListener('click', () => {

        getBtnDeleteBasket().style.display = 'none';
        getSectionCommande().style.display = 'flex';
        getBtnValidation().style.display = 'none';
    })

}
