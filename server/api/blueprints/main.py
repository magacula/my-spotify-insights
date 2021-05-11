from flask import Blueprint, render_template, current_app, request, session
from flask_login import login_required
from server.api.extensions import limiter, db
from server.api.decorators import token_checked
from server.api.utils import get_spotify_oauth, get_token_info, get_spotify_object, refresh_token_info
from server.api.models import Track_Info, Album_Info, Artist_Info

#--file: -------this file contains routes for public (not specific to a user)---------------

main_bp = Blueprint('main', __name__)


#--api: first route being called in heroku
@main_bp.route("/")
@limiter.limit("5 per second")
def index():

    # return the index.html file in the build folder (front end)
    return current_app.send_static_file('index.html')



#FIXME: this api is not being called
#--api: return json info about the artist
@main_bp.route("/main/artist_details/<artist_id>", methods=['GET', 'POST'])
@limiter.limit("5 per second")
@login_required
@token_checked
def artist_details(artist_id):
    db_artist_info = Artist_Info.query.filter(
        Artist_Info.artist_id == artist_id).first()

    # return information for an artist
    if request.method == 'GET':

        # if artist exists in database
        if db_artist_info:
            stored_data = db_artist_info.get_json()
            return stored_data

        else:
            # else if album not exist in database, add new row with id, database will take care the rest
            new_db_artist_info = Artist_Info(artist_id=artist_id)
            db.session.add(new_db_artist_info)

            # push changes to db
            db.session.commit()

            return new_db_artist_info.get_json()

    if request.method == 'POST':
        # FIXME: need {bg_info} as input, so far
        data_json = request.get_json()
        bg_info = data_json['bg_info']

        # if track exists in db, do update
        if db_artist_info:
            print("----post, updating artist info...")
            db_artist_info.update(bg_info=bg_info)
            # push changes to db
            db.session.commit()

    # if post, nothing to return
    return {}


#FIXME: this api is not being called
#--api: return json info about the track
@main_bp.route("/main/track_details/<track_id>", methods=['GET', 'POST'])
@login_required
@token_checked
@limiter.limit("5 per second")
def track_details(track_id):
    db_track_info = Track_Info.query.filter(
        Track_Info.track_id == track_id).first()

    # return information for a track
    if request.method == 'GET':

        # if track exists in database
        if db_track_info:
            stored_data = db_track_info.get_json()
            return stored_data

        else:
            # else if track not exist in database
            new_db_track_info = Track_Info(track_id=track_id)
            db.session.add(new_db_track_info)

            # push changes to db
            db.session.commit()

            return new_db_track_info.get_json()

    if request.method == 'POST':
        # FIXME: need {lyrics, bg_info} as input, so far

        # if track exists in db, do update
        data_json = request.get_json()
        if db_track_info:
            # can only update one at a time
            try:
                lyrics = data_json['lyrics']
                db_track_info.update_lyrics(lyrics)
                # push changes to db
                db.session.commit()

            except Exception as e:
                bg_info = data_json['bg_info']
                db_track_info.update_background_information(bg_info)
                # push changes to db
                db.session.commit()

    # if post, nothing to return
    return {}


#FIXME: this api doesn't seem to be called, but i will keep it just in case, most other api will have url inclued
#--api: return the track_preview_url for the track if there is one
@main_bp.route("/main/track_preview_url/<track_id>")
@limiter.limit("5 per second")
@login_required
@token_checked
def track_preview_url(track_id):
    sp = get_spotify_object()
    track_details = sp.track(track_id)
    track_preview_link = track_details['preview_url']

    # some tracks do not have preview url
    if not track_preview_link:
        return "false"

    return track_preview_link


#FIXME: this api is not being called
#--api: return json info about the album
@main_bp.route("/main/album_details/<album_id>", methods=['GET', 'POST'])
@limiter.limit("5 per second")
@login_required
@token_checked
def album_details(album_id):

    db_album_info = Album_Info.query.filter(
        Album_Info.album_id == album_id).first()

    # return information for an album
    if request.method == 'GET':

        # if album exists in database
        if db_album_info:
            stored_data = db_album_info.get_json()
            return stored_data

        else:
            # else if album not exist in database
            new_db_album_info = Album_Info(album_id=album_id)
            db.session.add(new_db_album_info)

            # push changes to db
            db.session.commit()

            return new_db_album_info.get_json()

    if request.method == 'POST':
        # FIXME: need {bg_info} as input, so far
        data_json = request.get_json()
        bg_info = data_json['bg_info']

        # if track exists in db, do update
        if db_album_info:
            print("----post, updating album info...")
            db_album_info.update(bg_info=bg_info)
            # push changes to db
            db.session.commit()

    # if post, nothing to return
    return {}


#FIXME: this doesn't seem to be called, since the info for user playlist comes with details
#--api: return the json info for the playlist
@main_bp.route("/main/playlist_details/<playlist_id>")
@limiter.limit("5 per second")
@login_required
@token_checked
def playlist_details(playlist_id):
    sp = get_spotify_object()

    playlist_details_raw = sp.playlist(playlist_id)

    return playlist_details_raw

