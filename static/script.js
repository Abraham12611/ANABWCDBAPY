document.addEventListener('DOMContentLoaded', () => {
    const depositForm = document.getElementById('deposit-form');
    const depositInput = document.getElementById('deposit');
    const depositBtn = document.getElementById('deposit-btn');

    const betForm = document.getElementById('bet-form');
    const linesInput = document.getElementById('lines');
    const betAmountInput = document.getElementById('bet-amount');
    const spinBtn = document.getElementById('spin-btn');

    const balanceDisplay = document.getElementById('balance');
    const resultDisplay = document.getElementById('result');

    let balance = 0;

    depositBtn.addEventListener('click', () => {
        const depositValue = parseInt(depositInput.value);
        if (isNaN(depositValue) || depositValue <= 0) {
            alert('Please enter a valid deposit amount.');
            return;
        }
        balance = depositValue;
        updateBalanceDisplay();
        depositForm.classList.add('hidden');
        betForm.classList.remove('hidden');
    });

    spinBtn.addEventListener('click', () => {
        const lines = parseInt(linesInput.value);
        const betAmount = parseInt(betAmountInput.value);

        if (isNaN(lines) || isNaN(betAmount) || lines < 1 || lines > 3 || betAmount < 1) {
            alert('Please enter valid values for lines and bet amount.');
            return;
        }

        const data = {
            lines: lines,
            betAmount: betAmount
        };

        fetch('/spin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            resultDisplay.textContent = result;
            resultDisplay.classList.remove('hidden');
            updateBalanceDisplay();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    function updateBalanceDisplay() {
        balanceDisplay.textContent = `Balance: $${balance}`;
    }
});

