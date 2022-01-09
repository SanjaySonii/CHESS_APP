// DECLARATION

const startAudio = new Audio(`Alive2.wav`); //WHEN GAME STARTS
const stepAudio = new Audio(`Step.wav`); // WHEN USER MOVE
const aliveAudio = new Audio(`Alive.wav`); // WHEN USER RELIVE A ELEMENT
const chekmateAudio = new Audio(`checkmate.wav`); // WHEN KING IS IN CHEK
const winAudio = new Audio(`Win.wav`); // WHEN ONE USER WINS
const hitAudio = new Audio(`Hit.wav`); // WHEN USER KILL OTHER'S ELEMENT
var Chess_Board = document.getElementById(`Chess_Board`);
let boxes = document.getElementsByClassName(`box`);
let Chess_Elements = document.getElementsByClassName(`Chess_Elements`);
var myChoice = document.getElementsByClassName(`myChoice`);
var choosed = document.getElementById(`choosed`);
var choice = document.getElementById(`choice`);
var move = document.getElementById(`move`);
var Alive = document.getElementById(`alive`);
let aliveElems = document.getElementsByClassName(`alives`);
let borderElems = document.getElementsByClassName(`border`);
var firstClicked = false;
var selected = "";
var selectedBox;
var turn;
var isDeadBlack;
var isDeadWhite;
var isAliving;
var isDraw;
var notStarted = true;

let refresh = document.getElementById(`refresh`);
refresh.addEventListener(`click`, (e) => {
    window.location.reload();
})

// WHEN USER SELECT HIS/HER CHOICE 

for (const radio of myChoice) {
    radio.addEventListener('click', (e) => {
        notStarted = false;
        startAudio.play();
        if (radio.value == 'White') {
            turn = "White";
            choosed.innerText = "Player 1 : White , Player 2 : Black";
            move.innerHTML = `<div class="Chess_Elements move W white_king">♔</div>
            <h2>White's Move</h2>`;
        }
        else {
            turn = "Black";
            choosed.innerText = "Player 1 : Black , Player 2 : White";
            move.innerHTML = `<div class="Chess_Elements move B black_king">♚</div>
            <h2>Black's Move</h2>`;
        }
        choice.classList.add(`display`);
    })
}


//WHEN USER CLICKED ANY OF THE BOX 

for (const box of boxes) {
    box.addEventListener(`click`, () => {
        if (isDeadBlack || isDeadWhite || isAliving || isDraw || notStarted) {
            if (isAliving) { alert(`please select what you want to alive first`); }
            else if (notStarted) { alert(`please select choice and start the game`); }
            else { alert(`not possible , Please click on the refresh button to play again`); }
        }
        else {
            if (firstClicked) {
                //MOVEMENT OF ELEMENT
                if (box.classList.length == 3) {
                    if (((box.id >= 1 && box.id <= 8)
                        || (box.id >= 57 && box.id <= 64))
                        && (selected == `<div class="Chess_Elements B black_pyada">♟</div>`
                            || selected == `<div class="Chess_Elements W white_pyada">♙</div>`
                        )) {
                        box.innerHTML = selected;
                        selected = "";
                        firstClicked = false;
                        selectedBox.innerHTML = "";
                        selectedBox = null;
                        isAliving = true;
                        alive(box);
                    }
                    else {
                        if (box.innerHTML == ``) {
                            stepAudio.play();
                        } else {
                            hitAudio.play();
                        }
                        box.innerHTML = selected;
                        selected = "";
                        firstClicked = false;
                        selectedBox.innerHTML = "";
                        selectedBox = null;
                    }
                    // CHANGES IN CONTAINER WHEN A MOVEMENT OCCURS
                    if (turn == "White") {
                        turn = "Black";
                        move.innerHTML = `<div class="Chess_Elements move B black_king">♚</div>
                        <h2>Black's Move</h2>`;
                    }
                    else {
                        turn = "White";
                        move.innerHTML = `<div class="Chess_Elements move W white_king">♔</div>
                        <h2>White's Move</h2>`;
                    }

                    for (const box of boxes) {
                        RemoveBorder(box.id)
                    }
                    checkMateSystem();
                }
                else {
                    for (const box of boxes) {
                        RemoveBorder(box.id)
                        firstClicked = false;
                    }
                    checkMateSystem();
                }
            }
            else {
                //CALLING FUNCTIONS ACCORDING TO TURN
                if (turn == "White") {
                    PleaseClickWhite(box);
                }
                else if (turn == "Black") {
                    PleaseClickBlack(box);
                }
            }
            // SCANNER TO CHECK IS KING ALIVE OR NOT ?
            isDeadBlack = true;
            isDeadWhite = true;
            isDraw = true;
            for (const box of boxes) {
                if (box.innerHTML == `<div class="Chess_Elements B black_king">♚</div>`) {
                    isDeadBlack = false; break;
                }
            }
            for (const box of boxes) {
                if (box.innerHTML == `<div class="Chess_Elements W white_king">♔</div>`) {
                    isDeadWhite = false; break;
                }
            }
            for (const box of boxes) {
                var count = 0;
                for (const box of boxes) {
                    if(box.innerHTML != ``){count++}
                }
                if(count > 2){isDraw = false;}
            }
            if (isDeadBlack) {
                move.innerHTML = `<h2>White Wins</h2>`
                hitAudio.pause();
                winAudio.play();
            }
            if (isDeadWhite) {
                hitAudio.pause();
                winAudio.play();
                move.innerHTML = `<h2>Black Wins</h2>`
            }
            if(isDraw){
                hitAudio.play();
                move.innerHTML = `<h2>Oops Match is draw,<br> Click on the REFRESH button to play again</h2>`
            }
        }
    })
}


// declaration of PleaseClickBlack function

function PleaseClickBlack(box) {
    //When user clicked on black pyada

    if (box.innerHTML == `<div class="Chess_Elements B black_pyada">♟</div>`) {
        box.classList.remove(`border`);
        selectedBox = box;
        selected = box.innerHTML;
        firstClicked = true;
        let id = Number(box.id);
        for (const box of boxes) {
            if (id >= 9 && id <= 16) {
                if (box.id == id + 9 || box.id == id + 7) {
                    if (box.innerHTML.includes(`W`)) { AddBorder(box.id) }
                }
                else if (box.id == id + 8 || box.id == id + 16) {
                    if (box.id == id + 8 && box.innerHTML != ``) {
                        RemoveBorder(box.id)
                        RemoveBorder(box.id + 8)
                    }
                    else if (box.id == id + 16 && box.innerHTML != ``) {
                        RemoveBorder(box.id);
                    }
                    else {
                        AddBorder(box.id)
                    }
                }
                else {
                    RemoveBorder(box.id)
                }
            }
            else {
                if (box.id == id + 9 || box.id == id + 7) {
                    if (box.innerHTML.includes(`W`)) { AddBorder(box.id) }
                }
                else if (box.id == id + 8) {
                    if (box.innerHTML != ``) {
                        RemoveBorder(box.id)
                    }
                    else {
                        AddBorder(box.id)
                    }
                }
                else {
                    RemoveBorder(box.id)
                }
            }
        }

    }

    //when user click on the black hathi

    else if (box.innerHTML == `<div class="Chess_Elements B black_hathi">♜</div>`) {
        box.classList.remove(`border`);
        selectedBox = box;
        selected = box.innerHTML;
        firstClicked = true;
        let id = Number(box.id);
        Hathi(id);
    }

    //when user click on the black Camel

    else if (box.innerHTML == `<div class="Chess_Elements B black_camel">♝</div>`) {
        box.classList.remove(`border`);
        selectedBox = box;
        selected = box.innerHTML;
        firstClicked = true;
        let id = Number(box.id);
        Camel(id);
    }

    //when user click on the black vajir

    else if (box.innerHTML == `<div class="Chess_Elements B black_vajir">♛</div>`) {
         box.classList.remove(`border`);
        selectedBox = box;
        selected = box.innerHTML;
        firstClicked = true;
        let id = Number(box.id);
        Hathi(id);
        Camel(id);
    }

    //when user click on the black Horse

    else if (box.innerHTML == `<div class="Chess_Elements B black_horse">♞</div>`) {
         box.classList.remove(`border`);
        selectedBox = box;
        selected = box.innerHTML;
        firstClicked = true;
        let id = Number(box.id);
        Horse(id);
    }

    //when user click on the black king

    else if (box.innerHTML == `<div class="Chess_Elements B black_king">♚</div>`) {
         box.classList.remove(`border`);
        selectedBox = box;
        selected = box.innerHTML;
        firstClicked = true;
        let id = Number(box.id);
        box.classList.remove(`checkmate`);
        King(id)
    }

}

// declaration of PleaseClickBlack function

