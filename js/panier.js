async function displayBasket() {
    if (getArrayProductsInLocalStorage()) {
        document.querySelector('.page-panier').classList.remove('panier-vide');
        document.querySelector('.page-panier').innerHTML = "";

        for (let i = 0; i < produitLocalStorage.length; i++) {
            const id = produitLocalStorage[i].id;
            const product = await getProduct(id);
            displayProductOnBasketPage(product, i);
            addOne();
            removeOne();
        }

        displayRedPointWithNumberOfProductsInBasket();
        displayTotalCommande();
        testFormulaireComplet();
        eventSendForm();
        supprimerTotalitePanier();
    } else {

        modifyTextSectionBasketAndBtnDeleteBasketWhenBasketIsEmpty('Votre panier est vide');
    }
}

// **********************************************************************************************

// On affiche le produit en le passant en paramètre pour accèder à ses propriétés et leurs valeurs
function displayProductOnBasketPage(article, i) {
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
                                                        ${lentilles}
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
}

// **********************************************************************************************

// Crée un événement sur les éléments + pour ajouter un produit au panier et met à jour la section résumé commande
function addOne() {
    let boutonsAjouterUn = document.querySelectorAll('.ajouter-un');

    for (let k = 0; k < boutonsAjouterUn.length; k++) {

        boutonsAjouterUn[k].addEventListener('click', async () => {

            await addProductInBasket(getIdProductOnClick());
            displayTotalCommande();
        })
    }
}

// **********************************************************************************************

// Crée un événement sur les éléments - pour supprimer un produit du panier et met à jour la section résumé commande
function removeOne() {
    let boutonsRetirerUn = document.querySelectorAll('.retirer-un');

    for (let l = 0; l < boutonsRetirerUn.length; l++) {

        boutonsRetirerUn[l].addEventListener('click', async () => {

            await removeProductInBasket(getIdProductOnClick());
            displayTotalCommande();
        })
    }
}

// **********************************************************************************************

// Affiche un résumé de la commande (nombre d'article et prix total)
async function displayTotalCommande() {
    let totalPrice = 0;
    let produitLocalStorage = getArrayProductsInLocalStorage();
    // Si il y a au moins un produit dans le localStorage
    if (produitLocalStorage) {
        // On boucle dans le tableau des produits
        for (let i = 0; i < produitLocalStorage.length; i++) {

            let id = produitLocalStorage[i].id;
            let article = await getProduct(id);
            // À chaque tour de boucle on ajoute le prix de l'article selon sa quantité
            totalPrice += (article.price * produitLocalStorage[i].quantity);
        }
        displayInnerTotalCommande(totalPrice, produitLocalStorage);
        // On change le texte du bouton "retourner à la boutique" en supprimant le lien et en changeant le texte
        getBtnDeleteBasket().innerHTML = "Vider le panier";
        // On change la couleur du texte
        getBtnDeleteBasket().style.color = "black";
        onClickOnBtnValidationDisplaySectionFormAndRemoveBtnDeleteBasketAndBtnValidation();
    } else {
        // S'il n'y a plus de produits dans le localStorage
        if (!getArrayProductsInLocalStorage()) {
            // Supprimer la section récapitulatif de la commande
            getDivInSectionResume().remove();
            modifyTextSectionBasketAndBtnDeleteBasketWhenBasketIsEmpty("Vous n'avez plus d'article au panier");
        }
    }
}

// **********************************************************************************************

