class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
    }
}

const displayAllProducts = () => {

    fetch("http://localhost:3000/api/cameras")
        .then(data => data.json())
        .then(jsonListProducts => {
            for (let jsonProduct of jsonListProducts) {
                let product = new Product(jsonProduct);

                let lentilles = "", j = 0;
                while (j < jsonProduct.lenses.length) {
                    lentilles += `<option value="${j}">${jsonProduct.lenses[j]}</option>`;
                    j++
                }

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

                let elementsPanierPageAccueil = document.getElementsByClassName('ajout-panier-home');

                for (let i = 0; i < elementsPanierPageAccueil.length; i++) {

                    elementsPanierPageAccueil[i].addEventListener('click', (event) => {

                        addProductInLocalStorage(getIdProductOnClick());
                    });
                }
            }
        })
        .catch(function (error) {
            alert('Une erreur est survenue sur la page index.js ' + error);
        });

        displayRedPointWithNumberOfProductsInBasket();
}

displayAllProducts();






