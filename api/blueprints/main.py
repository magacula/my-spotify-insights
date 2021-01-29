from flask import Blueprint, render_template
from api import limiter

#routes for public (not specific to a user)

main_bp = Blueprint('main', __name__)


@main_bp.route("/")
@limiter.limit("5 per second")
def index():
    #return "hello, this is a test page..."
    return render_template('main/site_landing_page.html')

@main_bp.route("/testlimit")
@limiter.limit("1 per second")
def test_limit():
    return "this is the testing limit page..current limit: 1 per second"