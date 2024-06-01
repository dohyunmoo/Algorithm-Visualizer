const container = document.querySelector(".block-container");
const shuffleButton = document.getElementById("shuffle-button");
const resetButton = document.getElementById("reset-button")
const sortButton = document.getElementById("sort-button")

// Function to create a single block
function createBlock(num) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.id = num;
    block.style.backgroundColor = "rgb(" + Math.trunc(2.55 * num) + ", " + Math.trunc(2.55 * num) + ", " + Math.trunc(2.55 * num) + ")";
    block.style.width = "1%";
    block.setAttribute("locationData", num);
    block.textContent = block.getAttribute("locationData");
    return block;
}

// Generate 100 blocks and add them to the container
for (let i = 0; i < 100; i++) {
    container.appendChild(createBlock(i));
}

function reset() {
    container.innerHTML = "";
    for (let i = 0; i < 100; i++) {
        container.appendChild(createBlock(i));
    }
}

// Function to shuffle the order of blocks
function shuffleBlocks() {
    const blocks = Array.from(container.querySelectorAll(".block"));
    for (let i = blocks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
    }
    container.innerHTML = ''; // Clear existing blocks
    blocks.forEach(block => container.appendChild(block));

    var divs = container.querySelectorAll("div");
    for (var i = 0; i < divs.length; i++) {
        divs[i].setAttribute("locationData", i);
        divs[i].textContent = divs[i].getAttribute("locationData");
    }
}

function swap(num1, num2) {
    var child1 = document.getElementById(num1);
    var child2 = document.getElementById(num2);

    var currLocation1 = child1.getAttribute("locationData");
    var currLocation2 = child2.getAttribute("locationData");

    container.removeChild(child1);
    container.removeChild(child2);

    var divs = container.querySelectorAll("div");
    for (var i = 0; i < divs.length; i++) {
        divs[i].dataset.location = i;
    }

    if (child1.getAttribute("locationData") == 99) {
        container.appendChild(child2);
    } else {
        container.insertBefore(child2, document.querySelector("[locationData='" + (parseInt(currLocation1) + 1) + "']"));
    }
    
    if (child2.getAttribute("locationData") == 99) {
        container.appendChild(child1);
    } else {
        container.insertBefore(child1, document.querySelector("[locationData='" + (parseInt(currLocation2) + 1) + "']"));
    }

    child2.setAttribute("locationData", currLocation1);
    child1.setAttribute("locationData", currLocation2);
    child2.textContent = child2.getAttribute("locationData");
    child1.textContent = child1.getAttribute("locationData");
}

// function bubbleSort() {
    
// }

shuffleButton.addEventListener("click", shuffleBlocks);
resetButton.addEventListener("click", reset);
sortButton.addEventListener("click", function() {
    swap(0, 98);
});

