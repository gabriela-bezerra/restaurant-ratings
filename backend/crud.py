"""CRUD operations."""

from model import db, Favorite, User, Restaurant, Category, RestaurantCategory, Rating, Review, Photo, connect_to_db
from sqlalchemy.sql import func, insert, update


# Users ------------

def create_user(email, password, fname, lname, profile_photo=None):
    """Create and return a new user."""

    return User(email=email, password=password, fname=fname, lname=lname, profile_photo=profile_photo)


def get_all_users():
    """Gives all users."""

    return User.query.all()


def get_user_by_id(user_id):
    """Gives us user by given email."""

    return User.query.filter(User.user_id == user_id).first()


def get_user_by_email(email):
    """Gives us user by given email."""

    return User.query.filter(User.email == email).first()


def get_user_password_and_user_id(email):
    """Gives us user password and user_id."""

    user = User.query.filter(User.email == email).first()

    if user:
        return [user.password, user.user_id]
    else:
        return [None, None]


def get_random_user():

    return User.query.order_by(func.random()).first()


def add_profile_photo(user_id, photo_url):

    user = User.query.get(user_id)

    user.profile_photo = photo_url

    db.session.flush()
    db.session.commit()

# Restaurants ------------


def create_restaurant(name, address, city, state, zipcode, photo_cover, latitude=None, longitude=None):
    """Create and return a new restaurante."""

    return Restaurant(name=name, address=address, city=city, state=state, zipcode=zipcode, photo_cover=photo_cover, latitude=latitude, longitude=longitude)


def get_all_restaurants():
    """Gives all restaurants."""

    return Restaurant.query.all()


def get_restaurant_by_id(restaurant_id):
    """Gives restaurant of choice."""

    return Restaurant.query.filter(Restaurant.restaurant_id == restaurant_id).first()


def get_restaurant_by_name(restaurant_name):
    """Gives restaurant of choice."""

    return Restaurant.query.filter(Restaurant.name == restaurant_name).first()


def get_restaurant_by_zipcode(restaurant_zipcode):
    """Gives restaurant of choice."""

    return Restaurant.query.filter(Restaurant.zipcode == restaurant_zipcode).all()


def get_random_restaurant():

    return Restaurant.query.order_by(func.random()).first()


# Categories ------------

def create_a_category(name):
    """Create and return a new category"""

    checking_categories = Category.query.filter(Category.name == name).first()

    if checking_categories:
        return checking_categories
    else:
        return Category(name=name)


def get_all_categories():
    """Gives all categories."""

    return Category.query.all()


def get_categoryId_by_name(name):
    """Get category_id by category name"""

    return Category.query.filter(Category.name == name).all()


def random_category():

    return Category.query.order_by(func.random()).first()


def get_restaurants_by_category(category_name):
    """Gives all restaurants by category."""

    get_category = Category.query.filter(
        Category.name == category_name).all()

    for categories in get_category:
        return categories.restaurants


# Restaurants categories ------------

def add_a_restaurant_to_a_category(restaurant_id, category_id):
    """Creates a relationship restaurant-category"""

    return RestaurantCategory(restaurant_id=restaurant_id, category_id=category_id)


# Ratings ------------

def create_rating(restaurant_id, user_id, score):
    """Create a rating."""

    return Rating(restaurant_id=restaurant_id, user_id=user_id, score=score)


def get_ratings_by_user(user_id):
    """Gives all ratings attributed to a user."""

    return Rating.query.filter(Rating.user_id == user_id).first()


def get_ratings_by_restaurant(restaurant_id):
    """Gives all ratings attributed to a restaurant."""

    return Rating.query.with_entities(func.avg(Rating.score)).filter(Rating.restaurant_id == restaurant_id).all()


# Favorites ------------

def add_a_restaurant_to_favorites(restaurant_id, user_id):

    return Favorite(restaurant_id=restaurant_id, user_id=user_id)


def filter_favorites_by_user(user_id):

    return Favorite.query.filter(Favorite.user_id == user_id).all()


def check_restaurant_in_favorites(restaurant_id, user_id):

    return Favorite.query.filter((Favorite.restaurant_id == restaurant_id) & (Favorite.user_id == user_id)).first()


# Reviews ------------

def create_review(restaurant_id, user_id, review, date):
    """Create a rating."""

    return Review(restaurant_id=restaurant_id, user_id=user_id, review=review, date=date)


def get_reviews_by_user(user_id):
    """Gives all reviews attributed to a user."""

    return Review.query.filter(Review.user_id == user_id).all()


def get_reviews_by_restaurant(restaurant_id):
    """Gives all restaurants by category."""

    return Review.query.filter(
        Review.restaurant_id == restaurant_id).all()

# Photos ------------


def add_photo(photo_url, restaurant_id, user_id):
    """Create a rating."""

    return Photo(photo_url=photo_url, restaurant_id=restaurant_id, user_id=user_id)


def filter_photos_by_user(user_id):
    """Gives all ratings attributed to a user."""

    return Photo.query.filter(Photo.user_id == user_id)


def filter_photos_by_restaurant(restaurant_id):
    """Gives all ratings attributed to a user."""

    return Photo.query.filter(Photo.restaurant_id == restaurant_id).first()


if __name__ == '__main__':
    from server import app
    connect_to_db(app)
