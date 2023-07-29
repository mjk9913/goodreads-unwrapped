from flask import Flask, render_template, request, jsonify
import requests
import scraper

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scrape', methods=['POST'])
def scrape():
    data = []
    url = request.json.get('url')
    print(url)

    books = scraper.scrape(url)
    print(books)

    return jsonify(data=data)

if __name__ == '__main__':
    app.run(debug=True)
