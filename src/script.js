const container = document.querySelector(".block-container");
const shuffleButton = document.getElementById("shuffle-button");
const resetButton = document.getElementById("reset-button");
const bubbleButton = document.getElementById("bubble");
const selectionButton = document.getElementById("selection");
const insertionButton = document.getElementById("insertion");
const quickButton = document.getElementById("quick");
const speedUpButton = document.getElementById("speed-up");
const speedDownButton = document.getElementById("speed-down");

const blockCountInput = document.getElementById("block-count-input");
const updateButton = document.getElementById("update-block-count");
const speedLabel = document.getElementById("speed-label");

var itemCount = 100;
const defaultSpeed = 800;
var speed = defaultSpeed;

var algorithmRunning = false;

function speedControl(isUp) {
    if (isUp && speed > 25) {
        speed = parseInt(speed / 2);
    } else if (!isUp && speed < 1600) {
        speed = parseInt(speed * 2);
    }
    speedLabel.textContent = "Speed: " + defaultSpeed/speed + "x";
}

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
    algorithmRunning = false;
}

function updateBlockCount() {
    if (!algorithmRunning) {
        if (isNaN(blockCountInput.value)) {
            console.error("Invalid type of input");
        } else {
            var input_int = parseInt(blockCountInput.value);
            console.log(input_int)
        
            if (input_int < 10 || input_int > 300) {
                console.error(input_int + " out of scope");
            } else {
                itemCount = input_int;
                reset();
            }
        }
    }
}

// Function to shuffle the order of blocks
function shuffleBlocks() {
    if (!algorithmRunning) {
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
}

// swapping ID num1 and ID num2
async function swap(num1, num2) {
    if (num1 == num2) {
        return;
    }
    
    let child1 = document.getElementById(num1);
    let child2 = document.getElementById(num2);

    let placeholder1 = document.createElement("div");
    let placeholder2 = document.createElement("div");
    
    let currLocation1 = child1.getAttribute("locationData");
    let currLocation2 = child2.getAttribute("locationData"); 

    container.insertBefore(placeholder2, child2);
    container.insertBefore(placeholder1, child1);

    await new Promise(resolve => setTimeout(resolve, speed));
    child1.classList.add("animate-up");
    child2.classList.add("animate-up");

    container.removeChild(child1);
    container.removeChild(child2);

    container.insertBefore(child2, placeholder1);
    container.insertBefore(child1, placeholder2);

    await new Promise(resolve => setTimeout(resolve, speed));
    child1.classList.remove("animate-up");
    child2.classList.remove("animate-up");
    child1.classList.add("animate-down");
    child2.classList.add("animate-down");

    container.removeChild(placeholder1)
    container.removeChild(placeholder2)

    child2.setAttribute("locationData", currLocation1);
    child1.setAttribute("locationData", currLocation2);
    // child2.textContent = child2.getAttribute("locationData");
    // child1.textContent = child1.getAttribute("locationData");

    await new Promise(resolve => setTimeout(resolve, speed));
    child1.classList.remove("animate-down");
    child2.classList.remove("animate-down");

    return;
}

async function bubbleSort() {
    let count = 0;
    for (let i = 0; i < itemCount; i++) {
        for (let j = 0; j < itemCount - 1; j++) {
            let id1 = parseInt(container.querySelector("[locationData='" + j + "']").id);
            let id2 = parseInt(container.querySelector("[locationData='" + (j + 1) + "']").id);

            if (id1 > id2) {
                count++;
                await swap(id1, id2);
                console.log("iteration count " + count + ": swapping " + id1 + " and " + id2 + ".");
            }
        }
    }
}

async function selectionSort() {
    let count = 0;

    for (let i = 0; i < itemCount - 1; i++) {
        let smallestIndex = parseInt(container.querySelector("[locationData='" + i + "']").id);
        let minimumIndexId = parseInt(container.querySelector("[locationData='" + i + "']").id);

        for (let j = i + 1; j < itemCount; j++) {
            let id2 = parseInt(container.querySelector("[locationData='" + j + "']").id);

            if (minimumIndexId > id2) {
                minimumIndexId = id2;
            }
        }

        if (smallestIndex != minimumIndexId) {
            count++;
            await swap(smallestIndex, minimumIndexId);
            console.log("iteration count " + count + ": swapping " + smallestIndex + " and " + minimumIndexId + ".");
        }
    }
}

async function insertionSort() {
    let count = 0;

    for (let i = 1; i < itemCount; i++) {
        let key = parseInt(container.querySelector("[locationData='" + i + "']").id);
        j = i - 1;
        while (j >= 0 && key < parseInt(container.querySelector("[locationData='" + j + "']").id)) {
            count++;
            await swap(key, parseInt(container.querySelector("[locationData='" + j + "']").id));
            j--;
        }
    }
}

async function quickSort(start_q, end_q) {

    async function divide(start, end) {
        let pivot = parseInt(container.querySelector("[locationData='" + end + "']").id);
        let i = start - 1;

        for (let j = start; j < end; j++) {
            let tempId = parseInt(container.querySelector("[locationData='" + j + "']").id);
            if (tempId <= pivot) {
                i++;
                await swap(parseInt(container.querySelector("[locationData='" + i + "']").id), tempId);
            }
        }

        let gElement = parseInt(container.querySelector("[locationData='" + (i + 1) + "']").id);
        await swap(gElement, pivot);

        return i + 1;
    }

    if (start_q < end_q) {
        let iq = await divide(start_q, end_q);

        await quickSort(start_q, iq - 1);
        await quickSort(iq + 1, end_q);
    }
}

shuffleButton.addEventListener("click", shuffleBlocks);
resetButton.addEventListener("click", reset);
bubbleButton.addEventListener("click", async () => {
    if (!algorithmRunning) {
        algorithmRunning = true;
        await bubbleSort();
        algorithmRunning = false;
    }
    console.log("bubble sort");
});

selectionButton.addEventListener("click", async () => {
    if (!algorithmRunning) {
        algorithmRunning = true;
        await selectionSort();
        algorithmRunning = false;
    }
    console.log("selection sort");
});

insertionButton.addEventListener("click", async () => {
    if (!algorithmRunning) {
        algorithmRunning = true;
        await insertionSort();
        algorithmRunning = false;
    }
    console.log("insertion sort");
});

quickButton.addEventListener("click", async () => {
    if (!algorithmRunning) {
        algorithmRunning = true;
        await quickSort(0, itemCount - 1);
        algorithmRunning = false;
    }
    console.log("quick sort");
});

updateButton.addEventListener("click", updateBlockCount);
blockCountInput.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        updateBlockCount();
    }
});

speedUpButton.addEventListener("click", function() {
    speedControl(true);
});

speedDownButton.addEventListener("click", function() {
    speedControl(false);
});
