from flask import Flask, session, g, request
from flask_login import current_user
import click
import time
import os
from datetime import datetime
from server.api.blueprints.main import main_bp
from server.api.blueprints.admin import admin_bp
from server.api.blueprints.user import user_bp
from server.api.blueprints.auth import auth_bp
#from server.api.extensions import limiter, db, login_manager, bootstrap, moment, csrf, ckeditor
from server.api.extensions import limiter, db, login_manager, bootstrap, moment, ckeditor
from server.api.settings import website_config
from server.api.utils import get_all_models, timestamp_to_str
from server.api.constants import NO_MAX_TABLES
from server.api.models import Flask_Statistics, User

#import the file, so the bg_scheduler.start() will run automatically
import server.api.schedules

#--facotor method that returns the app object
def create_app(config_name='production'):
    print("------config name: ", config_name)


    #point static folder to the build folder, so the root path point to the index html
    app = Flask('api', static_folder='build', static_url_path='/', template_folder='server/api/templates/admin')

    #load configurations
    app.config.from_object(website_config[config_name])


    #register all kinds of mudules
    register_blueprints(app)
    register_extensions(app)
    register_error_handler(app)
    register_command(app)
    register_flask_stats(app)


    return app


#--module that monitors the website access histories
def register_flask_stats(app):
    @app.before_request
    def my_before():
        g.start_time = time.time()
        g.request_date = datetime.utcnow()

        #in case it doesn't reach after request
        g.request_status_code = 500


    @app.after_request
    def my_after(my_response):
        g.request_status_code = my_response.status_code
        g.request_content_size = my_response.content_length
        g.mimetype = my_response.mimetype

        return my_response

    @app.teardown_request
    def my_teardown(my_response):

        #one json history record per day
        db_history = Flask_Statistics.query.filter(Flask_Statistics.timestamp_date == datetime.utcnow().date()).first()

        if not db_history:
            db_history = Flask_Statistics()
            db.session.add(db_history)
            db.session.commit()

        end_time = time.time()

        db_new_json = {}


        #in case it doesn't go over the whole befre-after-teardown steps
        try:
            db_new_json['response_time'] = int(round(end_time - g.start_time, 3) * 1000)
        except:
            db_new_json['response_time'] = 0

        db_new_json['status_code'] = g.request_status_code
        db_new_json['size'] = g.request_content_size
        db_new_json['method'] = request.method
        #FIXME: not sure about his
        db_new_json['remote_address'] = request.environ.get("HTTP_X_REAL_IP", request.remote_addr)
        db_new_json['path'] = request.path
        db_new_json['referrer'] = request.referrer

        db_new_json['browser'] = "{browser} {version}".format(
            browser=request.user_agent.browser,
            version=request.user_agent.version)
        # platform (e.g. windows)
        db_new_json['platform'] = request.user_agent.platform
        # complete user agent string
        db_new_json['user_agent'] = request.user_agent.string
        # date when request was send
        #db_new_json['timestamp'] = g.request_date
        db_new_json['timestamp'] = timestamp_to_str(datetime.now())
        # mimetype (e.g. text/html) of the response send to the client
        db_new_json['mimetype'] = g.mimetype
        try:
            db_new_json['user_name'] = current_user.user_name
            db_new_json['user_id'] = current_user.user_id
        except Exception as e:
            db_new_json['user_name'] = "N/A"
            db_new_json['user_id'] = -1

        db_history = Flask_Statistics.query.filter(Flask_Statistics.timestamp_date == datetime.utcnow().date()).first()


        #with commit in models.py
        db_history.update_json_c(db_new_json)




#--error handlers, different actions correspond to different error code
def register_error_handler(app):
    # FIXME: change this to the actual file path of the html status file path in front end

    # return this error code if user exceed the rate limit
    @app.errorhandler(429)
    def rate_limit_reached(e):
        #FIXME: can add violation count here..
        return "your rate limited reached.. 429 ... Change me in api.__init__ file", 429

    # no permission error
    @app.errorhandler(403)
    def permission_denied(e):
        #FIXME: can add violation count here..
        return "You don't have the permission.. 403", 403

    #when path not in backend, check frontend
    #FIXME: frontend need to take care of 404 error if it does not have the page either
    @app.errorhandler(404)
    def route_to_frontend(e):
        return app.send_static_file('index.html')

