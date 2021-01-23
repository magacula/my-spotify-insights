from flask import Blueprint

#routes for public (not specific to a user)

main_bp = Blueprint('main', __name__)


@main_bp.route("/")
def index():
    return "hello, this is a test page..."