#import mysql.connector
import os
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask import redirect, url_for
from flask_bootstrap import Bootstrap
from datetime import datetime

#extensions for the backend part
#postgresql in heroku has restrctions on the numbers or rows, so if we have more than 10000 rows, use sqlalchemy
db =SQLAlchemy()


#limiter used to limiter the visit rate according to remote address
limiter = Limiter(key_func=get_remote_address, default_limits=["5 per second"])


login_manager = LoginManager()

#this function will be called whenever check "login_required" decorator
@login_manager.user_loader
def load_user(user_id):
    from server.api.models import User
    user = User.query.get_or_404(user_id)

    # FIXME: works, but not able to redirect frontend page to 403, only output 403 in console
    if user.banned:
        return None

    #update last active timestamp
    user.last_active_timestamp = datetime.utcnow()
    #update ip address
    user.ip_addr = get_remote_address()
    #print("----remote address: ", get_remote_address())
    db.session.commit()
    return user

#login_manager.login_view = 'main.index'
#work with login_required
@login_manager.unauthorized_handler
def unauthorized():
    print("----failed login_required decorator...")
    return redirect(url_for('auth.access_denied'))


bootstrap = Bootstrap()