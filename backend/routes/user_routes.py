from flask import Blueprint
from controllers.user_controller import register_user, login_user
from controllers.car_controller import get_cars, add_car, update_car, delete_car

def register_routes(app):
    api = Blueprint("api", __name__)

    api.route("/register", methods=["POST"])(register_user)
    api.route("/login", methods=["POST"])(login_user)