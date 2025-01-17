from flask import jsonify, request
from models.car import Car
from models import db

def get_cars():
    cars = Car.query.all()
    return jsonify([{ "id": car.id, "brand": car.brand, "model": car.model, "year": car.year } for car in cars]), 200

def add_car():
    data = request.json
    car = Car(**data)
    db.session.add(car)
    db.session.commit()
    return jsonify({"message": "Car added successfully"}), 201

def update_car(car_id):
    data = request.json
    car = Car.query.get_or_404(car_id)
    for key, value in data.items():
        setattr(car, key, value)
    db.session.commit()
    return jsonify({"message": "Car updated successfully"}), 200

def delete_car(car_id):
    car = Car.query.get_or_404(car_id)
    db.session.delete(car)
    db.session.commit()
    return jsonify({"message": "Car deleted successfully"}), 200