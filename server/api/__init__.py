from flask import Flask, session, g, request
from flask_login import current_user
import click
import time
from datetime import datetime
from server.api.blueprints.main import main_bp
from server.api.blueprints.admin import admin_bp
from server.api.blueprints.user import user_bp
from server.api.blueprints.auth import auth_bp
from server.api.extensions import limiter, db, login_manager, bootstrap, moment
from server.api.settings import website_config
from server.api.utils import get_all_models
from server.api.constants import NO_MAX_TABLES
from server.api.models import Flask_Statistics, User
#import the file, so the bg_scheduler.start() will run automatically
import server.api.schedules


import os


def create_app(config_name='production'):
    print("------config name: ", config_name)


    #point static folder to the build folder
    #app = Flask('api', static_folder='build', static_url_path='/', template_folder='server/api/templates')
    app = Flask('api', static_folder='build', static_url_path='/', template_folder='server/api/templates/admin')

    #load configurations
    app.config.from_object(website_config[config_name])



    # FIXME: for now, more to add later

    register_blueprints(app)
    register_extensions(app)
    register_error_handler(app)
    register_command(app)

    register_flask_stats(app)




    return app


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
        db_new_record = Flask_Statistics()

        end_time = time.time()

        request_stats_json = {}

        """
        request_stats_json['response_time'] = end_time - g.start_time
        request_stats_json['status_code'] = g.request_status_code
        request_stats_json['size'] = g.request_content_size
        request_stats_json['method'] = request.method
        #FIXME: not sure about his
        request_stats_json['remote_address'] = request.environ.get("HTTP_X_REAL_IP", request.remote_addr)
        request_stats_json['path'] = request.path
        request_stats_json['referrer'] = request.referrer

        request_stats_json["browser"] = "{browser} {version}".format(
            browser=request.user_agent.browser,
            version=request.user_agent.version)
        # platform (e.g. windows)
        request_stats_json["platform"] = request.user_agent.platform
        # complete user agent string
        request_stats_json["user_agent"] = request.user_agent.string
        # date when request was send
        request_stats_json["date"] = g.request_date
        # mimetype (e.g. text/html) of the response send to the client
        request_stats_json["mimetype"] = g.mimetype
        """

        db_new_record.response_time = end_time - g.start_time
        db_new_record.status_code = g.request_status_code
        db_new_record.size = g.request_content_size
        db_new_record.method = request.method
        #FIXME: not sure about his
        db_new_record.remote_address = request.environ.get("HTTP_X_REAL_IP", request.remote_addr)
        db_new_record.path = request.path
        db_new_record.referrer = request.referrer

        db_new_record.browser = "{browser} {version}".format(
            browser=request.user_agent.browser,
            version=request.user_agent.version)
        # platform (e.g. windows)
        db_new_record.platform = request.user_agent.platform
        # complete user agent string
        db_new_record.user_agent = request.user_agent.string
        # date when request was send
        db_new_record.timestamp = g.request_date
        # mimetype (e.g. text/html) of the response send to the client
        db_new_record.mimetype = g.mimetype

        db.session.add(db_new_record)
        db.session.commit()

        print("----new history ")






def register_error_handler(app):
    # FIXME: change this to the actual file path of the html status file path in front end

    # return this error code if user exceed the rate limit
    @app.errorhandler(429)
    def rate_limit_reached(e):
        return "your rate limited reached.. 429 ... Change me in api.__init__ file"

    # no permission error

    @app.errorhandler(403)
    def permission_denied(e):
        return "You don't have the permission.. 403"

    #when path not in backend, check frontend
    #FIXME: frontend need to take care of 404 error if it does not have the page either
    @app.errorhandler(404)
    def route_to_frontend(e):
        return app.send_static_file('index.html')

def register_blueprints(app):
    app.register_blueprint(main_bp)
    app.register_blueprint(admin_bp, prefix='/admin')
    app.register_blueprint(auth_bp, prefix='/auth')
    app.register_blueprint(user_bp, prefix='/user')


def register_extensions(app):
    limiter.init_app(app)
    db.init_app(app)
    login_manager.init_app(app)
    bootstrap.init_app(app)
    moment.init_app(app)




def register_command(app):

    #command to initialize database, use will care...
    @app.cli.command()
    @click.option("--drop", is_flag=True, help="drop the tables")
    def init_db(drop):
        """Initialize the database (after changes in table structures)

        :param drop: Drop all the tables before initializing ___
        :return:
        """
        if drop:
            click.confirm("this will drop all the tables, are you sure? ", abort=True)
            #do not delete, if drop_all() failed, uncomment one of them to see if it works
            #db.reflect()
            #db.session.commit()
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

    #FIXME: remove later, seems useless
    @app.cli.command()
    def show_stats():
        from server.api.models import Flask_Statistics
        results = Flask_Statistics.query.all()
        print("---stats: ")
        for one_stat in results:
            print("--")
            print("path: ", one_stat.path)
            print("method: ", one_stat.method)
            print("date: ", one_stat.timestamp)
            print("#####")

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
        if db_user.is_admin:
            print("--User is not admin!! ", email)
            return

        #else
        db_user.is_admin = False
        db.session.commit()
        print("--Upgrade user to amdin!! ", email)

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
