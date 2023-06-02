from flask import Flask, jsonify, request, render_template
import random

app = Flask(__name__)

balance = 0

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_deposit', methods=['GET'])
def get_deposit():
    return jsonify(balance)

@app.route('/spin', methods=['POST'])
def spin():
    lines = int(request.json['lines'])
    bet_amount = int(request.json['betAmount'])

    total_bet = lines * bet_amount

    if total_bet > balance:
        return jsonify('Insufficient balance to place the bet.')

    symbols = ['A', 'B', 'C', 'D']
    columns = []
    for _ in range(3):
        column = [random.choice(symbols) for _ in range(lines)]
        columns.append(column)

    winnings = 0
    winning_lines = []
    for line in range(lines):
        symbol = columns[0][line]
        if all(column[line] == symbol for column in columns):
            winnings += symbol_value[symbol] * bet_amount
            winning_lines.append(line + 1)

    balance -= total_bet
    balance += winnings

    result = f'You won ${winnings}.\n'
    if winning_lines:
        result += f'You won on lines: {", ".join(str(line) for line in winning_lines)}'
    else:
        result += 'You did not win.'

    return jsonify(result)

if __name__ == '__main__':
    app.run()

