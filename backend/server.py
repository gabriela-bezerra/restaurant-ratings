"""Server for restaurant ratings app."""

from flask import (Flask, jsonify, render_template, request, session,)
from model import connect_to_db, db, User
import crud
import json
from jinja2 import StrictUndefined


app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def show_homepage():
    """Show the application's homepage."""

    return render_template('index.html')


# USER RELATED ROUTES-------------------------------------

@app.route('/api/create', methods=['POST'])
def create_user_account():
    """ Creates user account. """

    data = request.get_json()

    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    if crud.get_user_by_email(email) == None:
        new_user = crud.create_user(fname=first_name,
                                    lname=last_name,
                                    email=email,
                                    password=password)

        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.user_id

        return jsonify({'status': '200',
                        'message': 'Account created successfuly!',
                        'firstName': first_name,
                        'lastName': last_name,
                        'email': email,
                        'password': password})
    else:
        return jsonify({'status': '400', 'message': 'This email already exists. PLease login.'})


@app.route('/api/login', methods=['POST'])
def login_user():
    """ Checks user in the data base for login. """

    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user = crud.get_user_password_and_user_id(email)

    user_password, user_id = user

    if not user_id:
        return jsonify({'status': '420', 'message': ' User not found, please sign up.'})
    elif password == user_password:
        session['user_id'] = user_id
        return jsonify({'status': '200', 'message': 'Logged in!'})
    else:
        return jsonify({'status': '400', 'message': 'Incorret password'})


# route with the login status
@app.route('/api/login-status')
def login_status():

    if 'user_id' in session:
        return jsonify({'status': '200', 'message': 'User logged in!'})
    else:
        return jsonify({'status': '400', 'message': 'Session is empty.'})


@app.route('/api/logout',  methods=['POST'])
def logout():

    logout_req = request.get_json()

    if logout_req:
        session.clear()
        return jsonify({'status': '200', 'message': 'Logedout sucessfully!'})


# RESTAURANTS RELATED ROUTES-------------------------------------

@app.route('/api/restaurants')
def get_all_restaurants():
    """ Return all restaurants. """

    restaurants = crud.get_all_restaurants()

    results = []

    for restaurant in restaurants:
        results.append(restaurant.to_dict())

    return jsonify(results)


@app.route('/api/restaurants/zipcode',  methods=['POST'])
def get_restaurants_by_zipcode():
    """ Return restaurants by zipcode """

    zipcode = request.get_json()

    get_restaurants = crud.get_restaurant_by_zipcode(zipcode)

    results = []

    for restaurant in get_restaurants:
        results.append(restaurant.to_dict())

    return jsonify(results)


@app.route('/api/restaurant/details', methods=['POST'])
def show_restaurant_information():
    """ Shows details for individual restaurant """

    restaurant_id = request.get_json()

    restaurant = crud.get_restaurant_by_id(restaurant_id)

    rating = crud.get_ratings_by_restaurant(restaurant_id)

    photos = crud.filter_photos_by_restaurant(restaurant_id)

    reviews = crud.get_reviews_by_restaurant(restaurant_id)

    reviews_dict = []

    for review in reviews:
        reviews_dict.append(review.to_dict())

    return jsonify({'restaurant_id': restaurant.restaurant_id,
                    'name': restaurant.name,
                    'address': restaurant.address,
                    'city': restaurant.city,
                    'state': restaurant.state,
                    'zipcode': restaurant.zipcode,
                    'rating': rating.score,
                    'photo': photos.photo_url,
                    'reviews': reviews_dict})


# CATEGORIES RELATED ROUTES-------------------------------------


@app.route('/api/categories')
def get_all_categories():
    """ Return a list with all categories. """

    categories = crud.get_all_categories()

    results = []

    for obj in categories:
        results.append(obj.name)

    return jsonify(sorted(results))


@app.route('/api/categories/results', methods=['POST'])
def get_search_results():
    """ Return a list with all restaurants by category """

    category = request.get_json()

    get_restaurants = crud.get_restaurants_by_category(category)

    results = []

    for restaurant in get_restaurants:
        results.append(restaurant.to_dict())

    return jsonify(results)


# @app.route('api/search-results', methods=['POST'])
# def get_search():
#     """ Return list of restaurants accordingly to request """

#     request = request.get_json()

#     categories = crud.get_all_categories()

#     results = []

#     get_restaurants = []

#     if request in categories.name:
#         get_restaurants = crud.get_restaurants_by_category(request)
#     elif req

    # return jsonify(results)


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
