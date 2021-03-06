#import mysql.connector
import os
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask import redirect, url_for
from flask_bootstrap import Bootstrap

#extensions for the backend part
#postgresql in heroku has restrctions on the numbers or rows, so if we have more than 10000 rows, use sqlalchemy
db =SQLAlchemy()


#limiter used to limiter the visit rate according to remote address
limiter = Limiter(key_func=get_remote_address, default_limits=["5 per second"])


login_manager = LoginManager()
@login_manager.user_loader
def load_user(user_id):
    from server.api.models import User
    #print("----load user: id: ", user_id)
    user = User.query.get_or_404(user_id)
    return user

#login_manager.login_view = 'main.index'
#work with login_required
@login_manager.unauthorized_handler
def unauthorized():
    return redirect(url_for('auth.access_denied'))


bootstrap = Bootstrap()