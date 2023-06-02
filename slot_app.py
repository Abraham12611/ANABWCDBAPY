from flask import Flask, jsonify, request, render_template
import random

app = Flask(__name__)
app.config['STATIC_FOLDER'] = 'static'

balance = 0
symbol_value = {'A': 2, 'B': 3, 'C': 5, 'D': 10}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_deposit', methods=['GET'])
def get_deposit():
    return jsonify(balance)


@app.route('/spin', methods=['POST'])
def spin():
    # Get the total bet from the form data
    total_bet = int(request.form['bet_amount'])

    # Generate random numbers for the slots
    slot1 = random.choice(symbols)
    slot2 = random.choice(symbols)
    slot3 = random.choice(symbols)

    # Determine the win or loss
    if slot1 == slot2 == slot3:
        result = 'win'
        payout = total_bet * 2
        balance += payout  # Update the balance
    else:
        result = 'loss'
        payout = 0

    return render_template('index.html', slot1=slot1, slot2=slot2, slot3=slot3, result=result, payout=payout, balance=balance)



if __name__ == '__main__':
    app.run(debug=True)