function PleaseClickWhite(box) {

    //When user clicked on White pyada
    if (box.innerHTML == `<div class="Chess_Elements W white_pyada">♙</div>`) {
        box.classList.remove(`border`);
        selectedBox = box;
        selected = box.innerHTML;
        firstClicked = true;
        let id = Number(box.id);
        for (const box of boxes) {
            if (id >= 49 && id <= 56) {
                if (box.id == id - 9 || box.id == id - 7) {
                    if (box.innerHTML != `` && box.innerHTML.includes(`B`)) { box.classList.add(`border`) }
                }
                else if (box.id == id - 8 || box.id == id - 16) {
                    if (box.id == id - 8 && box.innerHTML != ``) {
                        RemoveBorder(box.id)
                        RemoveBorder(box.id - 8)
                    }
                    else if (box.id == id - 16 && box.innerHTML != ``) {
                        RemoveBorder(box.id);
                    }
                    else {
                        AddBorder(box.id)
                    }
                }
                else {
                    RemoveBorder(box.id)
                }
            }
            else {
                if (box.id == id - 9 || box.id == id - 7) {
                    if (box.innerHTML != `` && box.innerHTML.includes(`B`)) { box.classList.add(`border`) }
                }
                else if (box.id == id - 8) {
                    if (box.innerHTML != ``) {
                        RemoveBorder(box.id);
                    }
                    else {
                        AddBorder(box.id)
                    }
                }
                else {
                    RemoveBorder(box.id);
                }
            }
        }
    }
    // when user clicked on  White hathi
    else if (box.innerHTML == `<div class="Chess_Elements W white_hathi">♖</div>`) {
        box.classList.remove(`border`);
        selectedBox = box;
        selected = box.innerHTML;
        firstClicked = true;
        let id = Number(box.id);
        Hathi(id);
    }

    // when user clicked on White camel

    else if (box.innerHTML == `<div class="Chess_Elements W white_camel">♗</div>`) {
        box.classList.remove(`border`);
        selectedBox = box;
        selected = box.innerHTML;
        firstClicked = true;
        let id = Number(box.id);
        Camel(id);
    }

    // when user clicked on White vajir

    else if (box.innerHTML == `<div class="Chess_Elements W white_vajir">♕</div>` ) {
        box.classList.remove(`border`);
        selectedBox = box;
        selected = box.innerHTML;
        firstClicked = true;
        let id = Number(box.id);
        Hathi(id);
        Camel(id);
    }

    // when user clicked on White horse

    else if (box.innerHTML == `<div class="Chess_Elements W white_horse">♘</div>`
    ) {
        box.classList.remove(`border`);
        selectedBox = box;
        selected = box.innerHTML;
        firstClicked = true;
        let id = Number(box.id);
        Horse(id);
    }

    // when user clicked on  White king

    else if (box.innerHTML == `<div class="Chess_Elements W white_king">♔</div>`
    ) { box.classList.remove(`border`);
        selectedBox = box;
        selected = box.innerHTML;
        firstClicked = true;
        let id = Number(box.id);
        box.classList.remove(`checkmate`);
        King(id)
    }
}



// King function

function King(id) {
    // WHEN WHITE'S TURN
    if (turn == `White`) {
        //  WHEN KING IS ON THE 1ST LINE
        if (id % 8 == 1) {
            if (id == 1) {
                if (!boxes[id].innerHTML.includes(`W`)) { AddBorder(id + 1); }
                if (!boxes[id + 8].innerHTML.includes(`W`)) { AddBorder(id + 9); }
                if (!boxes[id + 7].innerHTML.includes(`W`)) { AddBorder(id + 8); }
            }
            else if (id == 57) {
                if (!boxes[id - 9].innerHTML.includes(`W`)) { AddBorder(id - 8); }
                if (!boxes[id - 8].innerHTML.includes(`W`)) { AddBorder(id - 7); }
                if (!boxes[id].innerHTML.includes(`W`)) { AddBorder(id + 1); }
            }
            else {
                if (!boxes[id].innerHTML.includes(`W`)) { AddBorder(id + 1); }
                if (!boxes[id + 8].innerHTML.includes(`W`)) { AddBorder(id + 9); }
                if (!boxes[id + 7].innerHTML.includes(`W`)) { AddBorder(id + 8); }
                if (!boxes[id - 9].innerHTML.includes(`W`)) { AddBorder(id - 8); }
                if (!boxes[id - 8].innerHTML.includes(`W`)) { AddBorder(id - 7); }
            }
        }
        //  WHEN KING IS ON THE 8TH LINE
        else if (id % 8 == 0) {
            if (id == 8) {
                if (!boxes[id - 2].innerHTML.includes(`W`)) { AddBorder(id - 1); }
                if (!boxes[id + 6].innerHTML.includes(`W`)) { AddBorder(id + 7); }
                if (!boxes[id + 7].innerHTML.includes(`W`)) { AddBorder(id + 8); }
            }
            else if (id == 64) {
                if (!boxes[id - 2].innerHTML.includes(`W`)) { AddBorder(id - 1); }
                if (!boxes[id - 10].innerHTML.includes(`W`)) { AddBorder(id - 9); }
                if (!boxes[id - 9].innerHTML.includes(`W`)) { AddBorder(id - 8); }
            }
            else {
                if (!boxes[id + 6].innerHTML.includes(`W`)) { AddBorder(id + 7); }
                if (!boxes[id + 7].innerHTML.includes(`W`)) { AddBorder(id + 8); }
                if (!boxes[id - 2].innerHTML.includes(`W`)) { AddBorder(id - 1); }
                if (!boxes[id - 10].innerHTML.includes(`W`)) { AddBorder(id - 9); }
                if (!boxes[id - 9].innerHTML.includes(`W`)) { AddBorder(id - 8); }
            }
        }
        //  WHEN KING IS ON THE 1ST ROW AND IN BETWEEN 2ND TO 7TH BOX
        else if (id >= 2 && id <= 7) {
            if (!boxes[id].innerHTML.includes(`W`)) { AddBorder(id + 1); }
            if (!boxes[id + 7].innerHTML.includes(`W`)) { AddBorder(id + 8); }
            if (!boxes[id - 2].innerHTML.includes(`W`)) { AddBorder(id - 1); }
            if (!boxes[id + 6].innerHTML.includes(`W`)) { AddBorder(id + 7); }
            if (!boxes[id + 8].innerHTML.includes(`W`)) { AddBorder(id + 9); }
        }
        //  WHEN KING IS ON THE 8TH ROW AND IN BETWEEN 58TH TO 63TH BOX
        else if (id >= 58 && id <= 63) {
            if (!boxes[id].innerHTML.includes(`W`)) { AddBorder(id + 1); }
            if (!boxes[id - 10].innerHTML.includes(`W`)) { AddBorder(id - 9); }
            if (!boxes[id - 2].innerHTML.includes(`W`)) { AddBorder(id - 1); }
            if (!boxes[id - 9].innerHTML.includes(`W`)) { AddBorder(id - 8); }
            if (!boxes[id - 8].innerHTML.includes(`W`)) { AddBorder(id - 7); }
        }
        //  WHEN KING IS IN BETWEEN 2ND TO 7TH ROW
        else {
            if (!boxes[id].innerHTML.includes(`W`)) { AddBorder(id + 1); }
            if (!boxes[id - 10].innerHTML.includes(`W`)) { AddBorder(id - 9); }
            if (!boxes[id - 2].innerHTML.includes(`W`)) { AddBorder(id - 1); }
            if (!boxes[id - 9].innerHTML.includes(`W`)) { AddBorder(id - 8); }
            if (!boxes[id - 8].innerHTML.includes(`W`)) { AddBorder(id - 7); }
            if (!boxes[id + 6].innerHTML.includes(`W`)) { AddBorder(id + 7); }
            if (!boxes[id + 8].innerHTML.includes(`W`)) { AddBorder(id + 9); }
            if (!boxes[id + 7].innerHTML.includes(`W`)) { AddBorder(id + 8); }
        }
    }
    // WHEN BLACK'S TURN
    else {
        // WHEN KING IS ON THE 1ST LINE
        if (id % 8 == 1) {
            if (id == 1) {
                if (!boxes[id].innerHTML.includes(`B`)) { AddBorder(id + 1); }
                if (!boxes[id + 8].innerHTML.includes(`B`)) { AddBorder(id + 9); }
                if (!boxes[id + 7].innerHTML.includes(`B`)) { AddBorder(id + 8); }
            }
            else if (id == 57) {
                if (!boxes[id - 9].innerHTML.includes(`B`)) { AddBorder(id - 8); }
                if (!boxes[id - 8].innerHTML.includes(`B`)) { AddBorder(id - 7); }
                if (!boxes[id].innerHTML.includes(`B`)) { AddBorder(id + 1); }
            }
            else {
                if (!boxes[id].innerHTML.includes(`B`)) { AddBorder(id + 1); }
                if (!boxes[id + 8].innerHTML.includes(`B`)) { AddBorder(id + 9); }
                if (!boxes[id + 7].innerHTML.includes(`B`)) { AddBorder(id + 8); }
                if (!boxes[id - 9].innerHTML.includes(`B`)) { AddBorder(id - 8); }
                if (!boxes[id - 8].innerHTML.includes(`B`)) { AddBorder(id - 7); }
            }
        }
        // WHEN KING IS ON THE 8TH LINE
        else if (id % 8 == 0) {
            if (id == 8) {
                if (!boxes[id - 2].innerHTML.includes(`B`)) { AddBorder(id - 1); }
                if (!boxes[id + 6].innerHTML.includes(`B`)) { AddBorder(id + 7); }
                if (!boxes[id + 7].innerHTML.includes(`B`)) { AddBorder(id + 8); }
            }
            else if (id == 64) {
                if (!boxes[id - 2].innerHTML.includes(`B`)) { AddBorder(id - 1); }
                if (!boxes[id - 10].innerHTML.includes(`B`)) { AddBorder(id - 9); }
                if (!boxes[id - 9].innerHTML.includes(`B`)) { AddBorder(id - 8); }
            }
            else {
                if (!boxes[id + 6].innerHTML.includes(`B`)) { AddBorder(id + 7); }
                if (!boxes[id + 7].innerHTML.includes(`B`)) { AddBorder(id + 8); }
                if (!boxes[id - 2].innerHTML.includes(`B`)) { AddBorder(id - 1); }
                if (!boxes[id - 10].innerHTML.includes(`B`)) { AddBorder(id - 9); }
                if (!boxes[id - 9].innerHTML.includes(`B`)) { AddBorder(id - 8); }
            }
        }
        // WHEN KING IS ON THE 1ST ROW AND IN BETWEEN 2ND TO 7TH BOX
        else if (id >= 2 && id <= 7) {
            if (!boxes[id].innerHTML.includes(`B`)) { AddBorder(id + 1); }
            if (!boxes[id + 7].innerHTML.includes(`B`)) { AddBorder(id + 8); }
            if (!boxes[id - 2].innerHTML.includes(`B`)) { AddBorder(id - 1); }
            if (!boxes[id + 6].innerHTML.includes(`B`)) { AddBorder(id + 7); }
            if (!boxes[id + 8].innerHTML.includes(`B`)) { AddBorder(id + 9); }
        }
        // WHEN KING IS ON THE 8TH ROW AND IN BETWEEN 58TH TO 63TH BOX
        else if (id >= 58 && id <= 63) {
            if (!boxes[id].innerHTML.includes(`B`)) { AddBorder(id + 1); }
            if (!boxes[id - 10].innerHTML.includes(`B`)) { AddBorder(id - 9); }
            if (!boxes[id - 2].innerHTML.includes(`B`)) { AddBorder(id - 1); }
            if (!boxes[id - 9].innerHTML.includes(`B`)) { AddBorder(id - 8); }
            if (!boxes[id - 8].innerHTML.includes(`B`)) { AddBorder(id - 7); }
        }
        // WHEN KING IS IN BETWEEN 2ND TO 7TH ROW
        else {
            if (!boxes[id].innerHTML.includes(`B`)) { AddBorder(id + 1); }
            if (!boxes[id - 10].innerHTML.includes(`B`)) { AddBorder(id - 9); }
            if (!boxes[id - 2].innerHTML.includes(`B`)) { AddBorder(id - 1); }
            if (!boxes[id - 9].innerHTML.includes(`B`)) { AddBorder(id - 8); }
            if (!boxes[id - 8].innerHTML.includes(`B`)) { AddBorder(id - 7); }
            if (!boxes[id + 6].innerHTML.includes(`B`)) { AddBorder(id + 7); }
            if (!boxes[id + 8].innerHTML.includes(`B`)) { AddBorder(id + 9); }
            if (!boxes[id + 7].innerHTML.includes(`B`)) { AddBorder(id + 8); }
        }
    }
}


