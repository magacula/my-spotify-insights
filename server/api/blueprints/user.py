from flask import Blueprint

#routes for specific user (information)

user_bp = Blueprint('user', __name__)

@user_bp.route("/user")
def user():
    return "this is user page..."