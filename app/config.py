import os

class Config:
    APP_NAME = os.getenv("APP_NAME", "My Flask App")
    DEBUG = os.getenv("FLASK_DEBUG", "True") == "True"
    SQLALCHEMY_DATABASE_URI = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{int(os.getenv('DB_PORT', 5432))}/{os.getenv('DB_NAME')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