// Horse function

function Horse(id) {
    // WHEN WHITES TURN
    if (turn == `White`) {
        //WHEN HORSE IS ON THE 2ND LINE
        if (id % 8 == 2) {
            if (id == 2) {
                if (!boxes[id + 14].innerHTML.includes(`W`)) { AddBorder(id + 15); }
                if (!boxes[id + 9].innerHTML.includes(`W`)) { AddBorder(id + 10); }
                if (!boxes[id + 16].innerHTML.includes(`W`)) { AddBorder(id + 17); }
            }
            else if (id == 10) {
                if (!boxes[id + 14].innerHTML.includes(`W`)) { AddBorder(id + 15); }
                if (!boxes[id + 9].innerHTML.includes(`W`)) { AddBorder(id + 10); }
                if (!boxes[id + 16].innerHTML.includes(`W`)) { AddBorder(id + 17); }
                if (!boxes[id - 7].innerHTML.includes(`W`)) { AddBorder(id - 6); }
            }
            else if (id == 58) {
                if (!boxes[id - 7].innerHTML.includes(`W`)) { AddBorder(id - 6); }
                if (!boxes[id - 16].innerHTML.includes(`W`)) { AddBorder(id - 15); }
                if (!boxes[id - 18].innerHTML.includes(`W`)) { AddBorder(id - 17); }
            }
            else if (id == 50) {
                if (!boxes[id - 7].innerHTML.includes(`W`)) { AddBorder(id - 6); }
                if (!boxes[id - 16].innerHTML.includes(`W`)) { AddBorder(id - 15); }
                if (!boxes[id - 18].innerHTML.includes(`W`)) { AddBorder(id - 17); }
                if (!boxes[id + 9].innerHTML.includes(`W`)) { AddBorder(id + 10); }
            }
            else {
                if (!boxes[id - 7].innerHTML.includes(`W`)) { AddBorder(id - 6); }
                if (!boxes[id - 16].innerHTML.includes(`W`)) { AddBorder(id - 15); }
                if (!boxes[id - 18].innerHTML.includes(`W`)) { AddBorder(id - 17); }
                if (!boxes[id + 9].innerHTML.includes(`W`)) { AddBorder(id + 10); }
                if (!boxes[id + 14].innerHTML.includes(`W`)) { AddBorder(id + 15); }
                if (!boxes[id + 16].innerHTML.includes(`W`)) { AddBorder(id + 17); }
            }
        }
        //WHEN HORSE IS ON THE 1ST LINE
        else if (id % 8 == 1) {
            if (id == 1) {
                if (!boxes[id + 9].innerHTML.includes(`W`)) { AddBorder(id + 10); }
                if (!boxes[id + 16].innerHTML.includes(`W`)) { AddBorder(id + 17); }
            }
            else if (id == 9) {
                if (!boxes[id - 7].innerHTML.includes(`W`)) { AddBorder(id - 6); }
                if (!boxes[id + 9].innerHTML.includes(`W`)) { AddBorder(id + 10); }
                if (!boxes[id + 16].innerHTML.includes(`W`)) { AddBorder(id + 17); }

            }
            else if (id == 57) {
                if (!boxes[id - 7].innerHTML.includes(`W`)) { AddBorder(id - 6); }
                if (!boxes[id - 16].innerHTML.includes(`W`)) { AddBorder(id - 15); }
            }
            else if (id == 49) {
                if (!boxes[id - 7].innerHTML.includes(`W`)) { AddBorder(id - 6); }
                if (!boxes[id - 16].innerHTML.includes(`W`)) { AddBorder(id - 15); }
                if (!boxes[id + 9].innerHTML.includes(`W`)) { AddBorder(id + 10); }
            }
            else {
                if (!boxes[id - 7].innerHTML.includes(`W`)) { AddBorder(id - 6); }
                if (!boxes[id - 16].innerHTML.includes(`W`)) { AddBorder(id - 15); }
                if (!boxes[id + 9].innerHTML.includes(`W`)) { AddBorder(id + 10); }
                if (!boxes[id + 16].innerHTML.includes(`W`)) { AddBorder(id + 17); }
            }
        }
        //WHEN HORSE IS ON THE 8TH LINE
        else if (id % 8 == 0) {
            if (id == 8) {
                if (!boxes[id + 5].innerHTML.includes(`W`)) { AddBorder(id + 6); }
                if (!boxes[id + 14].innerHTML.includes(`W`)) { AddBorder(id + 15); }
            }
            else if (id == 16) {
                if (!boxes[id + 5].innerHTML.includes(`W`)) { AddBorder(id + 6); }
                if (!boxes[id + 14].innerHTML.includes(`W`)) { AddBorder(id + 15); }
                if (!boxes[id - 11].innerHTML.includes(`W`)) { AddBorder(id - 10); }
            }
            else if (id == 64) {
                if (!boxes[id - 11].innerHTML.includes(`W`)) { AddBorder(id - 10); }
                if (!boxes[id - 18].innerHTML.includes(`W`)) { AddBorder(id - 17); }
            }
            else if (id == 56) {
                if (!boxes[id - 11].innerHTML.includes(`W`)) { AddBorder(id - 10); }
                if (!boxes[id - 18].innerHTML.includes(`W`)) { AddBorder(id - 17); }
                if (!boxes[id + 5].innerHTML.includes(`W`)) { AddBorder(id + 6); }
            }
            else {
                if (!boxes[id - 11].innerHTML.includes(`W`)) { AddBorder(id - 10); }
                if (!boxes[id - 18].innerHTML.includes(`W`)) { AddBorder(id - 17); }
                if (!boxes[id + 5].innerHTML.includes(`W`)) { AddBorder(id + 6); }
                if (!boxes[id + 14].innerHTML.includes(`W`)) { AddBorder(id + 15); }
            }
        }
        //WHEN HORSE IS ON THE 7TH LINE
        else if (id % 8 == 7) {
            if (id == 7) {
                if (!boxes[id + 14].innerHTML.includes(`W`)) { AddBorder(id + 15); }
                if (!boxes[id + 16].innerHTML.includes(`W`)) { AddBorder(id + 17); }
                if (!boxes[id + 5].innerHTML.includes(`W`)) { AddBorder(id + 6); }
            }
            else if (id == 15) {
                if (!boxes[id + 14].innerHTML.includes(`W`)) { AddBorder(id + 15); }
                if (!boxes[id + 16].innerHTML.includes(`W`)) { AddBorder(id + 17); }
                if (!boxes[id + 5].innerHTML.includes(`W`)) { AddBorder(id + 6); }
                if (!boxes[id - 11].innerHTML.includes(`W`)) { AddBorder(id - 10); }
            }
            else if (id == 63) {
                if (!boxes[id - 16].innerHTML.includes(`W`)) { AddBorder(id - 15); }
                if (!boxes[id - 18].innerHTML.includes(`W`)) { AddBorder(id - 17); }
                if (!boxes[id - 11].innerHTML.includes(`W`)) { AddBorder(id - 10); }
            }
            else if (id == 55) {
                if (!boxes[id - 16].innerHTML.includes(`W`)) { AddBorder(id - 15); }
                if (!boxes[id - 18].innerHTML.includes(`W`)) { AddBorder(id - 17); }
                if (!boxes[id - 11].innerHTML.includes(`W`)) { AddBorder(id - 10); }
                if (!boxes[id + 5].innerHTML.includes(`W`)) { AddBorder(id + 6); }
            }
            else {
                if (!boxes[id - 16].innerHTML.includes(`W`)) { AddBorder(id - 15); }
                if (!boxes[id - 18].innerHTML.includes(`W`)) { AddBorder(id - 17); }
                if (!boxes[id - 11].innerHTML.includes(`W`)) { AddBorder(id - 10); }
                if (!boxes[id + 14].innerHTML.includes(`W`)) { AddBorder(id + 15); }
                if (!boxes[id + 16].innerHTML.includes(`W`)) { AddBorder(id + 17); }
                if (!boxes[id + 5].innerHTML.includes(`W`)) { AddBorder(id + 6); }
            }
        }
        //WHEN HORSE IS ON THE 1 ROW AND BETWEEN 3RD BOX TO 6TH BOX LINE
        else if (id >= 3 && id <= 6) {
            if (!boxes[id + 5].innerHTML.includes(`W`)) { AddBorder(id + 6); }
            if (!boxes[id + 9].innerHTML.includes(`W`)) { AddBorder(id + 10); }
            if (!boxes[id + 16].innerHTML.includes(`W`)) { AddBorder(id + 17); }
            if (!boxes[id + 14].innerHTML.includes(`W`)) { AddBorder(id + 15); }
        }
        //WHEN HORSE IS ON THE 2 ROW AND BETWEEN 11TH BOX TO 14TH BOX LINE
        else if (id >= 11 && id <= 14) {
            if (!boxes[id + 5].innerHTML.includes(`W`)) { AddBorder(id + 6); }
            if (!boxes[id + 9].innerHTML.includes(`W`)) { AddBorder(id + 10); }
            if (!boxes[id + 16].innerHTML.includes(`W`)) { AddBorder(id + 17); }
            if (!boxes[id + 14].innerHTML.includes(`W`)) { AddBorder(id + 15); }
            if (!boxes[id - 11].innerHTML.includes(`W`)) { AddBorder(id - 10); }
            if (!boxes[id - 7].innerHTML.includes(`W`)) { AddBorder(id - 6); }
        }
        //WHEN HORSE IS ON THE 8 ROW AND BETWEEN 59TH BOX TO 62TH BOX LINE
        else if (id >= 59 && id <= 62) {
            if (!boxes[id - 18].innerHTML.includes(`W`)) { AddBorder(id - 17); }
            if (!boxes[id - 16].innerHTML.includes(`W`)) { AddBorder(id - 15); }
            if (!boxes[id - 11].innerHTML.includes(`W`)) { AddBorder(id - 10); }
            if (!boxes[id - 7].innerHTML.includes(`W`)) { AddBorder(id - 6); }
        }
        //WHEN HORSE IS ON THE 7 ROW AND BETWEEN 51TH BOX TO 54TH BOX LINE
        else if (id >= 51 && id <= 54) {
            if (!boxes[id - 18].innerHTML.includes(`W`)) { AddBorder(id - 17); }
            if (!boxes[id - 16].innerHTML.includes(`W`)) { AddBorder(id - 15); }
            if (!boxes[id - 11].innerHTML.includes(`W`)) { AddBorder(id - 10); }
            if (!boxes[id - 7].innerHTML.includes(`W`)) { AddBorder(id - 6); }
            if (!boxes[id + 9].innerHTML.includes(`W`)) { AddBorder(id + 10); }
            if (!boxes[id + 5].innerHTML.includes(`W`)) { AddBorder(id + 6); }
        }
        //WHEN HORSE IS IN BETWEEN 3RD TO 6TH ROW
        else {
            if (!boxes[id - 11].innerHTML.includes(`W`)) { AddBorder(id - 10); }
            if (!boxes[id + 5].innerHTML.includes(`W`)) { AddBorder(id + 6); }
            if (!boxes[id - 7].innerHTML.includes(`W`)) { AddBorder(id - 6); }
            if (!boxes[id + 9].innerHTML.includes(`W`)) { AddBorder(id + 10); }
            if (!boxes[id - 18].innerHTML.includes(`W`)) { AddBorder(id - 17); }
            if (!boxes[id - 16].innerHTML.includes(`W`)) { AddBorder(id - 15); }
            if (!boxes[id + 16].innerHTML.includes(`W`)) { AddBorder(id + 17); }
            if (!boxes[id + 14].innerHTML.includes(`W`)) { AddBorder(id + 15); }
        }
    }
    // WHEN BLACK'S TURN
    else {
        // WHEN HORSE IS ON THE 2ND LINE
        if (id % 8 == 2) {
            if (id == 2) {
                if (!boxes[id + 14].innerHTML.includes(`B`)) { AddBorder(id + 15); }
                if (!boxes[id + 9].innerHTML.includes(`B`)) { AddBorder(id + 10); }
                if (!boxes[id + 16].innerHTML.includes(`B`)) { AddBorder(id + 17); }
            }
            else if (id == 10) {
                if (!boxes[id + 14].innerHTML.includes(`B`)) { AddBorder(id + 15); }
                if (!boxes[id + 9].innerHTML.includes(`B`)) { AddBorder(id + 10); }
                if (!boxes[id + 16].innerHTML.includes(`B`)) { AddBorder(id + 17); }
                if (!boxes[id - 7].innerHTML.includes(`B`)) { AddBorder(id - 6); }
            }
            else if (id == 58) {
                if (!boxes[id - 7].innerHTML.includes(`B`)) { AddBorder(id - 6); }
                if (!boxes[id - 16].innerHTML.includes(`B`)) { AddBorder(id - 15); }
                if (!boxes[id - 18].innerHTML.includes(`B`)) { AddBorder(id - 17); }
            }
            else if (id == 50) {
                if (!boxes[id - 7].innerHTML.includes(`B`)) { AddBorder(id - 6); }
                if (!boxes[id - 16].innerHTML.includes(`B`)) { AddBorder(id - 15); }
                if (!boxes[id - 18].innerHTML.includes(`B`)) { AddBorder(id - 17); }
                if (!boxes[id + 9].innerHTML.includes(`B`)) { AddBorder(id + 10); }
            }
            else {
                if (!boxes[id - 7].innerHTML.includes(`B`)) { AddBorder(id - 6); }
                if (!boxes[id - 16].innerHTML.includes(`B`)) { AddBorder(id - 15); }
                if (!boxes[id - 18].innerHTML.includes(`B`)) { AddBorder(id - 17); }
                if (!boxes[id + 9].innerHTML.includes(`B`)) { AddBorder(id + 10); }
                if (!boxes[id + 14].innerHTML.includes(`B`)) { AddBorder(id + 15); }
                if (!boxes[id + 16].innerHTML.includes(`B`)) { AddBorder(id + 17); }
            }
        }
        // WHEN HORSE IS ON THE 1ST LINE
        else if (id % 8 == 1) {
            if (id == 1) {
                if (!boxes[id + 9].innerHTML.includes(`B`)) { AddBorder(id + 10); }
                if (!boxes[id + 16].innerHTML.includes(`B`)) { AddBorder(id + 17); }
            }
            else if (id == 9) {
                if (!boxes[id - 7].innerHTML.includes(`B`)) { AddBorder(id - 6); }
                if (!boxes[id + 9].innerHTML.includes(`B`)) { AddBorder(id + 10); }
                if (!boxes[id + 16].innerHTML.includes(`B`)) { AddBorder(id + 17); }

            }
            else if (id == 57) {
                if (!boxes[id - 7].innerHTML.includes(`B`)) { AddBorder(id - 6); }
                if (!boxes[id - 16].innerHTML.includes(`B`)) { AddBorder(id - 15); }
            }
            else if (id == 49) {
                if (!boxes[id - 7].innerHTML.includes(`B`)) { AddBorder(id - 6); }
                if (!boxes[id - 16].innerHTML.includes(`B`)) { AddBorder(id - 15); }
                if (!boxes[id + 9].innerHTML.includes(`B`)) { AddBorder(id + 10); }
            }
            else {
                if (!boxes[id - 7].innerHTML.includes(`B`)) { AddBorder(id - 6); }
                if (!boxes[id - 16].innerHTML.includes(`B`)) { AddBorder(id - 15); }
                if (!boxes[id + 9].innerHTML.includes(`B`)) { AddBorder(id + 10); }
                if (!boxes[id + 16].innerHTML.includes(`B`)) { AddBorder(id + 17); }
            }
        }
        // WHEN HORSE IS ON THE 8TH LINE
        else if (id % 8 == 0) {
            if (id == 8) {
                if (!boxes[id + 5].innerHTML.includes(`B`)) { AddBorder(id + 6); }
                if (!boxes[id + 14].innerHTML.includes(`B`)) { AddBorder(id + 15); }
            }
            else if (id == 16) {
                if (!boxes[id + 5].innerHTML.includes(`B`)) { AddBorder(id + 6); }
                if (!boxes[id + 14].innerHTML.includes(`B`)) { AddBorder(id + 15); }
                if (!boxes[id - 11].innerHTML.includes(`B`)) { AddBorder(id - 10); }
            }
            else if (id == 64) {
                if (!boxes[id - 11].innerHTML.includes(`B`)) { AddBorder(id - 10); }
                if (!boxes[id - 18].innerHTML.includes(`B`)) { AddBorder(id - 17); }
            }
            else if (id == 56) {
                if (!boxes[id - 11].innerHTML.includes(`B`)) { AddBorder(id - 10); }
                if (!boxes[id - 18].innerHTML.includes(`B`)) { AddBorder(id - 17); }
                if (!boxes[id + 5].innerHTML.includes(`B`)) { AddBorder(id + 6); }
            }
            else {
                if (!boxes[id - 11].innerHTML.includes(`B`)) { AddBorder(id - 10); }
                if (!boxes[id - 18].innerHTML.includes(`B`)) { AddBorder(id - 17); }
                if (!boxes[id + 5].innerHTML.includes(`B`)) { AddBorder(id + 6); }
                if (!boxes[id + 14].innerHTML.includes(`B`)) { AddBorder(id + 15); }
            }
        }
        // WHEN HORSE IS ON THE 7TH LINE
        else if (id % 8 == 7) {
            if (id == 7) {
                if (!boxes[id + 14].innerHTML.includes(`B`)) { AddBorder(id + 15); }
                if (!boxes[id + 16].innerHTML.includes(`B`)) { AddBorder(id + 17); }
                if (!boxes[id + 5].innerHTML.includes(`B`)) { AddBorder(id + 6); }
            }
            else if (id == 15) {
                if (!boxes[id + 14].innerHTML.includes(`B`)) { AddBorder(id + 15); }
                if (!boxes[id + 16].innerHTML.includes(`B`)) { AddBorder(id + 17); }
                if (!boxes[id + 5].innerHTML.includes(`B`)) { AddBorder(id + 6); }
                if (!boxes[id - 11].innerHTML.includes(`B`)) { AddBorder(id - 10); }
            }
            else if (id == 63) {
                if (!boxes[id - 16].innerHTML.includes(`B`)) { AddBorder(id - 15); }
                if (!boxes[id - 18].innerHTML.includes(`B`)) { AddBorder(id - 17); }
                if (!boxes[id - 11].innerHTML.includes(`B`)) { AddBorder(id - 10); }
            }
            else if (id == 55) {
                if (!boxes[id - 16].innerHTML.includes(`B`)) { AddBorder(id - 15); }
                if (!boxes[id - 18].innerHTML.includes(`B`)) { AddBorder(id - 17); }
                if (!boxes[id - 11].innerHTML.includes(`B`)) { AddBorder(id - 10); }
                if (!boxes[id + 5].innerHTML.includes(`B`)) { AddBorder(id + 6); }
            }
            else {
                if (!boxes[id - 16].innerHTML.includes(`B`)) { AddBorder(id - 15); }
                if (!boxes[id - 18].innerHTML.includes(`B`)) { AddBorder(id - 17); }
                if (!boxes[id - 11].innerHTML.includes(`B`)) { AddBorder(id - 10); }
                if (!boxes[id + 14].innerHTML.includes(`B`)) { AddBorder(id + 15); }
                if (!boxes[id + 16].innerHTML.includes(`B`)) { AddBorder(id + 17); }
                if (!boxes[id + 5].innerHTML.includes(`B`)) { AddBorder(id + 6); }
            }
        }
        // WHEN HORSE IS ON THE 1ST ROW AND IN BETWEEN 3RD TO 6TH BOX
        else if (id >= 3 && id <= 6) {
            if (!boxes[id + 5].innerHTML.includes(`B`)) { AddBorder(id + 6); }
            if (!boxes[id + 9].innerHTML.includes(`B`)) { AddBorder(id + 10); }
            if (!boxes[id + 16].innerHTML.includes(`B`)) { AddBorder(id + 17); }
            if (!boxes[id + 14].innerHTML.includes(`B`)) { AddBorder(id + 15); }
        }
        // WHEN HORSE IS ON THE 2ND ROW AND IN BETWEEN 11RD TO 14TH BOX
        else if (id >= 11 && id <= 14) {
            if (!boxes[id + 5].innerHTML.includes(`B`)) { AddBorder(id + 6); }
            if (!boxes[id + 9].innerHTML.includes(`B`)) { AddBorder(id + 10); }
            if (!boxes[id + 16].innerHTML.includes(`B`)) { AddBorder(id + 17); }
            if (!boxes[id + 14].innerHTML.includes(`B`)) { AddBorder(id + 15); }
            if (!boxes[id - 11].innerHTML.includes(`B`)) { AddBorder(id - 10); }
            if (!boxes[id - 7].innerHTML.includes(`B`)) { AddBorder(id - 6); }
        }
        // WHEN HORSE IS ON THE 8TH ROW AND IN BETWEEN 59RD TO 62TH BOX
        else if (id >= 59 && id <= 62) {
            if (!boxes[id - 18].innerHTML.includes(`B`)) { AddBorder(id - 17); }
            if (!boxes[id - 16].innerHTML.includes(`B`)) { AddBorder(id - 15); }
            if (!boxes[id - 11].innerHTML.includes(`B`)) { AddBorder(id - 10); }
            if (!boxes[id - 7].innerHTML.includes(`B`)) { AddBorder(id - 6); }
        }
        // WHEN HORSE IS ON THE 7TH ROW AND IN BETWEEN 51RD TO 54TH BOX
        else if (id >= 51 && id <= 54) {
            if (!boxes[id - 18].innerHTML.includes(`B`)) { AddBorder(id - 17); }
            if (!boxes[id - 16].innerHTML.includes(`B`)) { AddBorder(id - 15); }
            if (!boxes[id - 11].innerHTML.includes(`B`)) { AddBorder(id - 10); }
            if (!boxes[id - 7].innerHTML.includes(`B`)) { AddBorder(id - 6); }
            if (!boxes[id + 9].innerHTML.includes(`B`)) { AddBorder(id + 10); }
            if (!boxes[id + 5].innerHTML.includes(`B`)) { AddBorder(id + 6); }
        }
        // WHEN HORSE IS IN BETWEEN 3RD TO 6TH ROW
        else {
            if (!boxes[id - 11].innerHTML.includes(`B`)) { AddBorder(id - 10); }
            if (!boxes[id + 5].innerHTML.includes(`B`)) { AddBorder(id + 6); }
            if (!boxes[id - 7].innerHTML.includes(`B`)) { AddBorder(id - 6); }
            if (!boxes[id + 9].innerHTML.includes(`B`)) { AddBorder(id + 10); }
            if (!boxes[id - 18].innerHTML.includes(`B`)) { AddBorder(id - 17); }
            if (!boxes[id - 16].innerHTML.includes(`B`)) { AddBorder(id - 15); }
            if (!boxes[id + 16].innerHTML.includes(`B`)) { AddBorder(id + 17); }
            if (!boxes[id + 14].innerHTML.includes(`B`)) { AddBorder(id + 15); }
        }
    }
}