#--modules that have all the routes backend provides
def register_blueprints(app):
    app.register_blueprint(main_bp)
    app.register_blueprint(admin_bp, prefix='/admin')
    app.register_blueprint(auth_bp, prefix='/auth')
    app.register_blueprint(user_bp, prefix='/user')


#--modules that have all kinds of flask extensions
def register_extensions(app):
    limiter.init_app(app)
    db.init_app(app)
    login_manager.init_app(app)
    bootstrap.init_app(app)
    moment.init_app(app)
    #csrf.init_app(app)
    ckeditor.init_app(app)




#--command module, have all kinds of flask commands
def register_command(app):

    #command to initialize database, use with care...
    @app.cli.command()
    @click.option("--drop", is_flag=True, help="drop the tables")
    def init_db(drop):
        """Initialize the database (after changes in table structures)

        :param drop: Drop all the tables before initializing ___
        :return:
        """
        if drop:
            click.confirm("this will drop all the tables, are you sure? ", abort=True)
            db.drop_all()
            print("---dropped all tables...")

        #recreate all the tables (empty)
        db.create_all()
        print("--created all tables...")

        #put certain tables in the list of no max limit, where rows are not limited
        from server.api.models import No_Max
        all_models = get_all_models()
        for one_model in all_models:
            cur_tablename = one_model.__tablename__
            if cur_tablename in NO_MAX_TABLES:
                db_new_row = No_Max(tablename=cur_tablename)
                db.session.add(db_new_row)
                print("---added no max table name: ", cur_tablename)

        db.session.commit()

        print("--inserted default rows...")
        print("---Done Init Database---")

    @app.cli.command()
    def no_row_max_tables():
        """Display a list of tables that have not limit on rows __
        """
        from server.api.models import No_Max
        results = No_Max.query.all()
        print("---all tables that has no max rows limit: ")
        for one_table in results:
            print("--tablename: ", one_table.tablename)


    @app.cli.command()
    @click.argument("email")
    def add_admin(email):
        """Add a use as admin, given the email of an existing user __

        :param email: the email of the user you want to add as an admin
        """
        db_user = User.query.filter(User.user_email==email).first()
        if not(db_user):
            print("--No user found with email: ", email)
            return
        #else
        db_user.is_admin = True
        db.session.commit()
        print("--Upgrade user with email: ", email, " to amdin!!")

    @app.cli.command()
    @click.argument("email")
    def remove_admin(email):
        """Remove A User If The User Is An Admin __

        :param email: the email of the admin you want to remove
        """
        db_user = User.query.filter(User.user_email==email).first()
        if not(db_user):
            print("--No user found with email: ", email)
            return
        if not db_user.is_admin:
            print("--User is not admin!! ", email)
            return

        #else
        db_user.is_admin = False
        db.session.commit()
        print("--removed admin!! ", email)

    @app.cli.command()
    def all_admins():
        """Display all admins in the database __
        """
        db_users = User.query.filter(User.is_admin==True).all()
        print("---Admins---")
        for one_user in db_users:
            print("-User Name: ", one_user.user_name, ", User Email: ", one_user.user_email)
        print("###END###")

    @app.cli.command()
    def all_users():
        """Display all users in the database __
        """
        db_users = User.query.all()
        print("---Users---")
        for one_user in db_users:
            print("-User Name: ", one_user.user_name, ", User Email: ", one_user.user_email)
        print("###END###")


    #help messages for different commands




if __name__ == "__main__":
    app = create_app()
    #PORT is given by heroku, not necessary 5000
    port = int(os.getenv('PORT'), 5000)
    app.run(host='0.0.0.0', port=port)
