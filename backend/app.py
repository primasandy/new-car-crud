from flask import Flask
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from models import db
from routes import register_routes
from config import Config
from flask_cors import CORS
import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="static")
app.config.from_object(Config)
CORS(app, origins=os.environ.get("CORS_ORIGINS", "*"))  # Izinkan origin dari variabel lingkungan


@app.route("/")
def serve_react_app():
    return send_from_directory(app.static_folder, "index.html")

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Register routes
register_routes(app)

if __name__ == "__main__":
    app.run(debug=True)