// Hathi function

function Hathi(id) {
    // WHEN USER IS ON THE 8TH LINE
    if (id % 8 == 0) {
        var right = id;
        var left = id - 8;
    }
    // WHEN USER IS NOT ON THE 8TH LINE
    else {
        right = id + 8 - id % 8;
        left = id - id % 8;
    }
    // WHEN WHITE'S TURN
    if (turn == `White`) {
        // FOR LOOP FOR LEFT
        for (let i = id - 2; i >= left; i--) {
            if (boxes[i].innerHTML.includes(`W`)) { break; }
            else if (boxes[i].innerHTML == ``) { AddBorder(i + 1); }
            else if (boxes[i].innerHTML.includes(`B`)) { AddBorder(i + 1); break; }
        }
        // FOR LOOP FOR RIGHT
        for (let i = id + 1; i <= right; i++) {
            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
            else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
            else if (boxes[i - 1].innerHTML.includes(`B`)) { AddBorder(i); break; }
        }
        // FOR LOOP FOR UPPER
        for (let i = id - 8; i >= 1; i = i - 8) {
            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
            else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
            else if (boxes[i - 1].innerHTML.includes(`B`)) { AddBorder(i); break; }
        }
        // FOR LOOP FOR LOWER
        for (let i = id + 8; i <= 64; i = i + 8) {
            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
            else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
            else if (boxes[i - 1].innerHTML.includes(`B`)) { AddBorder(i); break; }
        }
        RemoveBorder(id)
    }
    // WHEN BLACK'S TURN
    else {
        // FOR LOOP FOR LEFT
        for (let i = id - 2; i >= left; i--) {
            if (boxes[i].innerHTML.includes(`B`)) { break; }
            else if (boxes[i].innerHTML == ``) { AddBorder(i + 1); }
            else if (boxes[i].innerHTML.includes(`W`)) { AddBorder(i + 1); break; }
        }
        // FOR LOOP FOR RIGHT
        for (let i = id + 1; i <= right; i++) {
            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
            else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
            else if (boxes[i - 1].innerHTML.includes(`W`)) { AddBorder(i); break; }
        }
        // FOR LOOP FOR UPPER
        for (let i = id - 8; i >= 1; i = i - 8) {
            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
            else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
            else if (boxes[i - 1].innerHTML.includes(`W`)) { AddBorder(i); break; }
        }
        // FOR LOOP FOR LOWER
        for (let i = id + 8; i <= 64; i = i + 8) {
            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
            else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
            else if (boxes[i - 1].innerHTML.includes(`W`)) { AddBorder(i); break; }
        }
        RemoveBorder(id)
    }
}


