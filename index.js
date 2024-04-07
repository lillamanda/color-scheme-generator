

const colorContainer = document.getElementById("color-container");
const colorPicker = document.getElementById("color-picker");
const themePicker = document.getElementById("theme-picker");
let currentColorScheme;


document.addEventListener("click", function(e){
    if (e.target.id === "get-color-scheme-btn"){
        getColorScheme();
    }

    if (e.target.dataset.color){
        navigator.clipboard.writeText(e.target.dataset.color);
    }
});


function getColorScheme(){   
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorPicker.value.substring(1)}&mode=${themePicker.value}`) 
        .then(promise => promise.json())
        .then(data => {
            currentColorScheme = data;
            renderColorScheme();
        });
}

function renderColorScheme(){
    colorContainer.innerHTML = "";
    for (let color of currentColorScheme.colors){
        colorContainer.append(generateNewColorEl(color.hex.value))
    }
};

function generateNewColorEl(hex){
    const newColorDiv = document.createElement("div");
    newColorDiv.classList.add("color-field");
    newColorDiv.style.backgroundColor = hex;
    
    const colorText = document.createElement("p");
    colorText.textContent = hex; 
    colorText.dataset.color = hex;
    newColorDiv.append(colorText);

    return newColorDiv;
}

getColorScheme();

