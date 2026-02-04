let box = document.querySelectorAll(".box");
let turn = document.querySelector("#turn");
let restart = document.querySelector("#restart");
let msgContainer = document.querySelector("#msg-container");
let msg = document.querySelector("#msg");
let movesMessage = document.querySelector("#movesMessage");
let newGame = document.querySelector("#new-game");

let moves = 0;

let boxesOfX = [];
let boxesOfO = [];


const showWinner = (winner) => {
    let color = (winner.toLowerCase() == "x") ? "red" : "blue";
    msg.innerHTML = `<b style="color: ${color}; text-transform: uppercase;">${winner}</b> is the Winner`;
    movesMessage.innerHTML = `Game Ended After: <b>${moves} moves</b>`;
    msgContainer.classList.remove("hide");
    disableAllboxes();
};

newGame.addEventListener("click", () => {
    location.reload();
});

restart.addEventListener('click',()=>{
    location.reload();
});

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

const disableAllboxes = ()=>{
    box.forEach(b => {
    b.removeEventListener('mouseover',hoverInEffect);
    b.removeEventListener('mouseout',hoverOutEffect);
    b.removeEventListener('click',playTurn);
});
};

const checkWinners = () => {
    for (let pattern of winPatterns) {
        let val1 = box[pattern[0]].innerText;
        let val2 = box[pattern[1]].innerText;
        let val3 = box[pattern[2]].innerText;
        if(!([val1,val2,val3].includes(""))){
            if(val1 === val2 && val2 === val3){
                console.log(`${val1} Wins!`);
                showWinner(val1);
                return;

            }
        }
    }
}

const hoverInEffect = (e)=>{
    if(turn.innerText === 'X'){
        e.target.innerText = "x";
        e.target.style.color = 'red';
    }
    else{
        e.target.innerText = "o";
        e.target.style.color = 'blue';
    }
    e.target.style.cursor = 'pointer';
}

const hoverOutEffect = (e)=>{
    e.target.innerText = "";
    e.target.style.backgroundColor = 'white';
}


const playTurn = (e)=>{
    if(e.target.innerText !== 'X' && e.target.innerText !== 'O'){
        e.target.classList.add("placed");
        e.target.innerText = turn.innerText;
        e.target.removeEventListener('mouseover',hoverInEffect);
        e.target.removeEventListener('mouseout',hoverOutEffect);
        e.target.style.color = 'white';
        if(turn.innerText === 'X'){
            e.target.style.color = 'red';
            turn.style.color = 'blue';
            turn.innerText = 'O';
            boxesOfX.push(e.target);
            movesOfX++;
        }
        else{
            e.target.style.color = 'blue';
            turn.style.color = 'red';
            turn.innerText = 'X';
            boxesOfO.push(e.target);
            movesOfO++;
        }
        moves++;
        if(boxesOfX.length == 4){
            boxesOfX[0].classList.remove('placed');
            boxesOfX[0].addEventListener('mouseover',hoverInEffect);
            boxesOfX[0].addEventListener('mouseout',hoverOutEffect);
            boxesOfX[0].innerHTML = "";
            boxesOfX.shift();
        }
        if(boxesOfO.length == 4){
            boxesOfO[0].classList.remove('placed');
            boxesOfO[0].addEventListener('mouseover',hoverInEffect);
            boxesOfO[0].addEventListener('mouseout',hoverOutEffect);
            boxesOfO[0].innerHTML = "";
            boxesOfO.shift();
        }
        checkWinners();
    }
}
box.forEach(b => {
    b.addEventListener('mouseover',hoverInEffect);
    b.addEventListener('mouseout',hoverOutEffect);
    b.addEventListener('click',playTurn);
});