// Camel function

function Camel(id) {
    // WHEN WHITE'S TURN
    if (turn == `White`) {
        // WHEN CAMEL IS ON THE 8TH LINE
        if (id % 8 == 0) {
            // FOR LOOP FOR DIAGONALLY UPPER-LEFT 
            for (i = id - 9; i >= 1; i = i - 9) {
                if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
                else if (boxes[i - 1].innerHTML.includes(`B`)) { AddBorder(i); break; }

            }
            // FOR LOOP FOR DIAGONALLY LOWER-LEFT 
            for (i = id + 7; i <= 64; i = i + 7) {
                if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
                else if (boxes[i - 1].innerHTML.includes(`B`)) { AddBorder(i); break; }

            }
        }
        else {
            // FOR LOOP FOR DIAGONALLY UPPER-RIGHT
            for (i = id - 7; i >= 1; i = i - 7) {
                if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
                else if (boxes[i - 1].innerHTML.includes(`B`)) { AddBorder(i); break; }
                if (i % 8 == 0) {
                    break;
                }
            }
            // FOR LOOP FOR DIAGONALLY UPPER-LEFT 
            for (i = id - 9; i >= 1; i = i - 9) {
                if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
                else if (boxes[i - 1].innerHTML.includes(`B`)) { AddBorder(i); break; }
                if (i % 8 == 0 || i % 8 == 1) {
                    break;
                }
            }
            // FOR LOOP FOR DIAGONALLY LOWER-LEFT 
            for (i = id + 7; i <= 64; i = i + 7) {
                if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
                else if (boxes[i - 1].innerHTML.includes(`B`)) { AddBorder(i); break; }
                if (i % 8 == 0 || i % 8 == 1) {
                    break;
                }
            }
            // FOR LOOP FOR DIAGONALLY LOWER-RIGHT 
            for (i = id + 9; i <= 64; i = i + 9) {
                if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
                else if (boxes[i - 1].innerHTML.includes(`B`)) { AddBorder(i); break; }
                if (i % 8 == 0) {
                    break;
                }
            }
        }
    }
    // WHEN BLACK'S TURN
    else {
        // WHEN CAMEL IS ON THE 8TH LINE
        if (id % 8 == 0) {
            // FOR LOOP FOR DIAGONALLY UPPER-LEFT 
            for (i = id - 9; i >= 1; i = i - 9) {
                if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
                else if (boxes[i - 1].innerHTML.includes(`W`)) { AddBorder(i); break; }

            }
            // FOR LOOP FOR DIAGONALLY LOWER-LEFT 
            for (i = id + 7; i <= 64; i = i + 7) {
                if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
                else if (boxes[i - 1].innerHTML.includes(`W`)) { AddBorder(i); break; }

            }
        }
        else {
            // FOR LOOP FOR DIAGONALLY UPPER-RIGHT 
            for (i = id - 7; i >= 1; i = i - 7) {
                if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
                else if (boxes[i - 1].innerHTML.includes(`W`)) { AddBorder(i); break; }
                if (i % 8 == 0) {
                    break;
                }
            }
            // FOR LOOP FOR DIAGONALLY UPPER-LEFT 
            for (i = id - 9; i >= 1; i = i - 9) {
                if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
                else if (boxes[i - 1].innerHTML.includes(`W`)) { AddBorder(i); break; }
                if (i % 8 == 0 || i % 8 == 1) {
                    break;
                }
            }
            // FOR LOOP FOR DIAGONALLY LOWER-LEFT 
            for (i = id + 7; i <= 64; i = i + 7) {
                if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
                else if (boxes[i - 1].innerHTML.includes(`W`)) { AddBorder(i); break; }
                if (i % 8 == 0 || i % 8 == 1) {
                    break;
                }
            }
            // FOR LOOP FOR DIAGONALLY LOWER-RIGHT 
            for (i = id + 9; i <= 64; i = i + 9) {
                if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                else if (boxes[i - 1].innerHTML == ``) { AddBorder(i); }
                else if (boxes[i - 1].innerHTML.includes(`W`)) { AddBorder(i); break; }

                if (i % 8 == 0) {
                    break;
                }
            }
        }
    }
}


