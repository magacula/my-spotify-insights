from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, AnonymousUserMixin
from flask import redirect, url_for
from flask_bootstrap import Bootstrap
from datetime import datetime
from flask_moment import Moment
from flask_wtf.csrf import CSRFProtect
from flask_ckeditor import CKEditor

#--file: extensions for the backend part


#database
db =SQLAlchemy()

#limiter used to limiter the visit rate according to remote address
limiter = Limiter(key_func=get_remote_address, default_limits=["5 per second"])

#user login related extension
login_manager = LoginManager()

#this function will be called whenever check "login_required" decorator
@login_manager.user_loader
def load_user(user_id):
    #put it here to prevent recursive import with models.py
    from server.api.models import User
    user = User.query.get_or_404(user_id)

    # FIXME: works, but not able to redirect frontend page to 403, only output 403 in console
    if user.banned:
        return None

    #update last active timestamp
    user.timestamp = datetime.utcnow()
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

#to deal with api calls when user is not logged in
class Guest(AnonymousUserMixin):

    @property
    def user_id(self):
        return -1

    @property
    def user_name(self):
        return "N/A"

login_manager.anonymous_user = Guest

#for some html rendering
bootstrap = Bootstrap()

#for displaying time in proper format
moment = Moment()

#for crosssite protection when doing post
csrf =CSRFProtect()

#for editor in html
ckeditor = CKEditor()