"""Script to seed database."""

from faker import Faker
from faker.providers import person
import os
import json
from datetime import datetime
import random

import crud
import model
import server


os.system('dropdb restaurants')
os.system('createdb restaurants')

model.connect_to_db(server.app)
model.db.create_all()

fake = Faker()
fake.add_provider(person)

PROFILE_PHOTOS = [
    'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/718978/pexels-photo-718978.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1006227/pexels-photo-1006227.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/773371/pexels-photo-773371.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3779853/pexels-photo-3779853.png?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/14634924/pexels-photo-14634924.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1757281/pexels-photo-1757281.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1764564/pexels-photo-1764564.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/936007/pexels-photo-936007.jpeg?auto=compress&cs=tinysrgb&w=800'
]

# Load restaurant data from JSON file
with open('./response.json') as f:
    restaurant_data = json.loads(f.read())


for restaurant in restaurant_data:

    name = restaurant["name"]
    address = restaurant["location"]["address1"]
    city = restaurant["location"]["city"]
    state = restaurant["location"]["state"]
    zipcode = restaurant["location"]["zip_code"]
    latitude = restaurant["coordinates"]["latitude"]
    longitude = restaurant["coordinates"]["longitude"]

    category = restaurant["categories"][0]["title"]
    rating = restaurant["rating"]
    photo_cover = restaurant["image_url"]

    # creates a restaurant
    db_restaurant = crud.create_new_restaurant(
        name=name,
        address=address,
        city=city,
        state=state,
        zipcode=zipcode,
        latitude=latitude,
        longitude=longitude,
        photo_cover=photo_cover)

    model.db.session.add(db_restaurant)
    model.db.session.flush()

    # creates a category
    db_category = crud.create_a_category(name=category)

    model.db.session.add(db_category)
    model.db.session.flush()

    # creates a relationship Restaurant-Category
    db_restaurantsCategories = crud.add_a_restaurant_to_a_category(
        restaurant_id=db_restaurant.restaurant_id,
        category_id=db_category.category_id)

    model.db.session.add(db_restaurantsCategories)
    model.db.session.flush()

    # # creates a photo
    # db_photo = crud.add_restaurant_photo(
    #     photo_url=photo_url,
    #     restaurant_id=db_restaurant.restaurant_id,
    #     user_id=None)

    # model.db.session.add(db_photo)
    # model.db.session.flush()

    # # add a rating
    # db_rating = crud.create_rating(
    #     restaurant_id=db_restaurant.restaurant_id,
    #     score=rating,
    #     user_id=None)

    # model.db.session.add(db_rating)
    # model.db.session.flush()

model.db.session.commit()


# creates a user
for n in range(20):
    password = 'test'
    fname = fake.first_name_female()
    lname = fake.last_name()
    email = f'{fname.lower()}{lname.lower()}@example.com'
    profile_photo = random.choice(PROFILE_PHOTOS)
    user = crud.create_new_user(
        email=email,
        password=password,
        fname=fname,
        lname=lname,
        profile_photo=profile_photo)

    model.db.session.add(user)
    model.db.session.flush()

model.db.session.commit()


# # creates a review

# REVIEWS = ["I cannot recommend this place enough. As much as I’d like to keep it to ourselves this restaurant is one of my all time favorites. Perfect spot for a date night, celebration, or just a good eat. The meal was seared and cooked to perfection topped with perfection. The ambience is great and the drinks are amazing as well. The bartender was extremely welcoming and knowledgeable about the local area.", " This is was second time there and it’s been consistent and amazing. Went there for breakfast one day and dinner the other and both have been absolutely amazing experiences! The dishes are worth every penny.  The view, ambiance and staff are absolutely amazing! Everyone from the hostess to the waiters to the assistant waters were all so great, friendly, and professional. They made the experience top notch!",
#            "This was our favorite restaurant while in Seattle. It's the perfect spot for dinner. The views are excellent and it's a short walk from the market area so it is super easy to get to! The food is fantastic. So many flavors and options and the dishes are not full of fried heavy foods. The dish options are veggie filled, fresh and plenty of seafood also to choose from. Definitely go with a foodie friend and someone you can order different things with and share them all family style!"]


# restaurants = crud.get_all_restaurants()
# # user = crud.get_random_user_from_db()

# for restaurant in restaurants:
#     user = crud.get_random_user_from_db()
#     now = datetime.now()
#     date = now.strftime("%d %B, %Y")
#     review = random.choice(REVIEWS)
#     restaurant_id = restaurant.restaurant_id
#     review = crud.create_review(
#         restaurant_id=restaurant_id,
#         user_id=user.user_id,
#         review=review,
#         date=date)

#     model.db.session.add(review)
#     model.db.session.flush()

# model.db.session.commit()


# creates a list of favorites and add ratings
users = crud.get_all_users()

for user in users:
    for i in range(5):
        restaurant = crud.get_random_restaurant_from_db()
        restaurant_id = restaurant.restaurant_id
        user_id = user.user_id
        favorites = crud.add_a_restaurant_to_favorites(
            restaurant_id=restaurant_id,
            user_id=user_id)

        model.db.session.add(favorites)
        model.db.session.flush()

    # add ratings
    for restaurant in crud.get_all_restaurants():
        db_rating = crud.create_rating(
            restaurant_id=restaurant.restaurant_id,
            score=random.choice([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]),
            user_id=user_id)

        model.db.session.add(db_rating)
        model.db.session.flush()

model.db.session.commit()