// ADD BORDER FUNCTION

function AddBorder(id) {
    boxes[id - 1].classList.add(`border`);
}

// REMOVE BORDER FUNCTION

function RemoveBorder(id) {
    boxes[id - 1].classList.remove(`border`);
}


// ALIVE FUNCTION

function alive(box) {
    if (turn == "White") {
        Alive.innerHTML = `
        <div><h2>What you want alive?</h2></div>
        <div>
        <div>
        <input type="radio" class="alives" name="alive" id="white_Vajir" value="white_Vajir">
            <h3>♕</h3>
            </div>
        <div>
            <input type="radio" class="alives" name="alive" id="white_Hathi" value="white_Hathi">
            <h3>♖</h3>
        </div>
        <div>
            <input type="radio" class="alives" name="alive" id="white_horse" value="white_horse">
            <h3>♘</h3>
        </div>
        <div>
        <input type="radio" class="alives" name="alive" id="white_camel" value="white_camel">
            <h3>♗</h3>
        </div>
        <div>
            <input type="radio" class="alives" name="alive" id="white_pyada" value="white_pyada">
            <h3>♙</h3>
        </div></div>
        `;
        for (const radio of aliveElems) {
            radio.addEventListener('click', (e) => {
                isAliving = false;
                aliveAudio.play();
                if (radio.value == 'white_Vajir') {
                    box.innerHTML = `<div class="Chess_Elements W white_vajir">♕</div>`;
                }
                else if (radio.value == 'white_Hathi') {
                    box.innerHTML = `<div class="Chess_Elements W white_hathi">♖</div>`
                }
                else if (radio.value == 'white_horse') {
                    box.innerHTML = `<div class="Chess_Elements W white_horse">♘</div>`
                }
                else if (radio.value == 'white_camel') {
                    box.innerHTML = `<div class="Chess_Elements W white_camel">♗</div>`
                }
                else {
                    box.innerHTML = `<div class="Chess_Elements W white_pyada">♙</div>`
                }
                Alive.innerHTML = '';
            })
        }
    }
    else {
        Alive.innerHTML = `
        <div><h2>What you want alive?</h2></div>
        <div><div>
            <input type="radio" class="alives" name="alive" id="black_Vajir" value="black_Vajir">
            <h3>♛</h3>
        </div>
        <div> 
            <input type="radio" class="alives" name="alive" id="black_Hathi" value="black_Hathi">
            <h3>♜</h3>
        </div>
        <div><input type="radio" class="alives" name="alive" id="black_horse" value="black_horse">
            <h3>♞</h3>
        </div>
        <div><input type="radio" class="alives" name="alive" id="black_camel" value="black_camel">
            <h3>♝</h3>
            </div>
        <div> 
        <input type="radio" class="alives" name="alive" id="black_pyada" value="black_pyada">
            <h3>♟</h3>
        </div></div>`;
        for (const radio of aliveElems) {
            radio.addEventListener('click', (e) => {
                isAliving = false;
                aliveAudio.play();
                if (radio.value == 'black_Vajir') {
                    box.innerHTML = `<div class="Chess_Elements B black_vajir">♛</div>`;
                }
                else if (radio.value == 'black_Hathi') {
                    box.innerHTML = `<div class="Chess_Elements B black_hathi">♜</div>`
                }
                else if (radio.value == 'black_horse') {
                    box.innerHTML = `<div class="Chess_Elements B black_horse">♞</div>`
                }
                else if (radio.value == 'black_camel') {
                    box.innerHTML = `<div class="Chess_Elements B black_camel">♝</div>`
                }
                else {
                    box.innerHTML = `<div class="Chess_Elements B black_pyada">♟</div>`
                }
                Alive.innerHTML = '';
            })
        }
    }
}



