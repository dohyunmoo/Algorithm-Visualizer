const container = document.querySelector('.block-container');
const shuffleButton = document.getElementById('shuffle-button');

// Function to create a single block
function createBlock(num) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.textContent = num;
    return block;
}

// Generate 100 blocks and add them to the container
for (let i = 0; i < 100; i++) {
    container.appendChild(createBlock(i));
}

// Function to shuffle the order of blocks
function shuffleBlocks() {
    const blocks = Array.from(container.querySelectorAll('.block'));
    for (let i = blocks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
    }
    container.innerHTML = ''; // Clear existing blocks
    blocks.forEach(block => container.appendChild(block));
}

shuffleButton.addEventListener('click', shuffleBlocks);
