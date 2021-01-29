from flask import Blueprint
from api import login_required, token_checked
from api import limiter

# routes for specific user (information)

user_bp = Blueprint('user', __name__)


@user_bp.route("/user/homepage")
@limiter.limit("5 per second")
@login_required
@token_checked
def home():
    return "this is user page..."
