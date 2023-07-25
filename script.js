let btnRef=document.querySelectorAll(".button-option");
let popupRef=document.querySelector(".popup");
let newgameBtn=document.getElementById("new-game");
let restartBtn=document.getElementById("restart");
let msgRef=document.getElementById("message");

// Winning Pattern Array
let winningPattern =[
    [0,1,2],
    [0,3,6],
    [2,5,8],
    [6,7,8],
    [3,4,5],
    [1,4,7],
    [0,4,8],
    [2,4,6]
];
// Player 'X' plays first
let xTurn=true;
let count=0;

// Disable All Buttons
const disableButton = () =>{
    btnRef.forEach((element) => (element.disabled=true))
    // Enable popup
    popupRef.classList.remove("hide");
};

// Enable all buttons (For new Game and Restart)
const enableButtons = () =>{
    btnRef.forEach(element =>{
        element.innerText="";
        element.disabled=false;
    });
    // Disable popup
    popupRef.classList.add("hide");
};

// This function is executed when a player wins
const winFunction = (letter) =>{
    disableButton(); 
    if(letter == "X"){
        msgRef.innerHTML ="&#x1F389; <br> 'X' Wins";
    }else{
        msgRef.innerHTML ="&#x1F389; <br> 'O' Wins";
    }
};

// Function for Draw
const drawFunction = () =>{
    disableButton();
    msgRef.innerHTML="&#x1F60E; <br> It's a Draw";
}

// New Game
newgameBtn.addEventListener("click",() =>{
    count =0;
    enableButtons();
}); 

restartBtn.addEventListener("click", () =>{
    count =0;
    enableButtons();
})

// Win Logic
const winChecker = () => {
    // Loop through all win patterns
    for(let i of winningPattern){
        let [element1, element2, element3 ]=[ 
        btnRef[i[0]].innerText,
        btnRef[i[1]].innerText,
        btnRef[i[2]].innerText
    ];
    // Check if elements are filled
    // If 3 elements are same and would give win as would
    if(element1 != "" && (element2 !== "") && (element3 != "")){
        if(element1 == element2 && element2 == element3){
    // If all 3 buttons are same values then pass the value to winFunction
    winFunction(element1);
        }
    }
    }
};

// Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click",()=> {
        if(xTurn){
            xTurn=false;
            // Display X
            element.innerText="X";
            element.disabled =true;
        }else{
            xTurn=true;
            // Display O
            element.innerText ="O";
            element.disabled =true;
        }
        // Increment count on each click
        count=count+1;
        if(count == 9) {
            drawFunction();
        }
        // Check for win on every click
        winChecker();
    });
});
// Enable Buttons and disable popup on page load 
window.onload = enableButtons;  