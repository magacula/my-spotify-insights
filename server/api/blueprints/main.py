from flask import Blueprint, render_template
from server.api.extensions import limiter
from server.api.decorators import login_required, token_checked
from server.api.utils import get_spotify_oauth, get_token_info, get_spotify_object, refresh_token_info

# -------routes for public (not specific to a user)---------------

main_bp = Blueprint('main', __name__)


# FIXME: may not need this later
@main_bp.route("/")
@limiter.limit("5 per second")
def index():
    # return "hello, this is a test page..."
    return render_template('main/site_landing_page.html')

# FIXME: delete later


@main_bp.route("/testlimit")
@limiter.limit("1 per second")
def test_limit():
    return "this is the testing limit page..current limit: 1 per second"


@main_bp.route("/main/artist_details/<artist_id>")
@limiter.limit("2 per second")
@login_required
@token_checked
def artist_details(artist_id):
    sp = get_spotify_object()
    artist_details = sp.artist(artist_id)

    # looks like it's better to return the whole json in this case
    return artist_details


@main_bp.route("/main/track_details/<track_id>")
@login_required
@limiter.limit("2 per second")
def track_details(track_id):
    sp = get_spotify_object()
    track_details = sp.track(track_id)

    # get preview_url using:  track_detials['preview_url']
    # looks like it's better to return the whole json in this case
    return track_details


@main_bp.route("/main/track_preview_url/<track_id>")
@limiter.limit("2 per second")
@login_required
@token_checked
def track_preview_url(track_id):
    sp = get_spotify_object()
    # FIXME: should search in database, if none call api
    track_details = sp.track(track_id)
    track_preview_link = track_details['preview_url']
    return track_preview_link


@main_bp.route("/main/album_details/<album_id>")
@limiter.limit("2 per second")
@login_required
@token_checked
def album_details(album_id):
    sp = get_spotify_object()
    album_details = sp.album(album_id)

    # looks like it's better to return the whole json in this case
    return album_details


@main_bp.route("/main/playlist_details/<playlist_id>")
@limiter.limit("2 per second")
@login_required
@token_checked
def playlist_details(playlist_id):
    sp = get_spotify_object()

    playlist_details_raw = sp.playlist(playlist_id)

    """
    playlist_details = {
        'id': playlist_details_raw['id'],
        'name': playlist_details_raw['name'],
        'followers_count': playlist_details_raw['followers']['total'],
        'count': playlist_details_raw['tracks']['total'],
        'owner_name': playlist_details_raw['owner']['display_name'],
        'owner_id': playlist_details_raw['owner']['id'],
        }
    #FIXME: not done
    return playlist_details
    """

    # looks like it's better to return the whole json in this case
    return playlist_details_raw
