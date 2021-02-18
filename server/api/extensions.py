#import mysql.connector
import os
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy

#extensions for the backend part
#postgresql in heroku has restrctions on the numbers or rows, so if we have more than 10000 rows, use sqlalchemy
db =SQLAlchemy()


#limiter used to limiter the visit rate according to remote address
limiter = Limiter(key_func=get_remote_address, default_limits=["5 per second"])
