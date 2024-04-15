const display = document.getElementById('display');
function appendToDisplay(input){
    display.innerHTML += input;
}

function clearToDisplay(){
    display.innerHTML = "";
}
function calculate() {
    const calculation = display.textContent;
    const result = eval(calculation);
    display.innerHTML = `${calculation} = <span style="font-size: 1.8rem; color:dark; ">${result}</span>`;

}
display.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        calculate();
        event.preventDefault(); // Prevent the default action of the Enter key
    }
});
