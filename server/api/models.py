import sqlalchemy_jsonfield as db_json_field

#---- This file store model/definitions for database tables
from server.api.extensions import db
from datetime import datetime

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
    update_date = db.Column(db.DateTime, nullable=False)

