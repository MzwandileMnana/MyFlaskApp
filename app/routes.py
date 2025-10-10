from flask import Blueprint, jsonify, request
from .models import User, db

main = Blueprint('main', __name__)

@main.route("/")
def home():
    return jsonify(message="Welcome to the backend!")

@main.route("/about")
def about():
    return jsonify(info="This is the about page")

@main.route("/health")
def health():
    return jsonify(status="OK")

@main.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@main.route("/users", methods=["POST"])
def create_user():
    data = request.json
    if not data.get("name") or not data.get("email"):
        return jsonify(error="Name and email required"), 400
    user = User(name=data["name"], email=data["email"])
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201
