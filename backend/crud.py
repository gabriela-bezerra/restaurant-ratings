"""CRUD operations."""

from model import db, User, Restaurant, Category, RestaurantCategory, Rating, Review, Photo, connect_to_db

# Users ------------


def create_user(email, password, fname, lname):
    """Create and return a new user."""

    return User(email=email, password=password, fname=fname, lname=lname)


def get_all_users():
    """Gives all users."""

    return User.query.all()


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


# Restaurants ------------

def create_restaurant(name, address, city, state, zipcode, latitude, longitude):
    """Create and return a new restaurante."""

    return Restaurant(name=name, address=address, city=city, state=state, zipcode=zipcode, latitude=latitude, longitude=longitude)


def get_all_restaurants():
    """Gives all restaurants."""

    return Restaurant.query.all()


def get_specific_restaurant(restaurant_id):
    """Gives restaurant of choice."""

    return Restaurant.query.get(restaurant_id)


# Categories ------------


def create_a_category(name):
    """Create and return a new category"""

    return Category(name=name)


def get_all_categories():
    """Gives all categories."""

    return Category.query.all()


# Restaurants categories ------------

def add_a_restaurant_to_a_category(restaurant_id, category_id):
    """Creates a relationship restaurant-category"""

    return RestaurantCategory(restaurant_id=restaurant_id, category_id=category_id)


def get_restaurants_by_category(restaurant_id):
    """Gives all restaurants by category."""

    return RestaurantCategory.query.filter(RestaurantCategory.restaurant_id == restaurant_id)

# Ratings ------------


def create_rating(restaurant_id, user_id, score):
    """Create a rating."""

    return Rating(restaurant_id=restaurant_id, user_id=user_id, score=score)


def filter_ratings_by_user(user_id):
    """Gives all ratings attributed to a user."""

    return Rating.query.filter(Rating.user_id == user_id)


def filter_ratings_by_restaurant(restaurant_id):
    """Gives all ratings attributed to a restaurant."""

    return Rating.query.filter(Rating.restaurant_id == restaurant_id)

# def delete_specific_rating(restaurant_id):

#     return Restaurant.query.get(restaurant_id=restaurant_id).delete()


# Reviews ------------

def create_review(restaurant_id, user_id, review, date):
    """Create a rating."""

    return Review(restaurant_id=restaurant_id, user_id=user_id, review=review, date=date)


def filter_reviews_by_user(user_id):
    """Gives all reviews attributed to a user."""

    return Review.query.filter(Review.user_id == user_id)


def filter_ratings_by_restaurant(restaurant_id):
    """Gives all reviews attributed to a restaurant."""

    return Review.query.filter(Review.restaurant_id == restaurant_id)


# Photos ------------

def add_photo(photo_url, restaurant_id, user_id):
    """Create a rating."""

    return Photo(photo_url=photo_url, restaurant_id=restaurant_id, user_id=user_id)


def filter_photos_by_user(user_id):
    """Gives all ratings attributed to a user."""

    return Photo.query.filter(Photo.user_id == user_id)


def filter_photos_by_restaurant(restaurant_id):
    """Gives all ratings attributed to a user."""

    return Photo.query.filter(Photo.restaurant_id == restaurant_id)


if __name__ == '__main__':
    from server import app
    connect_to_db(app)
