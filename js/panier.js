if (localStorage.length > 0){
    let prixTotal = 0;
    document.querySelector('.page-panier').classList.remove('panier-vide');
    document.querySelector('.page-panier').innerHTML = "";

    for (var i = 0; i < localStorage.length; i++) {

        let id = localStorage.key(i);
        let quantity = localStorage.getItem(localStorage.key(i));

        fetch(`http://localhost:3000/api/cameras/${id}`)
            .then( data => data.json())
            // ON RÉCUPÈRE L'OBJET EXPLOITABLE 
            .then( article => {
                prixTotal += parseInt((article.price * quantity)); 
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
                                                        <p class="prix">${prixTotal} €</p>
                                                        </div>
                                                        <div id="panier" class="panier">
                                                        <span class="retirer-un"> - </span>
                                                        <div >Quantité : ${quantity} </div>
                                                        <span class="ajouter-un"> + </span>
                                                        <div>
                                                </div>
                                                </article>`; 
                        let spanBoutonsPlus = document.getElementsByClassName('ajouter-un');

                                for(let i = 0; i < spanBoutonsPlus.length; i++){ 
                                        spanBoutonsPlus[i].addEventListener('click', (event) => {
                                                addProductInLocalStorage();
                                                let id = event.currentTarget.parentNode.parentNode.parentNode.id;
                                                let produitLocalStorage = parseInt(localStorage.getItem(id));
                                                event.currentTarget.previousElementSibling.innerHTML = `Quantité : ${produitLocalStorage}`; 
                                                prixTotal += article.price
                                                document.querySelector('.prix').innerHTML = prixTotal + " €";
                                        })
                                }

                        let spanBoutonsMoins = document.getElementsByClassName('retirer-un');

                                for(let j = 0; j <spanBoutonsMoins.length; j++){
                                        spanBoutonsMoins[j].addEventListener('click', (event) => {

                                                removeProductInLocalStorage();
                                                let id = event.currentTarget.parentNode.parentNode.parentNode.id;
                                                let produitLocalStorage = parseInt(localStorage.getItem(id));

                                                if(produitLocalStorage > 0){

                                                        event.currentTarget.nextElementSibling.innerHTML = `Quantité : ${produitLocalStorage}`; 
                                                        prixTotal -= article.price
                                                        document.querySelector('.prix').innerHTML = prixTotal + " €";

                                        }else {

                                                localStorage.removeItem(id);
                                                let article = document.getElementById(id);
                                                article.parentNode.removeChild(article);
                                                if(!localStorage.length){
                                                        let sectionPanier = document.querySelector('.page-panier');
                                                        document.querySelector('.page-panier').innerHTML = '<p>votre avez supprimé<br> tous les articles<p>';
                                                        sectionPanier.classList.add('panier-supprimer');

                                                        let deleteBasket = document.getElementById('delete-basket');
                                                        deleteBasket.parentNode.innerHTML = `<a href="index.html"><button id="delete-basket" type="button">Retourner à la boutique</button></a>`;
                                                        document.querySelector('#delete-basket').style.color = "white";   
                                                        

                                                }
                                        }
                                                
                                        })
                                }
        })
        .catch(function(error) {
                alert('Une erreur est survenue : ' + error);
        })
    }
    supprimerTotalitePanier();
    
    
}

// ajouterUn();




