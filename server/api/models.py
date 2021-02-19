#import sqlalchemy_jsonfield as db_json_field
from server.api.utils import get_spotify_object, is_new
from server.api.extensions import db
from flask_login import UserMixin
from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime
from datetime import timedelta

#---- This file store model/definitions for database tables

# valid for a week


class User(db.Model, UserMixin):
    __tablename__ = "user"
    user_id = db.Column(db.String(30), primary_key=True, nullable=False)
    user_name = db.Column(db.String(30))
    user_email = db.Column(db.String(20))
    join_date = db.Column(db.DateTime, default=datetime.utcnow)
    rank_progress = db.Column(db.Integer, default=0)

    info_json = db.Column(JSON)
    update_datetime = db.Column(db.DateTime)

    #for login
    def get_id(self):
        return self.user_id

    #so we will commit here, not by the caller
    def increment_rank_progress_c(self, increment_amt):
        self.rank_progress += increment_amt
        db.session.commit()


    def get_json(self):
        if is_new(self.update_datetime, timedelta(minutes=5)):
            return self.info_json

        #else update by calling api
        sp = get_spotify_object()
        new_json_info = sp.current_user()

        self.info_json = new_json_info
        self.update_datetime = datetime.utcnow()

        db.session.commit()

        return self.info_json


class Top_Tracks_Info(db.Model):
    __tablename__ = "top_tracks_info"
    user_id = db.Column(db.String(30), primary_key=True, nullable=False)
    info_json = db.Column(JSON)
    update_datetime = db.Column(db.DateTime)


    def get_json(self):
        if is_new(self.update_datetime, timedelta(hours=1)):
            return self.info_json

        #else update by calling api
        sp = get_spotify_object()
        new_json_info = sp.current_user_top_tracks(limit=50, time_range='long_term')

        self.info_json = new_json_info
        self.update_datetime = datetime.utcnow()
        db.session.commit()

        print("---in db, updating user top tracks info...")

        return self.info_json




class Top_Artists_Info(db.Model):
    __tablename = "top_artists_info"
    user_id = db.Column(db.String(30), primary_key=True, nullable=False)
    info_json = db.Column(JSON)
    update_datetime = db.Column(db.DateTime)


    def get_json(self):
        if is_new(self.update_datetime, timedelta(hours=1)):
            return self.info_json

        #else update by calling api
        sp = get_spotify_object()
        new_json_info = sp.current_user_top_artists(limit=50, time_range='long_term')

        self.info_json = new_json_info
        self.update_datetime = datetime.utcnow()
        db.session.commit()

        print("---in db, updating user top artists info...")

        return self.info_json




class Recent_Tracks_Info(db.Model):
    __table__name = "recent_tracks_info"
    user_id = db.Column(db.String(30), primary_key=True, nullable=False)
    info_json = db.Column(JSON)
    update_datetime = db.Column(db.DateTime)

    def get_json(self):
        if is_new(self.update_datetime, timedelta(minutes=5)):
            return self.info_json

        #else update by calling api
        sp = get_spotify_object()
        new_json_info = sp.current_user_recently_played(limit=50)

        self.info_json = new_json_info
        self.update_datetime = datetime.utcnow()

        db.session.commit()

        print("---in db, updating user recent tracks info...")

        return self.info_json



class Track_Info(db.Model):
    __tablename__ = "track_info"
    track_id = db.Column(db.String(30), primary_key=True, nullable=False)
    track_name = db.Column(db.String(30))
    #if not enough space, delete records according to last_active
    last_active = db.Column(db.DateTime)
    lyrics = db.Column(db.Text)
    background_info = db.Column(db.Text)

    info_json = db.Column(JSON)
    update_datetime = db.Column(db.DateTime)

    #call this method to get the data in json format
    def get_json(self):
        self.last_active = datetime.utcnow()
        db.session.commit()

        # don't change order
        return {
            'info_json': self.__get_json(),
            'track_id': self.track_id,
            'track_name': self.track_name,
            'lyrics': self.lyrics,
            'background_info': self.background_info
                }

    def update(self, lyrics, bg_info):
        self.last_active = datetime.utcnow()
        db.session.commit()

        self.lyrics = lyrics
        self.background_info = bg_info


    def __get_json(self):
        if is_new(self.update_datetime, timedelta(weeks=1)):
            return self.info_json

        #else update by calling api
        sp = get_spotify_object()
        new_info_json = sp.track(self.track_id)

        #update info json
        self.update_datetime = datetime.utcnow()
        self.info_json = new_info_json
        self.track_name = new_info_json['name']

        #since the caller is itself, do commit itself
        db.session.commit()

        print("---in db, updating track info...")

        return self.info_json





class Artist_Info(db.Model):
    __tablename__ = "artist_info"
    artist_id = db.Column(db.String(30), primary_key=True, nullable=False)
    artist_name = db.Column(db.String(30))
    #if not enough space, delete records according to last_active
    last_active = db.Column(db.DateTime)
    background_info = db.Column(db.Text)

    info_json = db.Column(JSON)
    update_datetime = db.Column(db.DateTime)



    #call this method to get the data in json format
    def get_json(self):
        self.last_active = datetime.utcnow()
        db.session.commit()

        return {
            #don't change order
            'info_json': self.__get_json(),
            'artist_id': self.artist_id,
            'artist_name': self.artist_name,
            'background_info': self.background_info
                }

    def update(self, bg_info):
        self.last_active = datetime.utcnow()
        db.session.commit()

        self.background_info = bg_info

    def __get_json(self):
        if is_new(self.update_datetime, timedelta(weeks=1)):
            return self.info_json

        #else update by calling api
        sp = get_spotify_object()
        new_info_json = sp.artist(self.artist_id)

        #update info_json in database
        self.update_datetime = datetime.utcnow()
        self.info_json = new_info_json
        self.artist_name = new_info_json['name']

        #since the caller is itself, do commit itself
        db.session.commit()

        print("---in db, updating artist info...")

        return self.info_json



class Album_Info(db.Model):
    __tablename__ = "album_info"
    album_id = db.Column(db.String(30), primary_key=True, nullable=False)
    album_name = db.Column(db.String(30))
    #if not enough space, delete records according to last_active
    last_active = db.Column(db.DateTime)
    background_info = db.Column(db.Text)

    info_json = db.Column(JSON)
    update_datetime = db.Column(db.DateTime)


    #call this method to update in database
    def update(self, bg_info):
        self.last_active = datetime.utcnow()
        self.background_info = bg_info

    #call this method to get the data in json format
    def get_json(self):
        self.last_active = datetime.utcnow()
        db.session.commit()

        return {
            #don't change order
            'info_json': self.__get_json(),
            'album_id': self.album_id,
            'album_name': self.album_name,
            'background_info': self.background_info
                }



    def __get_json(self):
        if is_new(self.update_datetime, timedelta(weeks=1)):
            return self.info_json

        #else update by calling api
        sp = get_spotify_object()
        new_info_json = sp.album(self.album_id)

        self.update_datetime = datetime.utcnow()
        self.info_json = new_info_json
        self.album_name = new_info_json['name']

        #since the caller is itself, do commit itself
        db.session.commit()

        print("---in db, updating album info...")

        return self.info_json

