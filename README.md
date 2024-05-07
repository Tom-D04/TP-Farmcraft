# TP-Farmcraft

## OBJECTIFS

Réaliser un petit jeu dans lequel on ppurra cultiver des champs de blé.
Utiliser JavaScript pour manipuler le DOM et déclencher des événements à intervalles réguliers.

## CREATION DES CHAMPS

On crée la fonction `generateFields()` dans laquelle on crée 25 éléments `field-part` dotés de la class CSS `grass`, le tout à l'intérieur de l'élément `field-parts`

```
function generateFields() {
    for (let i = 0; i < 25; i++) {
        const field = document.createElement("field-part");
        field.classList.add("grass");
        document.querySelector("field-parts").appendChild(field);
    }
}
```

<img src="https://github.com/Tom-D04/TP-Farmcraft/assets/84025296/84f35a4d-7229-4239-aa2d-118f4b8b96b7" alt="Création des champs" width=400> </img>


## SELECTION DES OUTILS

Pour chaque outil, on attend de voir lorsque l'utilisateur clique dessus et quand c'est le cas, on ajoute à l'outil cliqué (`event.target`) la classe "active" avec `classList.add("active"). Pour que l'on puisse sélectionner un seul outil à la fois, j'ai choisi de supprimer la classe "active" de tous les outils quand l'utilisateur clique sur l'un d'eux, avant d'ajouter cette classe à l'outil choisi. Enfin il ne faut pas oublier d'enregistrer l'outil cliqué (par son id) pour savoir quelle action effectuer sur les champs par la suite.

```
function attachToolsEvent() {
    let toolSelected = "";
    document.querySelectorAll("tool").forEach((tool) => {
        tool.addEventListener("click", (event) => {
            document.querySelectorAll("tool").forEach((tool) => {
                tool.classList.remove("active");
            });
            event.target.classList.add("active");
            toolSelected = event.target.id;
        }); 
    });
}
```
