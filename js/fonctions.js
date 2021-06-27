// Récupère la balise span, créer une variable qui va contenir le nombre d'article
// Vérifie que le localStorage contient la clés "products"
// Calcul le nombre d'article
// Puis rajoute la class "visible" et le nombre
// sinon supprime la class "visible"
const affichagePointRouge = () => {

    let spanPointRouge = document.getElementById('nombre-produit-dans-panier');
    let produitLocalStorage = JSON.parse(localStorage.getItem('products'));
    let totalArticle = 0;

    if (spanPointRouge) {
        if (localStorage.length > 0) {
            for (let i = 0; i < produitLocalStorage.length; i++) {

                totalArticle += produitLocalStorage[i].quantity;
                spanPointRouge.classList.add('visible');
                spanPointRouge.innerHTML = totalArticle;
            }

        } else {
            spanPointRouge.classList.remove('visible');
        }
    }
}

// Récupère l'ID du produit cliqué qui est aussi la clé du localStorage

const addProductInLocalStorage = () => {
    let id = event.currentTarget.parentNode.parentNode.parentNode.id;
    let notInTheLocalStorage = true;

    fetch(`http://localhost:3000/api/cameras/${id}`)
        .then(data => data.json())
        // ON RÉCUPÈRE L'OBJET EXPLOITABLE 
        .then(article => {

            let produitLocalStorage = JSON.parse(localStorage.getItem('products'));

            if (!produitLocalStorage) {

                let produitLocalStorage = [];
                produitLocalStorage.push({ id: article._id, quantity: 1, price: article.price });
                localStorage.setItem('products', JSON.stringify(produitLocalStorage));
                notInTheLocalStorage = false;

            } else if (produitLocalStorage) {

                for (let i = 0; i < produitLocalStorage.length; i++) {

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


// Récupère le bouton, on lui place un événement au "click"
// On vide la totalité du localStorage
// On change le texte et l'apparence du la section ".page-panier"
const supprimerTotalitePanier = () => {
    let deleteBasket = document.getElementById('delete-basket');

    deleteBasket.addEventListener('click', () => {
        localStorage.clear();
        let sectionPanier = document.querySelector('.page-panier');
        document.querySelector('.page-panier').innerHTML = '<p>votre panier a bien été vidé<p>';
        sectionPanier.classList.add('panier-supprimer');
        deleteBasket.innerHTML = '<a href="index.html" class="retourBoutique">Retourner à la boutique</a>';
        console.log(deleteBasket.innerHTML);
    })
}

