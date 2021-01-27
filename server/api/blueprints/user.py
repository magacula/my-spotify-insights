from flask import Blueprint, session, render_template
from server.api.decorators import login_required, token_checked
from server.api.extensions import limiter

# routes for specific user (information)

user_bp = Blueprint('user', __name__)


@user_bp.route("/user/homepage")
@limiter.limit("5 per second")
@login_required
@token_checked
def home():
    return "this is user page..."
