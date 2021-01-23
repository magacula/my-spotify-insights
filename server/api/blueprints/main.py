from flask import Blueprint, render_template

#routes for public (not specific to a user)

main_bp = Blueprint('main', __name__)


@main_bp.route("/")
def index():
    #return "hello, this is a test page..."
    return render_template('main/site_landing_page.html')