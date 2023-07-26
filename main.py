from selenium import webdriver
import time
from bs4 import BeautifulSoup


YEAR = '2020'
OUTPUT_MD_FILE_PATH = 'markdown_file.md'
INTRO_PARA_OF_BLOG = f'{YEAR} was a good reading year for me. The Covid induced work-from-home saved ample travel hours for me to fall in love with reading again. Here are the books that I read this year - some of them were delightful; others not so much.\n'
CHROME_DRIVER_PATH = 'chromedriver'
MAIN_URL = 'https://www.goodreads.com/review/list/116631395-elifia?shelf=read&sort=date_read'


def get_html_using_selenium(url, CHROME_DRIVER_PATH):

    driver = webdriver.Chrome()
    driver.get (url)

    # handle infinite scroll
    lenOfPage = driver.execute_script("window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;")
    match = False
    while(match==False):
        lastCount = lenOfPage
        time.sleep(3)
        lenOfPage = driver.execute_script("window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;")
        if lastCount==lenOfPage:
            match=True

    # Page is fully scrolled now. Next step is to extract the source code from it.
    my_html = driver.page_source
    driver.quit()

    # with open('tmp.html', 'r') as f:
    #     my_html = f.read()

    return my_html


def get_rating_from_text(rating_text):
    try:
        rating_dict = {'did not like it': '1',
                    'it was ok': '2',
                    'liked it': '3',
                    'really liked it': '4',
                    'it was amazing': '5'}

        return rating_dict[rating_text]
    except:
        return '0'


def get_books_data(html_str):
    soup = BeautifulSoup(html_str, 'lxml')

    table = soup.find_all('table', {'id':'books'})[0]
    table_rows = table.find_all('tr')
    book_list = []

    # print("\n\n" + str(table_rows[1]))

    for tr in table_rows[1:]:
        book_dict = {}

        # parse cover_url
        td = tr.find_all('td', {'class':'field cover'})[0]
        img = td.find_all('img')[0]
        book_dict['cover_url'] = img['src']

        # parse title and book's url
        td = tr.find_all('td', {'class':'field title'})[0]
        a_link = td.find_all('a')[0]
        book_dict['title'] = a_link.get('title')
        book_dict['book_url'] = a_link.get('href')

        # parse author and author_url
        td = tr.find_all('td', {'class':'field author'})[0]
        a_link = td.find_all('a')[0]
        book_dict['author_name'] = a_link.text
        book_dict['author_url'] = a_link.get('href')
        
        # parse avg rating
        td = tr.find_all('td', {'class':'field avg_rating'})[0]
        text = td.find_all('div', {'class':'value'})[0]
        book_dict['avg_rating'] = text.text.strip()

        # parse isbn
        td = tr.find_all('td', {'class':'field isbn'})[0]
        text = td.find_all('div', {'class':'value'})[0]
        book_dict['isbn'] = text.text.strip()

        # parse isbn13
        td = tr.find_all('td', {'class':'field isbn13'})[0]
        text = td.find_all('div', {'class':'value'})[0]
        book_dict['isbn13'] = text.text.strip()

        # parse num of pages
        td = tr.find_all('td', {'class':'field num_pages'})[0]
        text = td.find_all('div', {'class':'value'})[0]
        book_dict['num_pages'] = text.text.strip().split('\n')[0]

        # parse rating
        td = tr.find_all('td', {'class':'field rating'})[0]
        try:
            span = td.find_all('span', {'class':'staticStars notranslate'})[0]
            rating_text = span.get('title')
            rating = get_rating_from_text(rating_text)
            book_dict['rating'] = rating
        except:
            book_dict['rating'] = '0'

        # parse review
        review = ''
        td = tr.find_all('td', {'class':'field review'})
        if(len(td) > 0):
            td = td[0]
            span = td.find_all('span')
            if(len(span) > 0):
                span = span[-1]
                lines = [str(i) for i in span.contents]
                review = ' '.join(lines)
        book_dict['review'] = review

        # # parse date_read
        # td = tr.find_all('td', {'class':'field date_read'})[0]
        # try:
        #     span = td.find_all('span', {'class':'date_read_value'})[0]
        #     date_read = span.text
        #     book_dict['date_read'] = date_read
        book_dict['date_read'] = 'none'

        book_list.append(book_dict)
        # break

    return book_list


def filter_and_sort_books(book_list, year):
    filtered_list = [i for i in book_list if year in i['date_read']]
    sorted_list = sorted(filtered_list, key=lambda k: k['rating'], reverse=True)
    return sorted_list



if __name__ == '__main__':
    html_str = get_html_using_selenium(MAIN_URL, CHROME_DRIVER_PATH)
    # print(html_str)
    

    book_list = get_books_data(html_str)
    print(book_list)

    print(len(book_list))

    # filtered_and_sorted_book_list = filter_and_sort_books(book_list, YEAR)
    # print("3")


    print("Done")
