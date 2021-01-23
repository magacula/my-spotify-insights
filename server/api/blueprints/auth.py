from flask import Blueprint

#routes relate to authentication

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/login")
def login():
    return "this is login page..."