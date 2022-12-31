"""Server for restaurant ratings app."""

from flask import (Flask, jsonify, render_template, request, session,)
from model import connect_to_db, db, User
from jinja2 import StrictUndefined
from datetime import datetime
import cloudinary.uploader
import os
import crud
import json


app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

CLOUDINARY_KEY = os.environ['CLOUDINARY_KEY']
CLOUDINARY_SECRET = os.environ['CLOUDINARY_SECRET']
CLOUD_NAME = 'di0sy25ru'


@app.route('/')
def show_homepage():
    """Show the application's homepage."""

    return render_template('index.html')


# USER RELATED ROUTES-------------------------------------

@app.route('/api/create-account', methods=['POST'])
def create_new_user_account():
    """ Creates user account. """

    data = request.get_json()

    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    if crud.get_user_by_email(email) == None:
        new_user = crud.create_new_user(fname=first_name,
                                        lname=last_name,
                                        email=email,
                                        password=password)

        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.user_id

        return jsonify({'status': '200',
                        'message': 'Account created successfully!',
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
        return jsonify({'status': '200', 'message': 'Logged in successfuly!!'})
    else:
        return jsonify({'status': '400', 'message': 'Incorret password'})


@app.route('/api/login-status')
def login_status():
    """ Checks if a user is logged in."""

    if 'user_id' in session:
        return jsonify({'status': '200', 'message': 'User logged in!', 'user_id': session['user_id']})
    else:
        return jsonify({'status': '400', 'message': 'Session is empty.'})


@app.route('/api/logout',  methods=['POST'])
def logout():
    """ Clean the session for log out"""

    logout_req = request.get_json()

    if logout_req:
        session.clear()
        return jsonify({'status': '200', 'message': 'Logged out sucessfully!'})


@app.route('/api/profile-photo', methods=['POST'])
def profile_photo_uploading():
    """Gets user request for photo upload"""

    user_upload = request.json.get("profile_picture")

    if user_upload:
        db_new_photo = crud.add_profile_photo(
            user_id=session['user_id'], photo_url=user_upload)

    return jsonify({'status': '200', 'message': 'Photo uploded!', 'photo_url':  user_upload})


@app.route('/api/user/details', methods=['POST'])
def get_user_information():
    """ Shows details of a user """

    user_id_req = request.get_json()

    user = crud.get_user_by_id(user_id_req)

    return jsonify({'user_id': user.user_id,
                    'email': user.email,
                    'fname': user.fname,
                    'lname': user.lname,
                    'profile_photo': user.profile_photo
                    })


@app.route('/api/user/favorites', methods=['POST'])
def get_users_favorites():
    """ Shows a list of user's favorites restaurants """

    user_id_req = request.get_json()

    favorites = crud.filter_favorites_by_user(user_id_req)

    results = []

    for favorite in favorites:
        restaurant_id = favorite.restaurant_id
        restaurant = crud.get_restaurant_by_id(restaurant_id)
        results.append(restaurant.to_dict())

    return jsonify(results)


# RESTAURANTS RELATED ROUTES-------------------------------------

@app.route('/api/favorites', methods=['POST'])
def add_restaurant_to_favorites():
    """ Adds a restaurant to the user's favorite list"""

    restaurant_id_req = request.get_json()

    if 'user_id' in session:
        if crud.check_restaurant_in_favorites(restaurant_id=restaurant_id_req, user_id=session['user_id']) == None:
            add_to_favorites = crud.add_a_restaurant_to_favorites(
                restaurant_id=restaurant_id_req, user_id=session['user_id'])
            db.session.add(add_to_favorites)
            db.session.commit()

            return jsonify({'status': '200', 'message': 'Restaurant added to your favorites', 'type': 'success'})
        else:
            return jsonify({'status': '400', 'message': 'Restaurant already in the list', 'type': 'warning'})

    else:
        return jsonify({'status': '400', 'message': 'Please, log in!', 'type': 'error'})


@app.route('/api/add-reviews', methods=['POST'])
def add_a_restaurant_review():
    """ Adds a restaurant review"""

    request_data = request.get_json()
    restaurant_id = request_data[1]
    review = request_data[0]['review']
    rating = request_data[0]['rating_score']
    photo_url = request_data[0]['photo_url']

    now = datetime.now()
    date = now.strftime("%d %B, %Y")

    reviews_dict = []

    if 'user_id' in session:
        new_review = crud.create_review(
            restaurant_id=restaurant_id, user_id=session['user_id'], review=review, date=date)
        db.session.add(new_review)
        db.session.commit()

        new_rating = crud.create_rating(
            restaurant_id=restaurant_id, user_id=session['user_id'], score=rating)
        db.session.add(new_rating)
        db.session.commit()

        if photo_url:
            new_review_photo = crud.add_restaurant_photo(
                user_id=session['user_id'], restaurant_id=restaurant_id, photo_url=photo_url, review_id=new_review.review_id)
            db.session.add(new_review_photo)
            db.session.commit()

        reviews = crud.get_reviews_by_restaurant(restaurant_id)
        for review in reviews:
            reviews_dict.append(review.to_dict())

        return jsonify(reviews_dict)

    else:
        return jsonify({'status': '400', 'message': 'Please, log in!', 'type': 'error'})


@app.route('/api/show-reviews', methods=['POST'])
def show_restaurant_reviews():
    """ Shows the reviews for a specific restaurant"""

    restaurant_id = request.get_json()

    reviews = crud.get_reviews_by_restaurant(restaurant_id)

    reviews_data = [review.to_dict() for review in reviews]

    return jsonify(reviews_data)


# @app.route('/api/add-restaurant-photo', methods=['POST'])
# def restaurant_photo_uploading():
#     """Gets user request for photo upload"""

#     request_json = request.get_json()
#     photo_url = request_json['restaurantPicture']['restaurant_picture']
#     restaurant_id = request_json['restaurant_id']

#     if photo_url:
#         db_new_restaurant_photo = crud.add_restaurant_photo(
#             user_id=session['user_id'], restaurant_id=restaurant_id, photo_url=photo_url)
#         db.session.add(db_new_restaurant_photo)
#         db.session.commit()

#     return jsonify({'status': '200', 'message': 'Photo uploded!'})


# @app.route('/api/show-photos', methods=['POST'])
# def show_restaurant_photos():
#     """ Shows photos of a specific restaurant"""

#     restaurant_id = request.get_json()

#     photos = crud.filter_photos_by_restaurant(restaurant_id)

#     photos_dict = []

#     for photo in photos:
#         photos_dict.append(photo.to_dict())

#     return jsonify(photos_dict)


@app.route('/api/create-restaurant', methods=['POST'])
def create_new_restaurant():
    """ Creates a new restaurant. """

    data = request.get_json()

    name = data.get('name')
    address = data.get('address')
    city = data.get('city')
    state = data.get('state')
    zipcode = data.get('zipcode')
    category = data.get('category')
    photo_cover = data.get('photo_url')
    rating = 1

    if crud.get_restaurant_by_name(name) == None:
        # add new restaurant to db
        new_restaurant = crud.create_new_restaurant(
            name=name, address=address, city=city, state=state, zipcode=zipcode, photo_cover=photo_cover)

        db.session.add(new_restaurant)
        db.session.flush()

        # get category ID
        db_category = crud.get_categoryId_by_name(name=category)

        # creates a relationship Restaurant-Category
        db_restaurantsCategories = crud.add_a_restaurant_to_a_category(
            restaurant_id=new_restaurant.restaurant_id,
            category_id=db_category[0].category_id)

        db.session.add(db_restaurantsCategories)
        db.session.flush()

        # add an initial rating
        db_rating = crud.create_rating(
            restaurant_id=new_restaurant.restaurant_id,
            score=rating,
            user_id=None)

        db.session.add(db_rating)
        db.session.flush()

        db.session.commit()

        return jsonify({'status': '200', 'message': 'Restaurant added successfuly!', 'type': 'success'})

    else:
        return jsonify({'status': '400', 'message': 'This restaurant already exists!', 'type': 'warning'})


@app.route('/api/restaurant/details', methods=['POST'])
def show_restaurant_information():
    """ Shows details for individual restaurant """

    restaurant_id = request.get_json()

    restaurant = crud.get_restaurant_by_id(restaurant_id)

    rating = crud.get_ratings_by_restaurant(restaurant_id)

    for row in rating[0]:
        score = round(row, 2)

    return jsonify({'restaurant_id': restaurant.restaurant_id,
                    'name': restaurant.name,
                    'address': restaurant.address,
                    'city': restaurant.city,
                    'state': restaurant.state,
                    'zipcode': restaurant.zipcode,
                    'rating': score,
                    'photo_cover': restaurant.photo_cover})


# SEARCH RELATED ROUTES-------------------------------------

@app.route('/api/categories')
def get_all_categories():
    """ Return a list with all categories. """

    categories = crud.get_all_categories()

    results = []

    for obj in categories:
        results.append(obj.name)

    return jsonify(sorted(results))


@app.route('/api/restaurants')
def get_all_restaurants():
    """ Return all restaurants. """

    restaurants = crud.get_all_restaurants()

    results = []

    for restaurant in restaurants:
        results.append(restaurant.to_dict())

    return jsonify(results)


@app.route('/api/categories/results', methods=['POST'])
def get_search_results():
    """ Return a list with all restaurants by category """

    category = request.get_json()

    get_restaurants = crud.get_restaurants_by_category(category)

    results = []

    for restaurant in get_restaurants:
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


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
