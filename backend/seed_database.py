"""Script to seed database."""

from faker import Faker
from faker.providers import address, geo, internet, person, company
import os
import json
import datetime
from random import choice, randint

import crud
import model
import server


os.system('dropdb restaurants')
os.system('createdb restaurants')

model.connect_to_db(server.app)
model.db.create_all()

fake = Faker()
fake.add_provider(address)
fake.add_provider(geo)
fake.add_provider(internet)
fake.add_provider(person)
fake.add_provider(company)

# creates a category

categories_options = ["Asian Fusion", "Bakery", "Bar/Louge", "Barbeque", "Breakfast", "British", "Brunch", "Burgers", "Caribbean", "Chinese",
                      "Coffee", "Cuban", "Deli", "Fast Food", "Doughnuts", "French", "German", "Italian", "Japonese", "Mexican", "Steaks", "Vegan", "Thai"]

for category in categories_options:
    db_category = crud.create_a_category(name=category)
    model.db.session.add(db_category)
    model.db.session.flush()
    print('------db_category-------')
    print(db_category)

for _ in range(20):
    name = fake.company()
    address = fake.street_address()
    city = fake.city()
    state = "WA"

    zipcode = fake.zipcode_in_state('WA')
    latitude, longitude, _, _, _ = fake.local_latlng()

    rating = randint(1, 5)
    review = fake.text()
    photo_url = fake.image_url()

    # creates a restaurant
    db_restaurant = crud.create_restaurant(
        name=name,
        address=address,
        city=city,
        state=state,
        zipcode=zipcode,
        latitude=latitude,
        longitude=longitude)
    print('------Restaurant-------')
    print(db_restaurant)

    model.db.session.add(db_restaurant)
    model.db.session.flush()

    category = crud.random_category()
    print('------random category-------')
    print(category)

    # creates a relationship Restaurant-Category
    db_restaurantsCategories = crud.add_a_restaurant_to_a_category(
        restaurant_id=db_restaurant.restaurant_id,
        category_id=category.category_id)

    print(db_restaurantsCategories)
    model.db.session.add(db_restaurantsCategories)
    model.db.session.flush()

    # creates a photo
    db_photo = crud.add_photo(
        photo_url=photo_url,
        restaurant_id=db_restaurant.restaurant_id,
        user_id=None)

    print(db_photo)
    model.db.session.add(db_photo)
    model.db.session.flush()

    # add a rating
    db_rating = crud.create_rating(
        restaurant_id=db_restaurant.restaurant_id,
        score=rating,
        user_id=None)
    print(db_rating)

    model.db.session.add(db_rating)
    model.db.session.flush()


model.db.session.commit()

for n in range(10):
    password = 'test'
    fname = fake.first_name()
    lname = fake.last_name()
    email = f'{fname.lower()}{lname.lower()}@example.com'

    user = crud.create_user(
        email=email,
        password=password,
        fname=fname,
        lname=lname)

    print(user)

    model.db.session.add(user)
    model.db.session.flush()


model.db.session.commit()
