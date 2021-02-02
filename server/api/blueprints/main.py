from flask import Blueprint, render_template
from server.api.extensions import limiter
from server.api.decorators import login_required
from server.api.utils import get_spotify_oauth, get_token_info, get_spotify_object, refresh_token_info

#-------routes for public (not specific to a user)---------------

main_bp = Blueprint('main', __name__)


#FIXME: may not need this later
@main_bp.route("/")
@limiter.limit("5 per second")
def index():
    #return "hello, this is a test page..."
    return render_template('main/site_landing_page.html')

#FIXME: delete later
@main_bp.route("/testlimit")
@limiter.limit("1 per second")
def test_limit():
    return "this is the testing limit page..current limit: 1 per second"


@main_bp.route("/main/artistdetails/<artist_id>")
@login_required
@limiter.limit("2 per second")
def artist_details(artist_id):
    sp = get_spotify_object()
    artist_details = sp.artist(artist_id)

    return artist_details


@main_bp.route("/main/trackdetails/<track_id>")
@login_required
@limiter.limit("2 per second")
def track_details(track_id):
    sp = get_spotify_object()
    track_details = sp.track(track_id)

    return track_details

@main_bp.route("/main/albumdetails/<album_id>")
@login_required
@limiter.limit("2 per second")
def album_details(album_id):
    sp = get_spotify_object()
    album_details = sp.album(album_id)
