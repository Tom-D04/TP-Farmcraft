function generateFields() {
    for (let i = 0; i < 25; i++) {
        const field = document.createElement("field-part");
        field.classList.add("grass");
        document.querySelector("field-parts").appendChild(field);
    }
}

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
    document.querySelectorAll("field-parts").forEach((field_part) => {
        field_part.addEventListener("click", (event) => {
            if (toolSelected === "tool-hoe") {    
                event.target.classList.add("farmland");
                event.target.classList.remove("grass");}
            else if (toolSelected === "tool-water" && event.target.classList.contains("farmland")) {
                event.target.classList.add("hydrated");
                setTimeout(() => {event.target.classList.remove("hydrated");}, 10000);}
            else if (toolSelected === "tool-sow" && (event.target.classList.contains("farmland")) || (event.target.classList.contains("hydrated")) && event.target.dataset.seed === "0"){                 
                event.target.dataset.seed = "1";
                setInterval(grow, 1000) ;}     //setInterval permet de répéter l'appel d'une fonction à intervalles réguliers
            else if (toolSelected === "tool-harvest" && event.target.dataset.seed === "7") {        
                event.target.dataset.seed = "0";
                document.getElementById("stock-wheat").innerText = parseInt(document.getElementById("stock-wheat").innerText) + 1;
            }
            });      
    });
}
function grow(){
    let randomNb = Math.random()*100;
    document.querySelectorAll("field-parts > field-part").forEach((fieldPart) => {
        if (fieldPart.classList.contains("farmland") && fieldPart.dataset.seed === "0" && randomNb > 99){
            fieldPart.classList.add("grass");
            fieldPart.classList.remove("farmland");
        }
        if(parseInt(fieldPart.dataset.seed) < 7 && parseInt(fieldPart.dataset.seed) > 0){
            if (fieldPart.classList.contains("hydrated") && randomNb > 70){
                fieldPart.dataset.seed = parseInt(fieldPart.dataset.seed) + 1;
            }
            else if (!fieldPart.classList.contains("hydrated") && randomNb > 95){
                fieldPart.dataset.seed = parseInt(fieldPart.dataset.seed) + 1; 
            }
        }
    }); 
}
 
window.addEventListener("load", attachToolsEvent);
window.addEventListener("load", generateFields);
