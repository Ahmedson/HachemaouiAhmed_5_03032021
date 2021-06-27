

if (localStorage) {
    document.querySelector('.page-panier').classList.remove('panier-vide');
    document.querySelector('.page-panier').innerHTML = "";

 
    let produitLocalStorage = JSON.parse(localStorage.getItem('products'));
    if(produitLocalStorage){ 
    for (let i = 0; i < produitLocalStorage.length; i++) {

        let id = produitLocalStorage[i].id;

        fetch(`http://localhost:3000/api/cameras/${id}`)
        .then(data => data.json())
        // ON RÉCUPÈRE L'OBJET EXPLOITABLE 
        .then(article => {
        
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
                                            <select name="lentille" id="lentille">
                                                                                
                                            </select>
                                        </form>
                                        <p class="prix">${article.price * produitLocalStorage[i].quantity} €</p>
                                    </div>
                                    <div id="panier" class="panier">
                                        <span class="retirer-un"> - </span>
                                        <div >Quantité : ${produitLocalStorage[i].quantity} </div>
                                        <span class="ajouter-un"> + </span>
                                    <div>
                                </div>
                            </article>`;

        let boutonsAjouterUn = document.querySelectorAll('.ajouter-un');

        for(let k = 0; k < boutonsAjouterUn.length; k++){

            boutonsAjouterUn[k].addEventListener('click', () => {
                                                                
                
                let idPlus = event.currentTarget.parentNode.parentNode.parentNode.id;
                let produitLocalStoragePlus = JSON.parse(localStorage.getItem('products'));
                console.log(produitLocalStoragePlus[k]);
                                                                
                if(produitLocalStoragePlus){
                                                            
                    for(let kk = 0; kk < produitLocalStoragePlus.length; kk++){
                                                            
                        if(produitLocalStoragePlus[kk].id === idPlus){
                                                            
                            produitLocalStoragePlus[kk].price += (produitLocalStoragePlus[kk].price / produitLocalStoragePlus[kk].quantity) ;
                            produitLocalStoragePlus[kk].quantity += 1;
                            
                            event.currentTarget.previousElementSibling.innerHTML = `Quantité : ${produitLocalStoragePlus[kk].quantity}`;
                            event.currentTarget.parentNode.previousElementSibling.lastElementChild.innerHTML = `${produitLocalStoragePlus[kk].price} €`;
                                
                            localStorage.setItem('products', JSON.stringify(produitLocalStoragePlus));
                            affichagePointRouge();
                        }     
                    }                                                   
                }                                                     
           })
        } 
        
        let boutonsRetirerUn = document.querySelectorAll('.retirer-un');

        for(let l = 0; l < boutonsRetirerUn.length; l++){

            boutonsRetirerUn[l].addEventListener('click', () => {

                let idMoins = event.currentTarget.parentNode.parentNode.parentNode.id;
                let produitLocalStorageMoins = JSON.parse(localStorage.getItem('products'));
                                                                
                if(produitLocalStorageMoins){
                                                            
                    for(let ll = 0; ll < produitLocalStorageMoins.length; ll++){
                                                            
                        if(produitLocalStorageMoins[ll].id === idMoins){
                            
                            produitLocalStorageMoins[ll].price -= (produitLocalStorageMoins[ll].price / produitLocalStorageMoins[ll].quantity);
                            produitLocalStorageMoins[ll].quantity -= 1;
                            
                            event.currentTarget.nextElementSibling.innerHTML = `Quantité : ${produitLocalStorageMoins[ll].quantity}`;
                            event.currentTarget.parentNode.previousElementSibling.lastElementChild.innerHTML = `${produitLocalStorageMoins[ll].price} €`;
                                
                            localStorage.setItem('products', JSON.stringify(produitLocalStorageMoins));
                            affichagePointRouge();
                                                            
                            if(produitLocalStorageMoins[ll].quantity === 0){

                                // if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
                                    let produitLocalStorageMoins = JSON.parse(localStorage.getItem('products'));  
                                    produitLocalStorageMoins.splice(ll, 1);
                                    event.currentTarget.parentNode.parentNode.parentNode.remove();
                                    localStorage.setItem('products', JSON.stringify(produitLocalStorageMoins));
                                    affichagePointRouge();
                                    if(produitLocalStorageMoins.length === 0){
                                                                                        
                                        event.currentTarget.parentNode.parentNode.parentNode.remove();
                                        localStorage.removeItem('products');
                                        let sectionPanier = document.querySelector('.page-panier');
                                        document.querySelector('.page-panier').innerHTML = "<p>vous n'avez plus d'article au panier<p>";
                                        sectionPanier.classList.add('panier-supprimer');
                                        affichagePointRouge();
                                    } 
                                // }                                                        
                            }
                        }     
                    }                                                   
                }                                                     
           })
        }         
        })
        .catch(function (error) {
            alert('Une erreur est survenue : ' + error);
        })
    }
    }
    affichagePointRouge();
    supprimerTotalitePanier();


}

supprimerTotalitePanier();

// ajouterUn();




