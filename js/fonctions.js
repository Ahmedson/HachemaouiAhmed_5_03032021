// Récupère la balise span, créer une variable qui va contenir le nombre d'article
// Vérifie que le localStorage contient des clés et récupère toutes les valeurs en les additionnat
// Puis rajoute la class "visible" sinon supprime la class "visible"
const affichagePointRouge = () => { 

    var nombreArticleAuPanier = document.getElementById('nombre-produit-dans-panier');
    var totalArticle = 0;
    
    if( localStorage.length > 0){
        for (var i = 0; i < localStorage.length; i++) {
            totalArticle += parseInt(localStorage.getItem(localStorage.key(i)));
        }
        nombreArticleAuPanier.classList.add('visible');
        nombreArticleAuPanier.innerHTML = totalArticle;
    }else{
        nombreArticleAuPanier.classList.remove('visible');
    }
}  

// Récupère l'ID du produit cliqué qui est aussi la clé du localStorage

const addProductInLocalStorage = async () => {
    let id = event.currentTarget.parentNode.parentNode.parentNode.id;

    let produitLocalStorage = await JSON.parse(localStorage.getItem('products'));

    if(!produitLocalStorage){

        let produitLocalStorage = [];
        produitLocalStorage.push({id:id, quantity : 1});
        localStorage.setItem('products', JSON.stringify(produitLocalStorage));

    }
    if(localStorage.getItem('product').find(x => x.id === id)){

        const index = localStorage.getItem('product').findIndex(x => x.id === id)
        console.log(index);
    }
}

const removeProductInLocalStorage = () => {
    let id = event.currentTarget.parentNode.parentNode.parentNode.id;
    // let produitLocalStorage = parseInt(localStorage.getItem(id));

    // if(produitLocalStorage){
    //     produitLocalStorage -= 1;
    //     localStorage.setItem(id, produitLocalStorage);
    // }else{
    //     produitLocalStorage = 0;
    //     localStorage.setItem(id, produitLocalStorage);
    // } 
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
    })
}

