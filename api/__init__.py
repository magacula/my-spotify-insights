from flask import Flask
from flask_cors import CORS
#from authlib.integrations.flask_client import OAuth
# for oauth

from api.blueprints.main import main_bp
from api.blueprints.admin import admin_bp
from api.blueprints.user import user_bp
from api.blueprints.auth import auth_bp


#from front_end.api.extensions import login_manager
import os

# def create_app(config_name=None):

template_dir = os.path.abspath('./api/templates/')

app = Flask(__name__, static_folder='../build', static_url_path='', template_folder=template_dir)
CORS(app)
#app = Flask('api')

app.secret_key = os.getenv('SECRET_KEY')
# for now
app.config['SESSION_COOKIE_NAME'] = 'mySpotifyInsight_cookie'
# oauth = OAuth(app)

@app.route("/")
def index():
    return app.send_static_file('index.html')

#FIXME: for now
if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

@app.route("/test")
def test_route():
    return "test route"

admin_bp = Blueprint('admin', __name__)

@admin_bp.route("/admin")
def admin():
    return "admin page"