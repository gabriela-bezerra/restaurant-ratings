# Restaurant Finder

Restaurant Finder is an interactive platform that helps users discover new dining options, share their own restaurant experiences and contribute to a growing community of foodies. Built with Python and React, it offers fast navigation, responsive design, and a powerful Postgres database.

[Link to the live demo]

## Deployment 
http://18.237.112.181/

## Contents

- [Tech Stack](https://github.com/gabriela-bezerra/restaurant-ratings#tehcnologies)
- [Features](https://github.com/gabriela-bezerra/restaurant-ratings#features)
- [Installation](https://github.com/gabriela-bezerra/restaurant-ratings#installation)
- [About Me](https://github.com/gabriela-bezerra/restaurant-ratings#about-me)

## Technologies

- Backend: Python, Flask, PostgreSQL, SQLAlchemy.
- Frontend: ReactJS, JavaScript, AJAX, HTML5, CSS3.
- Libraries: Cloudinary, Faker.

## Features
Users can easily find the perfect restaurant by searching for it by category, zip code, or simply viewing a list of all the restaurants available.

![alt text](https://res.cloudinary.com/di0sy25ru/image/upload/v1674794087/IMG_2335_zpr4ar.jpg "Search page")
![alt text](https://res.cloudinary.com/di0sy25ru/image/upload/v1674794084/IMG_2330_u0u4vt.jpg "Restaurnts list")

Users can create a new account by simply providing their information and submitting the form. The data will be securely sent to our server, and a new account will be created in our database. Once once the account is created, they'll be redirected to the profile page and see a success message.

![alt text](https://res.cloudinary.com/di0sy25ru/image/upload/v1674794090/IMG_2326_rgrzol.jpg "New account")
![alt text](https://res.cloudinary.com/di0sy25ru/image/upload/v1674794090/IMG_2327_bezmv4.jpg "Profile page")

Users can easily add a profile photo to their account thanks to our integration of Cloudinary API for efficient image handling.

 ![alt text](https://res.cloudinary.com/di0sy25ru/image/upload/v1674794090/IMG_2324_cpql8f.jpg "Cloudinary")
 
Users can easily save their favorite restaurants with a simple click, They can add and remove restaurants from their personalized list which is then displayed and managed on the user's profile page.

 ![alt text](https://res.cloudinary.com/di0sy25ru/image/upload/v1674794084/IMG_2331_e2uuch.jpg "Favorites")

Our app offers an easy-to-use review feature that allows users to quickly leave a review, add a rating, and even upload an optional photo for a restaurant. Users can also view the photo of other reviews in full-size by clicking on it and opening a modal.
![alt text](https://res.cloudinary.com/di0sy25ru/image/upload/v1674794084/IMG_2334_am67fy.jpg "Review")
![alt text](https://res.cloudinary.com/di0sy25ru/image/upload/v1674794089/IMG_2329_lqrilq.jpg "ReviewModal")

Users can help our platform grow by adding their own favorite restaurants, and share them with others. This will also help to expand the database."

![alt text](https://res.cloudinary.com/di0sy25ru/image/upload/v1674794085/IMG_2332_oueqgi.jpg "New Restaurant")

## Installation

Requirements:

- Python 3.9
- Flask
- PostgreSQL

To have this app running on your local computer, please follow the below steps:

Clone repository:
```sh
$ git clone https://github.com/gabriela-bezerra/restaurant-ratings.git
```

Create and activate a virtual environment:

```sh
$ virtualenv env
$ source env/bin/activate
```

Install dependencies:

```sh
$ pip install -r requirements.txt
```

Create the database and seed with the existing example data.

```sh
$ python3 seed_database(API).py
```


Run the app from the command line.

```sh
$ python3 server.py
```

## About me

Hi, I'm Gabriela! 

I bring a unique combination of skills to the table as a Full Stack Software Engineer with a background in Human Resources. My experience in data analysis, project management, and cross-functional collaboration has taught me the importance of strong problem-solving, communication, and interpersonal skills, which I've honed during my time in HR. 

I am a fast learner with a passion for technology and learning, and I enjoy using my skills to build robust and maintainable technical solutions. My technical skills include ReactJS, JavaScript, HTML, CSS, Python, and SQL. 

As a bilingual individual, I am able to work effectively in diverse environments and thrive in constantly challenging situations. In my free time, I enjoy experimenting with new technologies and contributing to open source projects. 

Check out my [LinkedIn] profile and connect with me if you want to learn more about my work and how I can bring value to your team! 

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Link to the live demo]: <https://www.youtube.com/watch?v=e7YCFDl5M5E&t=3s>
   [LinkedIn]: <https://www.linkedin.com/in/gabriela-bezerra-us/>
