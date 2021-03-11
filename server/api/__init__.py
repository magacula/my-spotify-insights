from flask import Flask, session
from flask_login import current_user
import click
from server.api.blueprints.main import main_bp
from server.api.blueprints.admin import admin_bp
from server.api.blueprints.user import user_bp
from server.api.blueprints.auth import auth_bp
from server.api.extensions import limiter, db, login_manager, bootstrap
from server.api.settings import website_config
from server.api.utils import get_all_models
from server.api.constants import NO_MAX_TABLES

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

    #start background schedules
    #bg_scheduler.start()



    return app



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


def register_command(app):
    #in cmd, run:  flask test
    @app.cli.command()
    def test():
        click.echo("this is testing command")

    #command to initialize database, use will care...
    @app.cli.command()
    @click.option("--drop", is_flag=True, help="drop the tables")
    def init_db(drop):
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
        from server.api.models import No_Max
        results = No_Max.query.all()
        print("---all tables that has no max rows limit: ")
        for one_table in results:
            print("--tablename: ", one_table.tablename)





if __name__ == "__main__":
    app = create_app()
    #PORT is given by heroku, not necessary 5000
    port = int(os.getenv('PORT'), 5000)
    app.run(host='0.0.0.0', port=port)
