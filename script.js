class BinarySearchTree {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }

  // insert smaller/eq. value to left, larger to right
  insert(newVal) {
    if (newVal < this.value) {
      if (this.left) {
        this.left.insert(newVal);
      } else {
        this.left = new BinarySearchTree(newVal);
      }
    } else if (newVal > this.value){
      if (this.right) {
        this.right.insert(newVal);
      } else {
        this.right = new BinarySearchTree(newVal);
      }
    } else {
      if (this.left && this.right) {
        // insert to the left by default (gotta pick one)
        this.left.insert(newVal);
      } else if (this.left) {
        this.right = new BinarySearchTree(newVal);
      } else {
        this.left = new BinarySearchTree(newVal);
      }
    }
  }
}

const insertBtn = document.getElementById("insert-node-btn");
const nodeInput = document.querySelector("input[type=text]");
const generateBtn = document.getElementById("generate-btn");
const clearBtn = document.getElementById("clear-btn");

const highlight = document.querySelector(".highlight");
const bstDiv = document.getElementById("bst");

// Declare here so we can reference later
let bst = null;


nodeInput.addEventListener("keyup", evt => {
  let val = evt.target.value;
  if (isNaN(parseInt(val.slice(-1)))) {
    val = val.slice(0, val.length - 1);
    evt.target.value = val;
  }
});

insertBtn.addEventListener("click", evt => {
  // Don't submit forms
  evt.preventDefault();

  // Don't process empties
  if (!nodeInput.value) return;

  const val = parseInt(nodeInput.value);
  if (!bst) {
    bst = new BinarySearchTree(val);
    highlight.innerHTML = "leaf";
  } else {
    bst.insert(val);
  }
  render();
});

generateBtn.addEventListener("click", evt => {
  const max = Math.floor(Math.random() * 100);
  const numNodes = Math.floor(Math.random() * max);

  for (let i = 0; i < numNodes; i++) {
    const val = Math.floor(Math.random() * 100);

    if (i === 0) {
      bst = new BinarySearchTree(val);
      highlight.innerHTML = "leaf";
    } else {
      bst.insert(val);
    }
  }
  render();
})

clearBtn.addEventListener("click", () => {
  bst = null;
  render();
  highlight.innerHTML = "root";
})

function render() {
  bstDiv.innerHTML = bst ? renderNodes(bst, root = true) : "";
}

function renderNodes(tree, root = false, fontSize = 1.125) {
  if (tree.value === null) {
    return "";
  }

  let returnHTML = root
    ? `<h3 id="root">${tree.value}</h3>`
    : `<p style="font-size: ${fontSize}rem">${tree.value}</p>`;

  if (tree.left || tree.right) {
    fontSize *= 0.75;
    returnHTML += '<div class="child">';

    // Add left div and insert value if it exists
    returnHTML +=
      `<div class="left">
        ${tree.left ? renderNodes(tree.left, false, fontSize) : ""}
      </div>`

    // Add right div and insert value if it exists
    returnHTML +=
      `<div class="right">
        ${tree.right ? renderNodes(tree.right, false, fontSize) : ""}
      </div>`

    returnHTML += "</div>"
  }

  return returnHTML;
}
