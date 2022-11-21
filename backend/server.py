"""Server for restaurant ratings app."""

from flask import (Flask, jsonify, render_template, request, flash, session,
                   redirect)
from model import connect_to_db, db, User
import crud


app = Flask(__name__)
app.secret_key = "dev"


@app.route('/')
def show_homepage():
    """Show the application's homepage."""

    return render_template('index.html')


@app.route('/<path>')
def route(path):

    return render_template('index.html')


# @app.route('/user', methods=['POST'])
# def make_user():
#     """Create a new user"""

#     email = request.form.get('email')
#     password = request.form.get('password')

#     checking_user = crud.get_user_by_email(email)

#     if checking_user:
#         flash("This email is already for use by an existing user.")
#     else:
#         checking_user = crud.create_user(email, password)
#         db.session.add(checking_user)
#         db.session.commit()
#         flash("You have successfully created an account! Please login.")

#     return redirect('/')


@app.route('/api/login', methods=['POST'])
def login_user():

    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user = crud.get_user_password_and_user_id(email)

    user_password, user_id = user

    if not user_id:
        return jsonify({'status': '420', 'message': ' User not found, please sign up.'})
    elif password == user_password:
        session['user_id'] = user_id
        return jsonify({'status': '200', 'message': 'Logged in successfuly'})
    else:
        return jsonify({'status': '400', 'message': 'Incorret password'})


# @app.route('/api/categories')
# def get_categories():

#     categories = crud.get_all_categories()

#     category = []

#     for items in categories:
#         category.append(items.name)

#     return jsonify(category)


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
