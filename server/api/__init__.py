from flask import Flask, session
from flask_login import current_user
import click
from server.api.blueprints.main import main_bp
from server.api.blueprints.admin import admin_bp
from server.api.blueprints.user import user_bp
from server.api.blueprints.auth import auth_bp
from server.api.extensions import limiter, db, login_manager, bootstrap
from server.api.settings import website_config

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

    #FIXME: I don't want to take care of all requests (static files) right now,
    #functions that will be called before any other request
    #register_before_request(app)

    #functions called after request, for status report
    #FIXME: a bit different from before request, will work on this later
    #register_after_request(app)

    return app

def register_before_request(app):
    #FIXME: add: check baned_ips list before proceed

    @app.before_request
    def user_is_active():
        #if no user is loaded, it will be the anonymous user, is_active = is_authenticated = False
        #is_anonymouse = True, get_id() returns None
        if current_user.is_active:
            pass
            #print("user: ", current_user)

    @app.before_request
    def connections_count():
        from flask_limiter.util import get_remote_address
        print("----remote address: ", get_remote_address())
        pass


def register_after_request(app):
    @app.after_request
    def connections_count():
        #update connection count
        pass


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
            print("---dropped all tables")

        #recreate all the tables (empty)
        db.create_all()
        print("--created all tables")



if __name__ == "__main__":
    app = create_app()
    #PORT is given by heroku, not necessary 5000
    port = int(os.getenv('PORT'), 5000)
    app.run(host='0.0.0.0', port=port)
