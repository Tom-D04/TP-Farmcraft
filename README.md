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

## ACTION DES OUTILS SUR LE CHAMPS

Toujours dans la même fonction, on crée un nouveau `addEventListenner`sur les `field-parts`.
```
    document.querySelectorAll("field-parts").forEach((field_part) => {
        field_part.addEventListener("click", (event) => {
```
Et pour chaque `field-part` on regarde quel outil à été sélectionné avant pour déduire quel classe est à ajouter et/ou retirer sur le champ.

### LABOURER
```
            if (toolSelected === "tool-hoe") {    
                event.target.classList.add("farmland");
                event.target.classList.remove("grass");}
```
### ARROSER
```
            else if (toolSelected === "tool-water" && event.target.classList.contains("farmland")) {
                event.target.classList.add("hydrated");
                setTimeout(() => {event.target.classList.remove("hydrated");}, 10000);}
```
### SEMER
```
 else if (toolSelected === "tool-sow" && (event.target.classList.contains("farmland")) || (event.target.classList.contains("hydrated")) && event.target.dataset.seed === "0"){                 
                event.target.dataset.seed = "1";
                setInterval(grow, 1000) ;}     //setInterval permet de répéter l'appel d'une fonction à intervalles réguliers (en ms)
```
### MOISSONNER
```
else if (toolSelected === "tool-harvest" && event.target.dataset.seed === "7") {        
                event.target.dataset.seed = "0";
                document.getElementById("stock-wheat").innerText = parseInt(document.getElementById("stock-wheat").innerText) + 1;
            }
```
Ici on utilise `element.innerText = ""` pour afficher du texte à l'intérieur du container. `partseInt` nous permet de récupérer le stock actuel de blé en entier et pas au format texte, affin de lui ajouter 1 à chaque fois qu'on moissonne.