function displayInnerTotalCommande(totalPrice, produitLocalStorage) {
    if (produitLocalStorage) {
        // On récupère le nombre d'article total déjà caclculé dans le span
        let totalArticles = getSpanRedPointForCount().textContent;
        // On récupère la section qui va contenir le récapitulatif
        let sectionResume = document.getElementById('resume');
        // S'il n'y a qu'un article on affiche du texte au singulier
        if (totalArticles == 1) {
            sectionResume.innerHTML = `<div class="total-prix-articles">
                                    <h2>Résumé du contenu de votre panier</h2>
                                    <p>Nombre d'article au panier  ${totalArticles}</p>
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
    }
}

// **********************************************************************************************

// Ajoute un produit à partir de la page panier.html
async function addProductInBasket(idClicked) {
    let divQuantity = event.currentTarget.previousElementSibling;
    let pPrice = event.currentTarget.parentNode.previousElementSibling.lastElementChild;

    // On boucle dans le tableau des produits
    for (let i = 0; i < getArrayProductsInLocalStorage().length; i++) {
        // Dès qu'un produit possède le même id que celui cliqué
        if (produitLocalStorage[i].id === idClicked) {

            let id = produitLocalStorage[i].id;
            let article = await getProduct(id);
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
            maskSectionFormAndDisplayDeleteBtn();
        }
    }
}

// **********************************************************************************************

// Retire un produit à partir de la page panier.html
async function removeProductInBasket(idClicked) {
    let divQuantity = event.currentTarget.nextElementSibling;
    let pPrice = event.currentTarget.parentNode.previousElementSibling.lastElementChild;
    let product = getTheArticle();

    if (getArrayProductsInLocalStorage()) {
        // On boucle dans le tableau des produits
        for (let i = 0; i < produitLocalStorage.length; i++) {

            // Dès qu'un produit possède le même id que celui cliqué
            if (produitLocalStorage[i].id === idClicked) {

                let id = produitLocalStorage[i].id;
                let article = await getProduct(id);
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
                maskSectionFormAndDisplayDeleteBtn();

                // Si la quantité d'un article est égale à 0
                if (produitLocalStorage[i].quantity === 0) {

                    // On supprime l'objet qui possède l'index de l'objet qui a la quantité égal à 0
                    produitLocalStorage.splice(i, 1);
                    // On supprime l'article du DOM
                    product.remove();
                    // On set le localStorage
                    localStorage.setItem('products', JSON.stringify(produitLocalStorage));
                    displayRedPointWithNumberOfProductsInBasket();
                    // Si le tableau des article du localStorage est vide
                    if (produitLocalStorage.length === 0) {
                        // On supprimer le tableau
                        localStorage.removeItem('products');
                        getBtnDeleteBasket().style.padding = 0;
                    }
                }
            }
        }
    }
}

// **********************************************************************************************

function testFormulaireComplet() {
    // Place un événement au clique sur le bouton "commander" du formulaire
    document.getElementById('submit').addEventListener('click', () => {

        // Récupère un tableau contenant les input
        let inputs = document.querySelectorAll('.input-box input');
        // Boucle dans la tableau pour vérifier les input un par un
        for (let input of inputs) {
            // Vérifie la validité de chaque input
            input.reportValidity();
            // Si un input n'est pas valide on stoppe la boucle
            if (!input.reportValidity()) {
                break;
            }
        }
    })
}

// **********************************************************************************************

// Récupère tous les id des produits dans le localStorage et les place dans un tableau
const getArrayOfProductIdInLocalStorage = () => {
    let products = [];

    for (let i = 0; i < getArrayProductsInLocalStorage().length; i++) {

        products.push(produitLocalStorage[i].id);
    }
    return products;
}

// Récupère les valeurs des inputs du formulaire et les places dans un objet contact
const getObjectContact = () => {

    return contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    }
}

async function send(e) {
    e.preventDefault();

    await fetch("http://localhost:3000/api/cameras/order",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                contact: getObjectContact(),
                products: getArrayOfProductIdInLocalStorage()
            })
        })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {

            localStorage.setItem('ContactOrderIdProducts', JSON.stringify(value));
        })
        .catch(function (error) {
            console.log('Une erreur est survenue dans la fonction send => ' + error);
        });

    window.location.href = '../html/commande.html';
}

const eventSendForm = () => {
    let form = document.getElementById("form");

    if (form) {
        form.addEventListener("submit", send);
    }
}

// **********************************************************************************************

function supprimerTotalitePanier() {

    if (getBtnDeleteBasket()) {
        // On récupère le bouton, on lui place un événement au "click"
        getBtnDeleteBasket().addEventListener('click', () => {

            if (getArrayOfProductIdInLocalStorage()) {
                // On supprime la clé products avec son contenu dans le localStorage
                localStorage.removeItem('products');
                getDivInSectionResume().remove();
                getBtnDeleteBasket().style.padding = 0;
                // On change le texte et l'apparence de la section ".page-panier"
                modifyTextSectionBasketAndBtnDeleteBasketWhenBasketIsEmpty('Votre panier a bien été vidé');
            }
        })
    }
}

displayBasket();