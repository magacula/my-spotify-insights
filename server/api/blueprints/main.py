from flask import Blueprint, render_template, current_app, request
from server.api.extensions import limiter, db
from server.api.decorators import login_required, token_checked
from server.api.utils import get_spotify_oauth, get_token_info, get_spotify_object, refresh_token_info
from server.api.models import Track_Info

# -------this file contains routes for public (not specific to a user)---------------

main_bp = Blueprint('main', __name__)


# first route being called in heroku
@main_bp.route("/")
@limiter.limit("5 per second")
def index():

    # return the index.html file in the build folder (front end)
    return current_app.send_static_file('index.html')


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


@main_bp.route("/main/track_details/<track_id>", methods=['GET', 'POST'])
@login_required
@limiter.limit("2 per second")
def track_details(track_id):
    db_track_info = Track_Info.query.filter(Track_Info.track_id == track_id).first()

    #return information for a track
    if request.method == 'GET':

        #if track exists in database
        if db_track_info:
            print("---- in db")
            stored_data = db_track_info.get_json()
            return stored_data

        else:
            #else if track not exist in database
            #get from spotify
            sp = get_spotify_object()
            new_info_json = sp.track(track_id)

            new_db_track_info = Track_Info(track_id=track_id)
            new_db_track_info.update(name=new_info_json['name'])
            db.session.add(new_db_track_info)

            #push changes to db
            db.session.commit()

            return new_db_track_info.get_json()




    if request.method == 'POST':
        #FIXME: need {name, lyrics, bg_info} as input, so far
        data_json = request.get_json()
        name = data_json['name']
        lyrics = data_json['lyrics']
        bg_info = data_json['bg_info']

        # if track exists in db, do update
        if db_track_info:
            print("----post, updating track info...")
            db_track_info.update(name=name, lyrics=lyrics, bg_info=bg_info)


        # otherwise, insert to new row to the database
        else:
            new_db_track_info = Track_Info(track_id=id)
            new_db_track_info.update(name=name, lyrics=lyrics, bg_info=bg_info)
            db.session.add(new_db_track_info)


        #push changes to db
        db.session.commit()

    #if post, nothing to return
    return {}




@main_bp.route("/main/track_preview_url/<track_id>")
@limiter.limit("2 per second")
@login_required
@token_checked
def track_preview_url(track_id):
    sp = get_spotify_object()
    # FIXME: should search in database, if none call api
    track_details = sp.track(track_id)
    track_preview_link = track_details['preview_url']

    # some tracks do not have preview url
    if not track_preview_link:
        return "false"

    return track_preview_link


@main_bp.route("/main/start_playback/<track_id>")
@limiter.limit("2 per second")
@login_required
@token_checked
def playback(track_id):
    sp = get_spotify_object
    track_details = sp.track(track_id)
    track_preview_link = track_details['preview_url']

    sp.start_playback(uris=[f'spotify:track:{track_id}'])


    # if unable to play track
    if not track_preview_link:

        return False

    return True


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

    return playlist_details_raw