// CHECKMATE SYSTEM
function checkMateSystem() {
    let whiteKing, blackKing;
    for (const box of boxes) { box.classList.remove(`border`); }
    for (const box of boxes) {
        if (box.innerHTML == `<div class="Chess_Elements W white_king">♔</div>`) {
            whiteKing = box;
            for (const box of boxes) {
                if (box.innerHTML == `<div class="Chess_Elements B black_hathi">♜</div>`) {
                    id = Number(box.id);
                    if (id % 8 == 0) { var right = id; var left = id - 8; }
                    else { right = id + 8 - id % 8; left = id - id % 8; }
                    for (let i = id - 2; i >= left; i--) {
                        if (boxes[i].innerHTML.includes(`B`)) { break; }
                        else if (boxes[i].innerHTML.includes(`W`)) {
                            if (i + 1 == whiteKing.id) {  whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                            else { break; }
                        }
                    }
                    for (let i = id + 1; i <= right; i++) {
                        if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                        else if (boxes[i - 1].innerHTML.includes(`W`)) {
                            if (i == whiteKing.id) {  whiteKing.classList.add(`border`); chekmateAudio.play();break; }
                            else { break; }
                        }
                    }
                    for (let i = id - 8; i >= 1; i = i - 8) {
                        if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                        else if (boxes[i - 1].innerHTML.includes(`W`)) {
                            if (i == whiteKing.id) {  whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                            else { break; }
                        }
                    }
                    for (let i = id + 8; i <= 64; i = i + 8) {
                        if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                        else if (boxes[i - 1].innerHTML.includes(`W`)) {
                            if (i == whiteKing.id) {  whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                            else { break; }
                        }
                    }
                }
                else if (box.innerHTML == `<div class="Chess_Elements B black_king">♚</div>`) {
                    if (id % 8 == 1) {
                        if (id == 1) {
                            if (id + 1 == whiteKing.id || id + 9 == whiteKing.id || id + 8 == whiteKing.id) {
                                whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 57) {
                            if (id - 8 == whiteKing.id || id + 1 == whiteKing.id || id - 7 == whiteKing.id) {
                                whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else {
                            if (id + 1 == whiteKing.id || id + 9 == whiteKing.id ||id + 8 == whiteKing.id || id - 8 == whiteKing.id || id - 7 == whiteKing.id) {
                                whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                    }
                    //  WHEN KING IS ON THE 8TH LINE
                    else if (id % 8 == 0) {
                        if (id == 8) {
                            if (id - 1 == whiteKing.id || id + 7 == whiteKing.id || id + 8 == whiteKing.id) {
                                whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 64) {
                            if (id - 1 == whiteKing.id || id - 9 == whiteKing.id || id - 8 == whiteKing.id) {
                                whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else {
                            if (id - 1 == whiteKing.id || id - 9 == whiteKing.id ||id + 7 == whiteKing.id || id + 8 == whiteKing.id || id - 8 == whiteKing.id) {
                                whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                    }
                    //  WHEN KING IS ON THE 1ST ROW AND IN BETWEEN 2ND TO 7TH BOX
                    else if (id >= 2 && id <= 7) {
                        if (id - 1 == whiteKing.id || id + 9 == whiteKing.id ||id + 7 == whiteKing.id || id + 8 == whiteKing.id || id + 1 == whiteKing.id) {
                            whiteKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                    //  WHEN KING IS ON THE 8TH ROW AND IN BETWEEN 58TH TO 63TH BOX
                    else if (id >= 58 && id <= 63) {
                        if (id - 1 == whiteKing.id || id - 9 == whiteKing.id ||id - 7 == whiteKing.id || id - 8 == whiteKing.id || id + 1 == whiteKing.id) {
                            whiteKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                    //  WHEN KING IS IN BETWEEN 2ND TO 7TH ROW
                    else {
                        if (id - 1 == whiteKing.id || id - 9 == whiteKing.id ||id - 7 == whiteKing.id || id - 8 == whiteKing.id 
                            ||id + 7 == whiteKing.id || id + 8 == whiteKing.id||id + 9 == whiteKing.id|| id + 1 == whiteKing.id) {
                            whiteKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                }
                
                else if (box.innerHTML == `<div class="Chess_Elements B black_horse">♞</div>`) {
                    id = Number(box.id);
                    //WHEN HORSE IS ON THE 2ND LINE
                    if (id % 8 == 2) {
                        if (id == 2) {
                            if (id + 15 == whiteKing.id || id + 10 == whiteKing.id || id + 17 == whiteKing.id) {
                                whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 10) {
                            if (id + 15 == whiteKing.id || id + 10 == whiteKing.id || id + 17 == whiteKing.id || id - 6 == whiteKing.id) {
                                whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 58) {
                            if (id - 6 == whiteKing.id || id - 15 == whiteKing.id || id - 17 == whiteKing.id) {
                                whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 50) {
                            if (id - 15 == whiteKing.id || id + 10 == whiteKing.id || id - 17 == whiteKing.id || id - 6 == whiteKing.id) {
                                whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else {
                            if (id - 15 == whiteKing.id || id + 15 == whiteKing.id || id + 17 == whiteKing.id || id + 10 == whiteKing.id || id - 17 == whiteKing.id || id - 6 == whiteKing.id) {
                                whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                    }
                    //WHEN HORSE IS ON THE 1ST LINE
                    else if (id % 8 == 1) {
                        if (id == 1) {
                            if (id + 10 == whiteKing.id || id + 17 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 9) {
                            if (id + 10 == whiteKing.id || id + 17 == whiteKing.id || id - 6 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 57) {
                            if (id - 15 == whiteKing.id || id - 6 == whiteKing.id) {
                                 blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 49) {
                            if (id - 15 == whiteKing.id || id - 6 == whiteKing.id || id + 10 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else {
                            if (id - 15 == whiteKing.id || id - 6 == whiteKing.id || id + 10 == whiteKing.id || id + 17 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                    }
                    //WHEN HORSE IS ON THE 8TH LINE
                    else if (id % 8 == 0) {
                        if (id == 8) {
                            if (id + 15 == whiteKing.id || id + 6 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 16) {
                            if (id + 15 == whiteKing.id || id + 6 == whiteKing.id || id - 10 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 64) {
                            if (id - 10 == whiteKing.id || id - 17 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 56) {
                            if (id - 10 == whiteKing.id || id - 17 == whiteKing.id || id + 6 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else {
                            if (id - 10 == whiteKing.id || id - 17 == whiteKing.id || id + 6 == whiteKing.id || id + 15 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                    }
                    //WHEN HORSE IS ON THE 7TH LINE
                    else if (id % 8 == 7) {
                        if (id == 7) {
                            if (id + 15 == whiteKing.id || id + 17 == whiteKing.id || id + 6 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 15) {
                            if (id + 15 == whiteKing.id || id + 17 == whiteKing.id || id + 6 == whiteKing.id || id - 10 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 63) {
                            if (id - 15 == whiteKing.id || id - 17 == whiteKing.id || id - 10 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 55) {
                            if (id - 15 == whiteKing.id || id - 17 == whiteKing.id || id - 10 == whiteKing.id || id + 6 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else {
                            if (id - 15 == whiteKing.id || id + 15 == whiteKing.id || id + 17 == whiteKing.id || id - 17 == whiteKing.id || id - 10 == whiteKing.id || id + 6 == whiteKing.id) {
                                 whiteKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                    }
                    //WHEN HORSE IS ON THE 1 ROW AND BETWEEN 3RD BOX TO 6TH BOX LINE
                    else if (id >= 3 && id <= 6) {
                        if (id + 15 == whiteKing.id || id + 17 == whiteKing.id || id + 10 == whiteKing.id || id + 6 == whiteKing.id) {
                             whiteKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                    //WHEN HORSE IS ON THE 2 ROW AND BETWEEN 11TH BOX TO 14TH BOX LINE
                    else if (id >= 11 && id <= 14) {
                        if (id + 15 == whiteKing.id || id + 17 == whiteKing.id || id + 10 == whiteKing.id || id + 6 == whiteKing.id || id - 10 == whiteKing.id || id - 6 == whiteKing.id) {
                             whiteKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                    //WHEN HORSE IS ON THE 8 ROW AND BETWEEN 59TH BOX TO 62TH BOX LINE
                    else if (id >= 59 && id <= 62) {
                        if (id - 15 == whiteKing.id || id - 17 == whiteKing.id || id - 10 == whiteKing.id || id - 6 == whiteKing.id) {
                             whiteKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                    //WHEN HORSE IS ON THE 7 ROW AND BETWEEN 51TH BOX TO 54TH BOX LINE
                    else if (id >= 51 && id <= 54) {
                        if (id - 15 == whiteKing.id || id - 17 == whiteKing.id || id + 10 == whiteKing.id || id + 6 == whiteKing.id || id - 10 == whiteKing.id || id - 6 == whiteKing.id) {
                             whiteKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                    //WHEN HORSE IS IN BETWEEN 3RD TO 6TH ROW
                    else {
                        if(id + 15 == whiteKing.id || id + 17 == whiteKing.id || id - 15 == whiteKing.id || id - 17 == whiteKing.id || id + 10 == whiteKing.id || id + 6 == whiteKing.id || id - 10 == whiteKing.id || id - 6 == whiteKing.id)
                        {
                             whiteKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                }
                else if (box.innerHTML == `<div class="Chess_Elements B black_camel">♝</div>`) {
                    id = Number(box.id);
                    if (id % 8 == 0) {
                        for (i = id - 9; i >= 1; i = i - 9) {
                            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`W`)) {
                                if (i == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }

                        }
                        for (i = id + 7; i <= 64; i = i + 7) {
                            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`W`)) {
                                if (i == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                    }
                    else {
                        for (i = id - 7; i >= 1; i = i - 7) {
                            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`W`)) {
                                if (i == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                        for (i = id - 9; i >= 1; i = i - 9) {
                            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`W`)) {
                                if (i == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                        for (i = id + 7; i <= 64; i = i + 7) {
                            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`W`)) {
                                if (i == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                        for (i = id + 9; i <= 64; i = i + 9) {
                            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`W`)) {
                                if (i == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                    }
                }
                else if (box.innerHTML == `<div class="Chess_Elements B black_pyada">♟</div>`) {
                    let id = Number(box.id);
                    for (const box of boxes) {
                        if (box.id == id + 9 || box.id == id + 7) {
                            if (box.id == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                        }
                    }
                }
                else if (box.innerHTML == `<div class="Chess_Elements B black_vajir">♛</div>`) {
                    id = Number(box.id);
                    if (id % 8 == 0) { var right = id; var left = id - 8; }
                    else { right = id + 8 - id % 8; left = id - id % 8; }
                    for (let i = id - 2; i >= left; i--) {
                        if (boxes[i].innerHTML.includes(`B`)) { break; }
                        else if (boxes[i].innerHTML.includes(`W`)) {
                            if (i + 1 == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                            else { break; }
                        }
                    }
                    for (let i = id + 1; i <= right; i++) {
                        if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                        else if (boxes[i - 1].innerHTML.includes(`W`)) {
                            if (i == whiteKing.id) {whiteKing.classList.add(`border`); chekmateAudio.play();break; }
                            else { break; }
                        }
                    }
                    for (let i = id - 8; i >= 1; i = i - 8) {
                        if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                        else if (boxes[i - 1].innerHTML.includes(`W`)) {
                            if (i == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                            else { break; }
                        }
                    }
                    for (let i = id + 8; i <= 64; i = i + 8) {
                        if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                        else if (boxes[i - 1].innerHTML.includes(`W`)) {
                            if (i == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                            else { break; }
                        }
                    }
                    if (id % 8 == 0) {
                        for (i = id - 9; i >= 1; i = i - 9) {
                            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`W`)) {
                                if (i == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }

                        }
                        for (i = id + 7; i <= 64; i = i + 7) {
                            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`W`)) {
                                if (i == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                    }
                    else {
                        for (i = id - 7; i >= 1; i = i - 7) {
                            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`W`)) {
                                if (i == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                        for (i = id - 9; i >= 1; i = i - 9) {
                            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`W`)) {
                                if (i == whiteKing.id) {whiteKing.classList.add(`border`); chekmateAudio.play();break; }
                                else { break; }
                            }
                        }
                        for (i = id + 7; i <= 64; i = i + 7) {
                            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`W`)) {
                                if (i == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                        for (i = id + 9; i <= 64; i = i + 9) {
                            if (boxes[i - 1].innerHTML.includes(`B`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`W`)) {
                                if (i == whiteKing.id) {whiteKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                    }
                }
            }
        }
        if (box.innerHTML == `<div class="Chess_Elements B black_king">♚</div>`) {
            blackKing = box;
            for (const box of boxes) {
                if (box.innerHTML == `<div class="Chess_Elements W white_hathi">♖</div>`) {
                    id = Number(box.id);
                    if (id % 8 == 0) { var right = id; var left = id - 8; }
                    else { right = id + 8 - id % 8; left = id - id % 8; }
                    for (let i = id - 2; i >= left; i--) {
                        if (boxes[i].innerHTML.includes(`W`)) { break; }
                        else if (boxes[i].innerHTML.includes(`B`)) {
                            if (i + 1 == blackKing.id) {blackKing.classList.add(`border`); chekmateAudio.play();break; }
                            else { break; }
                        }
                    }
                    for (let i = id + 1; i <= right; i++) {
                        if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                        else if (boxes[i - 1].innerHTML.includes(`B`)) {
                            if (i == blackKing.id) {blackKing.classList.add(`border`); chekmateAudio.play();break; }
                            else { break; }
                        }
                    }
                    for (let i = id - 8; i >= 1; i = i - 8) {
                        if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                        else if (boxes[i - 1].innerHTML.includes(`B`)) {
                            if (i == blackKing.id) {blackKing.classList.add(`border`); chekmateAudio.play();break; }
                            else { break; }
                        }
                    }
                    for (let i = id + 8; i <= 64; i = i + 8) {
                        if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                        else if (boxes[i - 1].innerHTML.includes(`B`)) {
                            if (i == blackKing.id) {blackKing.classList.add(`border`);chekmateAudio.play(); break; }
                            else { break; }
                        }
                    }
                }
                 if (box.innerHTML == `<div class="Chess_Elements W white_king">♔</div>`) {

                if (id % 8 == 1) {
                    if (id == 1) {
                        if (id + 1 == blackKing.id || id + 9 == blackKing.id || id + 8 == blackKing.id) {
                            blackKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                    else if (id == 57) {
                        if (id - 8 == blackKing.id || id + 1 == blackKing.id || id - 7 == blackKing.id) {
                            blackKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                    else {
                        if (id + 1 == blackKing.id || id + 9 == blackKing.id ||id + 8 == blackKing.id || id - 8 == blackKing.id || id - 7 == blackKing.id) {
                            blackKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                }
                //  WHEN KING IS ON THE 8TH LINE
                else if (id % 8 == 0) {
                    if (id == 8) {
                        if (id - 1 == blackKing.id || id + 7 == blackKing.id || id + 8 == blackKing.id) {
                            blackKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                    else if (id == 64) {
                        if (id - 1 == blackKing.id || id - 9 == blackKing.id || id - 8 == blackKing.id) {
                            blackKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                    else {
                        if (id - 1 == blackKing.id || id - 9 == blackKing.id ||id + 7 == blackKing.id || id + 8 == blackKing.id || id - 8 == blackKing.id) {
                            blackKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                }
                //  WHEN KING IS ON THE 1ST ROW AND IN BETWEEN 2ND TO 7TH BOX
                else if (id >= 2 && id <= 7) {
                    if (id - 1 == blackKing.id || id + 9 == blackKing.id ||id + 7 == blackKing.id || id + 8 == blackKing.id || id + 1 == blackKing.id) {
                        blackKing.classList.add(`border`);chekmateAudio.play();
                    }
                }
                //  WHEN KING IS ON THE 8TH ROW AND IN BETWEEN 58TH TO 63TH BOX
                else if (id >= 58 && id <= 63) {
                    if (id - 1 == blackKing.id || id - 9 == blackKing.id ||id - 7 == blackKing.id || id - 8 == blackKing.id || id + 1 == blackKing.id) {
                        blackKing.classList.add(`border`);chekmateAudio.play();
                    }
                }
                //  WHEN KING IS IN BETWEEN 2ND TO 7TH ROW
                else {
                    if (id - 1 == blackKing.id || id - 9 == blackKing.id ||id - 7 == blackKing.id || id - 8 == blackKing.id 
                        ||id + 7 == blackKing.id || id + 8 == blackKing.id||id + 9 == blackKing.id|| id + 1 == blackKing.id) {
                        blackKing.classList.add(`border`);chekmateAudio.play();
                    }
                }
            }
                else if (box.innerHTML == `<div class="Chess_Elements W white_horse">♘</div>`) {
                    id = Number(box.id);
                    //WHEN HORSE IS ON THE 2ND LINE
                    if (id % 8 == 2) {
                        if (id == 2) {
                            if (id + 15 == blackKing.id || id + 10 == blackKing.id || id + 17 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 10) {
                            if (id + 15 == blackKing.id || id + 10 == blackKing.id || id + 17 == blackKing.id || id - 6 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 58) {
                            if (id - 6 == blackKing.id || id - 15 == blackKing.id || id - 17 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 50) {
                            if (id - 15 == blackKing.id || id + 10 == blackKing.id || id - 17 == blackKing.id || id - 6 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else {
                            if (id - 15 == blackKing.id || id + 15 == blackKing.id || id + 17 == blackKing.id || id + 10 == blackKing.id || id - 17 == blackKing.id || id - 6 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                    }
                    //WHEN HORSE IS ON THE 1ST LINE
                    else if (id % 8 == 1) {
                        if (id == 1) {
                            if (id + 10 == blackKing.id || id + 17 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 9) {
                            if (id + 10 == blackKing.id || id + 17 == blackKing.id || id - 6 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 57) {
                            if (id - 15 == blackKing.id || id - 6 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 49) {
                            if (id - 15 == blackKing.id || id - 6 == blackKing.id || id + 10 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else {
                            if (id - 15 == blackKing.id || id - 6 == blackKing.id || id + 10 == blackKing.id || id + 17 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                    }
                    //WHEN HORSE IS ON THE 8TH LINE
                    else if (id % 8 == 0) {
                        if (id == 8) {
                            if (id + 15 == blackKing.id || id + 6 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 16) {
                            if (id + 15 == blackKing.id || id + 6 == blackKing.id || id - 10 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 64) {
                            if (id - 10 == blackKing.id || id - 17 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 56) {
                            if (id - 10 == blackKing.id || id - 17 == blackKing.id || id + 6 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else {
                            if (id - 10 == blackKing.id || id - 17 == blackKing.id || id + 6 == blackKing.id || id + 15 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                    }
                    //WHEN HORSE IS ON THE 7TH LINE
                    else if (id % 8 == 7) {
                        if (id == 7) {
                            if (id + 15 == blackKing.id || id + 17 == blackKing.id || id + 6 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 15) {
                            if (id + 15 == blackKing.id || id + 17 == blackKing.id || id + 6 == blackKing.id || id - 10 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 63) {
                            if (id - 15 == blackKing.id || id - 17 == blackKing.id || id - 10 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else if (id == 55) {
                            if (id - 15 == blackKing.id || id - 17 == blackKing.id || id - 10 == blackKing.id || id + 6 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                        else {
                            if (id - 15 == blackKing.id || id + 15 == blackKing.id || id + 17 == blackKing.id || id - 17 == blackKing.id || id - 10 == blackKing.id || id + 6 == blackKing.id) {
                                blackKing.classList.add(`border`);chekmateAudio.play();
                            }
                        }
                    }
                    //WHEN HORSE IS ON THE 1 ROW AND BETWEEN 3RD BOX TO 6TH BOX LINE
                    else if (id >= 3 && id <= 6) {
                        if (id + 15 == blackKing.id || id + 17 == blackKing.id || id + 10 == blackKing.id || id + 6 == blackKing.id) {
                             blackKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                    //WHEN HORSE IS ON THE 2 ROW AND BETWEEN 11TH BOX TO 14TH BOX LINE
                    else if (id >= 11 && id <= 14) {
                        if (id + 15 == blackKing.id || id + 17 == blackKing.id || id + 10 == blackKing.id || id + 6 == blackKing.id || id - 10 == blackKing.id || id - 6 == blackKing.id) {
                             blackKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                    //WHEN HORSE IS ON THE 8 ROW AND BETWEEN 59TH BOX TO 62TH BOX LINE
                    else if (id >= 59 && id <= 62) {
                        if (id - 15 == blackKing.id || id - 17 == blackKing.id || id - 10 == blackKing.id || id - 6 == blackKing.id) {
                             blackKing.classList.add(`border`);chekmateAudio.play();
                        }
                    }
                    //WHEN HORSE IS ON THE 7 ROW AND BETWEEN 51TH BOX TO 54TH BOX LINE
                    else if (id >= 51 && id <= 54) {
                        if (id - 15 == blackKing.id || id - 17 == blackKing.id || id + 10 == blackKing.id || id + 6 == blackKing.id || id - 10 == blackKing.id || id - 6 == blackKing.id) {
                             blackKing.classList.add(`border`);chekmateAudio.play();
                        }
                    } 
                    //WHEN HORSE IS IN BETWEEN 3RD TO 6TH ROW
                    else {
                        if (id + 15 == blackKing.id || id + 17 == blackKing.id || id - 15 == blackKing.id || id - 17 == blackKing.id || id + 10 == blackKing.id || id + 6 == blackKing.id || id - 10 == blackKing.id || id - 6 == blackKing.id) {
                             blackKing.classList.add(`border`); chekmateAudio.play();
                        }
                    }
                }
                else if (box.innerHTML == `<div class="Chess_Elements W white_camel">♗</div>`) {
                    id = Number(box.id);
                    if (id % 8 == 0) {
                        for (i = id - 9; i >= 1; i = i - 9) {
                            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`B`)) {
                                if (i == blackKing.id) {blackKing.classList.add(`border`); chekmateAudio.play();break; }
                                else { break; }
                            }

                        }
                        for (i = id + 7; i <= 64; i = i + 7) {
                            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`B`)) {
                                if (i == blackKing.id) {blackKing.classList.add(`border`); chekmateAudio.play();break; }
                                else { break; }
                            }
                        }
                    }
                    else {
                        for (i = id - 7; i >= 1; i = i - 7) {
                            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`B`)) {
                                if (i == blackKing.id) {blackKing.classList.add(`border`); chekmateAudio.play();break; }
                                else { break; }
                            }
                        }
                        for (i = id - 9; i >= 1; i = i - 9) {
                            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`B`)) {
                                if (i == blackKing.id) {blackKing.classList.add(`border`); chekmateAudio.play();break; }
                                else { break; }
                            }
                        }
                        for (i = id + 7; i <= 64; i = i + 7) {
                            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`B`)) {
                                if (i == blackKing.id) { blackKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                        for (i = id + 9; i <= 64; i = i + 9) {
                            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`B`)) {
                                if (i == blackKing.id) { blackKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                    }
                }
                else if (box.innerHTML == `<div class="Chess_Elements W white_pyada">♙</div>`) {
                    let id = Number(box.id);
                    for (const box of boxes) {
                        if (box.id == id - 9 || box.id == id - 7) {
                            if (box.id == blackKing.id) { blackKing.classList.add(`border`); chekmateAudio.play();break; }
                        }
                    }
                }
                else if (box.innerHTML == `<div class="Chess_Elements W white_vajir">♕</div>`) {
                    id = Number(box.id);
                    if (id % 8 == 0) { var right = id; var left = id - 8; }
                    else { right = id + 8 - id % 8; left = id - id % 8; }
                    for (let i = id - 2; i >= left; i--) {
                        if (boxes[i].innerHTML.includes(`W`)) { break; }
                        else if (boxes[i].innerHTML.includes(`B`)) {
                            if (i + 1 == blackKing.id) {blackKing.classList.add(`border`); chekmateAudio.play();break; }
                            else { break; }
                        }
                    }
                    for (let i = id + 1; i <= right; i++) {
                        if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                        else if (boxes[i - 1].innerHTML.includes(`B`)) {
                            if (i == blackKing.id) {blackKing.classList.add(`border`);chekmateAudio.play(); break; }
                            else { break; }
                        }
                    }
                    for (let i = id - 8; i >= 1; i = i - 8) {
                        if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                        else if (boxes[i - 1].innerHTML.includes(`B`)) {
                            if (i == blackKing.id) {blackKing.classList.add(`border`); chekmateAudio.play();break; }
                            else { break; }
                        }
                    }
                    for (let i = id + 8; i <= 64; i = i + 8) {
                        if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                        else if (boxes[i - 1].innerHTML.includes(`B`)) {
                            if (i == blackKing.id) {blackKing.classList.add(`border`); chekmateAudio.play();break; }
                            else { break; }
                        }
                    }
                    if (id % 8 == 0) {
                        for (i = id - 9; i >= 1; i = i - 9) {
                            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`B`)) {
                                if (i == blackKing.id) {blackKing.classList.add(`border`); chekmateAudio.play();break; }
                                else { break; }
                            }

                        }
                        for (i = id + 7; i <= 64; i = i + 7) {
                            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`B`)) {
                                if (i == blackKing.id) {blackKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                    }
                    else {
                        for (i = id - 7; i >= 1; i = i - 7) {
                            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`B`)) {
                                if (i == blackKing.id) {blackKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                        for (i = id - 9; i >= 1; i = i - 9) {
                            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`B`)) {
                                if (i == blackKing.id) {blackKing.classList.add(`border`); chekmateAudio.play();break; }
                                else { break; }
                            }
                        }
                        for (i = id + 7; i <= 64; i = i + 7) {
                            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`B`)) {
                                if (i == blackKing.id) {blackKing.classList.add(`border`);chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                        for (i = id + 9; i <= 64; i = i + 9) {
                            if (boxes[i - 1].innerHTML.includes(`W`)) { break; }
                            else if (boxes[i - 1].innerHTML.includes(`B`)) {
                                if (i == blackKing.id) {blackKing.classList.add(`border`); chekmateAudio.play(); break; }
                                else { break; }
                            }
                        }
                    }
                }

            }
        }
    }
}

