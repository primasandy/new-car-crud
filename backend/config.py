from flask_cors import CORS
import os

class Config:
    # Secret key untuk JWT dan session management
    SECRET_KEY = os.environ.get("SECRET_KEY", "your_default_secret_key_here")
    
    # Konfigurasi untuk CORS
    CORS_HEADERS = "Content-Type"
    
    # Konfigurasi untuk koneksi database MariaDB
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", 
        "mysql+pymysql://dbcar_highsandof:0758b475eda21b0cf72c3832fe928b8dbcea59b6@ajs4v.h.filess.io:3305/dbcar_highsandof"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Konfigurasi untuk mode debug dan produksi
    DEBUG = os.environ.get("FLASK_DEBUG", "False") == "True"
    ENV = os.environ.get("FLASK_ENV", "production")  # Tentukan mode (production / development)
