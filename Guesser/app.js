let Life = 4,
    minNum = 1,
    maxNum = 10;
    guessNum = Math.floor(Math.random() * 10) + 1;
document.querySelector('.min').textContent = minNum;
document.querySelector('.max').textContent = maxNum;

class Guesser{
    DomElements(){
        const min = document.querySelector('.min'),
              max = document.querySelector('.max'),
              msg = document.querySelector('.message'),
              input = document.querySelector('#input'),
              submit = document.querySelector('#submit');

        return {min, max, msg, input, submit};
    }

    EndGame(cls, message){
        const {input, msg, submit} = this.DomElements();
        msg.textContent = message;
        input.disabled = 'true';
        submit.value = "Play Again";
        submit.classList.add("again");
        
    }
    PlayAgain(){
            window.location.reload();
    }
    
}


// USER SHOULD CHOOSE BETWEEN A NUMBER  ELSE SHOULDNT PROMPT 
// USER SHOULD BE ONLY ALLOWED 3X ELSE END GAME
// UI SHOULD DISPLAY RED BORDER FOR FAIL AND GREEN FOR PASS
// AFTER GAME ENDS, ALL INPUTS SHOULD FREEZE THEN PLAY AGAIN TO CONTINUE
// GAME SHOULD END IF PLAYER RUNS OUT OF TRYS
document.querySelector('form').addEventListener('submit', function(e){
    UI = new Guesser;
    const {msg, input} = UI.DomElements();
    const userInput = input.value;

    if(userInput == ""){
        msg.textContent = `Please input a number from ${minNum} to ${maxNum}`; 
        console.log(userInput);
    }else {
        if(userInput == guessNum){
            UI.EndGame('success', "correct");
        }else {
            Life -= 1;
            Life <= 0 ? UI.EndGame('error', `Game over! ${guessNum} was the right answer`): msg.textContent = `Wrong! ${Life} guesses left`;
        }
        
    }
    
    input.value = "";
    
    e.preventDefault();
});

document.querySelector('.guesser').addEventListener('click', function(e){
    let UI = new Guesser;
    if(e.target.classList.contains('again')){
        UI.PlayAgain();
    }
});


