from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # Enable CORS   
    CORS(app)

    #db.init_app(app)

    # Initialize the database
    db.init_app(app)

    # Import and register routes
    from .routes import main
    app.register_blueprint(main)

    # ✅ Create tables immediately in app context
    with app.app_context():
        db.create_all()

    return app
