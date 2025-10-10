from app import create_app
import os

app = create_app()
debug_mode = os.getenv("FLASK_DEBUG", "True") == "True"
port = int(os.getenv("PORT", 5000))

if __name__ == "__main__":
    app.run(debug=debug_mode, port=port)
