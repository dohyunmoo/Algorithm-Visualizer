const container = document.querySelector(".block-container");
const shuffleButton = document.getElementById("shuffle-button");
const resetButton = document.getElementById("reset-button");
const swapButton = document.getElementById("swap-button");
const bubbleButton = document.getElementById("bubble");
const selectionButton = document.getElementById("selection");
const insertionButton = document.getElementById("insertion");
const quickButton = document.getElementById("quick");

const blockCountInput = document.getElementById("block-count-input");
const updateButton = document.getElementById("update-block-count");

var itemCount = 100;

// Function to create a single block
function createBlock(num) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.id = num;
    block.style.backgroundColor = "rgb(" + Math.trunc((255 / itemCount) * num) + ", " + Math.trunc((255 / itemCount) * num) + ", " + Math.trunc((255 / itemCount) * num) + ")";
    block.style.width =  (100 / itemCount) + "%";
    block.setAttribute("locationData", num);
    // block.textContent = block.getAttribute("locationData");
    return block;
}

// Generate 100 blocks and add them to the container
for (let i = 0; i < itemCount; i++) {
    container.appendChild(createBlock(i));
}

function reset() {
    container.innerHTML = "";
    for (let i = 0; i < itemCount; i++) {
        container.appendChild(createBlock(i));
    }
}

function updateBlockCount() {
    try {
        var input_int = parseInt(blockCountInput.value);
    } catch (error) {
        console.error("Input " + blockCountInput.value + " is not a number");
    }

    if (input_int < 10 || input_int > 300) {
        console.error(input_int + " out of scope");
    } else {
        itemCount = input_int;
        reset();
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

    let divs = container.querySelectorAll("div");
    for (let i = 0; i < divs.length; i++) {
        divs[i].setAttribute("locationData", i);
        // divs[i].textContent = divs[i].getAttribute("locationData");
    }
}

// swapping ID num1 and ID num2
function swap(num1, num2,) {
    let child1 = document.getElementById(num1);
    let child2 = document.getElementById(num2);

    let placeholder1 = document.createElement("div");
    let placeholder2 = document.createElement("div");
    
    let currLocation1 = child1.getAttribute("locationData");
    let currLocation2 = child2.getAttribute("locationData"); 

    // temp1
    child1.classList.add("animate-up");
    child2.classList.add("animate-up");

    container.insertBefore(placeholder2, child2);
    container.insertBefore(placeholder1, child1);

    container.removeChild(child1);
    container.removeChild(child2);

    // temp2
    child1.classList.add("fade-out");
    child2.classList.add("fade-out");

    setTimeout(function() {
        child1.classList.remove("fade-out");
        child1.classList.add("fade-in");
        child2.classList.remove("fade-out");
        child2.classList.add("fade-in");
    }, 100);

    setTimeout(function() {
        child1.classList.remove("fade-in");
        child2.classList.remove("fade-in");
        child1.classList.add("animate-down");
        child2.classList.add("animate-down");
    }, 200);

    container.insertBefore(child2, placeholder1);
    container.insertBefore(child1, placeholder2);

    container.removeChild(placeholder1)
    container.removeChild(placeholder2)

    child2.setAttribute("locationData", currLocation1);
    child1.setAttribute("locationData", currLocation2);
    // child2.textContent = child2.getAttribute("locationData");
    // child1.textContent = child1.getAttribute("locationData");

    setTimeout(function() {
        child1.classList.remove("animate-up", "animate-down");
        child2.classList.remove("animate-up", "animate-down");
    }, 300);
}

function bubbleSort() {
    let count = 0;
    for (let i = 0; i < itemCount; i++) {
        for (let j = 0; j < itemCount - 1; j++) {
            let id1 = parseInt(container.querySelector("[locationData='" + j + "']").id);
            let id2 = parseInt(container.querySelector("[locationData='" + (j + 1) + "']").id);

            if (id1 > id2) {
                count++;
                // setTimeout(function() {
                //     swap(id1, id2);
                // }, 300 * count);
                swap(id1, id2)
                console.log("iteration count " + count + ": swapping " + id1 + " and " + id2 + ".");
            }
        }
    }
    console.log("bubble sort");
}

function selectionSort() {
    console.log("selection sort");
}

function insertionSort() {
    console.log("insertion sort");
}

function quickSort() {
    console.log("quick sort");
}

shuffleButton.addEventListener("click", shuffleBlocks);
resetButton.addEventListener("click", reset);
bubbleButton.addEventListener("click", bubbleSort);
selectionButton.addEventListener("click", selectionSort);
insertionButton.addEventListener("click", insertionSort);
quickButton.addEventListener("click", quickSort);
swapButton.addEventListener("click", function() {
    swap(23, 71);
});

updateButton.addEventListener("click", updateBlockCount);
