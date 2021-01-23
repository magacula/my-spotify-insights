from flask import Blueprint, session
from server.api.decorators import login_required, token_checked

#routes for specific user (information)

user_bp = Blueprint('user', __name__)

@user_bp.route("/user/homepage")
@login_required
@token_checked
def home():
    return "this is user page..."