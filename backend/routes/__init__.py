from flask import Blueprint
from controllers.user_controller import register_user, login_user
from controllers.car_controller import get_cars, add_car, update_car, delete_car

def register_routes(app):
    api = Blueprint("api", __name__)

    # User routes
    api.route("/register", methods=["POST"])(register_user)
    api.route("/login", methods=["POST"])(login_user)

    # Car routes
    api.route("/cars", methods=["GET"])(get_cars)
    api.route("/cars", methods=["POST"])(add_car)
    api.route("/cars/<int:car_id>", methods=["PUT"])(update_car)
    api.route("/cars/<int:car_id>", methods=["DELETE"])(delete_car)

    app.register_blueprint(api, url_prefix="/api")
