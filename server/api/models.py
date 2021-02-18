import sqlalchemy_jsonfield as db_json_field
from server.api.utils import get_spotify_object

#---- This file store model/definitions for database tables
from server.api.extensions import db
from datetime import datetime
from datetime import timedelta

class User(db.Model):
    user_id = db.Column(db.String(25), primary_key=True, nullable=False)
    user_name = db.Column(db.String(20))
    user_email = db.Column(db.String(20))
    join_date = db.Column(db.DateTime, default=datetime.utcnow)

#store user profile info json file
class User_Info(db.Model):
    user_id = db.Column(db.String(25), primary_key=True, nullable=False)
    info_json = db.Column(db_json_field.JSONField(enforce_string=True,
                                                  enforce_unicode=False
                                                  )
                          )
    update_datetime = db.Column(db.DateTime, nullable=False)

    #valid for 1 hour
    def is_new(self):
        if not self.update_datetime:
            return False

        current_time = datetime.utcnow()
        diff = current_time - self.update_datetime

        if diff > timedelta(hours=1):
            return False

        return True

    def update(self, user_info_json):
        print("---in db, updating user profile...")
        self.info_json = user_info_json
        self.update_datetime = datetime.utcnow()

    def get_json(self):
        if self.is_new():
            return self.info_json

        #else update by calling api
        sp = get_spotify_object()
        self.update(sp.current_user())

        return self.info_json


