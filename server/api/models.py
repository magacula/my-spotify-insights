from flask_sqlalchemy import event
from server.api.utils import get_spotify_object, is_new
from server.api.extensions import db
from flask_login import UserMixin
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.mutable import MutableDict
from datetime import datetime
from datetime import timedelta

# ---- This file store model/definitions for database tables

# valid for a week


class User(db.Model, UserMixin):
    __tablename__ = "user"
    user_id = db.Column(db.String(30), primary_key=True, nullable=False)
    user_name = db.Column(db.String(30))
    user_email = db.Column(db.String(20))
    join_date = db.Column(db.DateTime, default=datetime.utcnow)
    rank_progress = db.Column(db.Integer, default=0)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    ip_addr = db.Column(db.String(20))

    info_json = db.Column(JSON)
    update_datetime = db.Column(db.DateTime)

    # local tracks
    # {'name_timestamp':'path', 'name_timestamp':'path', ....}
    local_tracks_json = db.Column(MutableDict.as_mutable(JSON), default={})

    bug_reports = db.relationship(
        'Bug_Report', back_populates='author', cascade='all, delete-orphan')

    banned = db.Column(db.Boolean, default=False)
    banned_reason = db.Column(db.Text)
    banned_timestamp = db.Column(db.DateTime)

    # for login
    def get_id(self):
        # award rank progress if login in different date
        if not (self.timestamp.date() == datetime.utcnow().date()):
            print("-----add 10 to rank progress")
            self.increment_rank_progress_c(10)

        return self.user_id

    # so we will commit here, not by the caller
    def increment_rank_progress_c(self, increment_amt):
        self.rank_progress += increment_amt
        db.session.commit()

    def get_json(self):
        if is_new(self.update_datetime, timedelta(minutes=5)):
            return self.info_json

        # else update by calling api
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
    timestamp = db.Column(db.DateTime, index=True)

    def get_json(self):
        if is_new(self.timestamp, timedelta(hours=1)):
            return self.info_json

        # else update by calling api
        sp = get_spotify_object()
        new_json_info = sp.current_user_top_tracks(
            limit=50, time_range='long_term')

        self.info_json = new_json_info
        self.timestamp = datetime.utcnow()
        db.session.commit()

        print("---in db, updating user top tracks info...")

        return self.info_json


class Top_Artists_Info(db.Model):
    __tablename = "top_artists_info"
    user_id = db.Column(db.String(30), primary_key=True, nullable=False)
    info_json = db.Column(JSON)
    timestamp = db.Column(db.DateTime, index=True)

    def get_json(self):
        if is_new(self.timestamp, timedelta(hours=1)):
            return self.info_json

        # else update by calling api
        sp = get_spotify_object()
        new_json_info = sp.current_user_top_artists(
            limit=50, time_range='long_term')

        self.info_json = new_json_info
        self.timestamp = datetime.utcnow()
        db.session.commit()

        print("---in db, updating user top artists info...")

        return self.info_json


class Recent_Tracks_Info(db.Model):
    __table__name = "recent_tracks_info"
    user_id = db.Column(db.String(30), primary_key=True, nullable=False)
    info_json = db.Column(JSON)
    timestamp = db.Column(db.DateTime, index=True)

    def get_json(self):
        if is_new(self.timestamp, timedelta(minutes=5)):
            return self.info_json

        # else update by calling api
        sp = get_spotify_object()
        new_json_info = sp.current_user_recently_played(limit=50)

        self.info_json = new_json_info
        self.timestamp = datetime.utcnow()

        db.session.commit()

        print("---in db, updating user recent tracks info...")

        return self.info_json


class Track_Info(db.Model):
    __tablename__ = "track_info"
    track_id = db.Column(db.String(30), primary_key=True, nullable=False)
    track_name = db.Column(db.String(30))
    # if not enough space, delete records according to last_active
    #last_active = db.Column(db.DateTime)

    #with timestamp will have the starting time of that sentence as the key, and value is the actual sentence
    #without timestamp will be just the lyrics in terms of a list of sentences
    #{'with_timestamp': [0:"first sentence",  13.5: "second sentence"], without_timestamp:[]}
    lyrics = db.Column(db.JSON)
    background_info = db.Column(db.Text)
    release_date = db.Column(db.Text)
    genre = db.Column(db.Text)

    info_json = db.Column(JSON)
    timestamp = db.Column(db.DateTime, index=True)

    # call this method to get the data in json format
    def get_json(self):

        # don't change order
        return {
            'info_json': self.__get_json(),
            'track_id': self.track_id,
            'track_name': self.track_name,
            'lyrics': self.lyrics,
            'background_info': self.background_info,
            'release_date': self.release_date,
            'genre': self.genre

        }

    def update_lyrics(self, lyrics):
        self.lyrics = lyrics

    def update_background_information(self, bg_info):
        self.background_info = bg_info

    def __get_json(self):
        if is_new(self.timestamp, timedelta(weeks=1)):
            return self.info_json

        # else update by calling api
        sp = get_spotify_object()
        new_info_json = sp.track(self.track_id)

        # update info json
        self.timestamp= datetime.utcnow()
        self.info_json = new_info_json
        self.track_name = new_info_json['name']
        self.release_date = new_info_json['name']
        self.genre = new_info_json['name']

        # since the caller is itself, do commit itself
        db.session.commit()

        print("---in db, updating track info...")

        return self.info_json


