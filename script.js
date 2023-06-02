document.addEventListener('DOMContentLoaded', function() {
    // Get the deposit amount and display it as balance
    fetch('/get_deposit')
    .then(response => response.json())
    .then(result => {
        document.getElementById('balance').textContent = '$' + result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('spin-button').addEventListener('click', function() {
    var lines = document.getElementById('lines').value;
    var betAmount = document.getElementById('bet-amount').value;

    fetch('/spin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lines: lines,
            betAmount: betAmount
        })
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('result').textContent = result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

