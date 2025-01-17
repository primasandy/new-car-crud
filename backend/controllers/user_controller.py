from flask import jsonify, request
from flask_jwt_extended import create_access_token
from models.user import User
from models import db

def register_user():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 400

    user = User(username=username)
    user.set_password(password)  # Pastikan ini memanggil fungsi hashing
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

def login_user():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    print("User:", user)
    if user:
        print("Password Check:", user.check_password(password))

    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=username)
    return jsonify({"access_token": access_token}), 200