class Artist_Info(db.Model):
    __tablename__ = "artist_info"
    artist_id = db.Column(db.String(30), primary_key=True, nullable=False)
    artist_name = db.Column(db.String(30))
    # if not enough space, delete records according to last_active
    background_info = db.Column(db.Text)

    info_json = db.Column(JSON)
    timestamp = db.Column(db.DateTime, index=True)

    # call this method to get the data in json format

    def get_json(self):

        return {
            # don't change order
            'info_json': self.__get_json(),
            'artist_id': self.artist_id,
            'artist_name': self.artist_name,
            'background_info': self.background_info
        }

    def update(self, bg_info):
        self.background_info = bg_info

    def __get_json(self):
        if is_new(self.timestamp, timedelta(weeks=1)):
            return self.info_json

        # else update by calling api
        sp = get_spotify_object()
        new_info_json = sp.artist(self.artist_id)

        # update info_json in database
        self.timestamp = datetime.utcnow()
        self.info_json = new_info_json
        self.artist_name = new_info_json['name']

        # since the caller is itself, do commit itself
        db.session.commit()

        print("---in db, updating artist info...")

        return self.info_json


class Album_Info(db.Model):
    __tablename__ = "album_info"
    album_id = db.Column(db.String(30), primary_key=True, nullable=False)
    album_name = db.Column(db.String(30))
    # if not enough space, delete records according to last_active
    #last_active = db.Column(db.DateTime)
    background_info = db.Column(db.Text)

    info_json = db.Column(JSON)
    timestamp = db.Column(db.DateTime)

    # call this method to update in database

    def update(self, bg_info):
        self.background_info = bg_info

    # call this method to get the data in json format
    def get_json(self):
        return {
            # don't change order
            'info_json': self.__get_json(),
            'album_id': self.album_id,
            'album_name': self.album_name,
            'background_info': self.background_info
        }

    def __get_json(self):
        if is_new(self.timestamp, timedelta(weeks=1)):
            return self.info_json

        # else update by calling api
        sp = get_spotify_object()
        new_info_json = sp.album(self.album_id)

        self.timestamp= datetime.utcnow()
        self.info_json = new_info_json
        self.album_name = new_info_json['name']

        # since the caller is itself, do commit itself
        db.session.commit()

        print("---in db, updating album info...")

        return self.info_json


class Bug_Report(db.Model):
    __tablename__ = "bug_report"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    report = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, index=True)

    # refer back to author
    author_id = db.Column(db.String(30), db.ForeignKey('user.user_id'))
    author = db.relationship('User', back_populates='bug_reports')

    # FIXME: return as json may only return the text, form will keep formats
    def get_json(self):
        return {
            "report": self.report,
            "timestamp": self.timestamp,
            "author_id": self.author_id,
            "author_name": self.author.user_name
        }


# ips that go banned
class Banned_IP(db.Model):
    __tablename__ = "banned_ip"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    ip_addr = db.Column(db.String(20))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    time_length = db.Column(db.DateTime, default=timedelta(hours=1))
    reason = db.Column(db.Text)

#store table names for tables that doesn't have restriction on the # of rows
class No_Max(db.Model):
    __tablename__ = "no_max"
    id = db.Column(db.Integer, primary_key=True)
    tablename = db.Column(db.String(20))


class Flask_Statistics(db.Model):
    __tablename__ = "flask_statistics"

    index = db.Column(db.Integer, primary_key=True)
    #timestamp = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    timestamp = db.Column(db.DateTime, index=True)

    response_time = db.Column(db.Float)
    #date = db.Column(db.DateTime)
    method = db.Column(db.String)
    size = db.Column(db.Integer)
    status_code = db.Column(db.Integer)
    path = db.Column(db.String)
    user_agent = db.Column(db.String)
    remote_address = db.Column(db.String)
    exception = db.Column(db.String)
    referrer = db.Column(db.String)
    browser = db.Column(db.String)
    platform = db.Column(db.String)
    mimetype = db.Column(db.String)

    def get_json(self):
        return {
            "timestamp": self.timestamp,
            "response_time": round(self.response_time * 1000),
            "method": self.method,
            "size": self.size,
            "status_code": self.status_code,
            "path": self.path,
            "user_agent": self.user_agent,
            "remote_address": self.remote_address,
            "exception": self.exception,
            "referrer": self.referrer,
            "browser": self.browser,
            "platform": self.platform,
            "mimetype": self.mimetype
        }




#test on after_insert
def after_insert_listener(mapper, connection, target):
    #'target' is the inserted object
    print("-------database insert event...")

event.listen(Top_Tracks_Info, 'after_insert', after_insert_listener)
