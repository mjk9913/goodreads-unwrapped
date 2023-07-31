from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import scraper

app = Flask(__name__)
CORS(app)

@app.route('/')
# def index():
    # return render_template('index.html')

@app.route('/scrape', methods=['POST'])
def scrape():
    data = []
    # url = request.json.get('url')
    url = "https://www.goodreads.com/review/list/116631395-elifia?ref=nav_mybooks&shelf=read"
    print(url)

    books = scraper.scrape(url)
    print(books)

    return jsonify(data=data)

if __name__ == '__main__':
    app.run(debug=True)
