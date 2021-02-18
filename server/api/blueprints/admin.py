from flask import Blueprint
from server.api.decorators import permission_required, login_required
from server.api.extensions import limiter
#from server.api.utils import connect_to_database, init_db
#routes for admin related works

admin_bp = Blueprint('admin', __name__)

@admin_bp.route("/admin")
@limiter.limit("2 per second")
@login_required
def admin():
    #FIXME: need the acutal url
    return "this is admin page..."


#FIXME: test if permission decorator works
@admin_bp.route("/admin/test")
@permission_required("no")
def admin_test():
    return "this is admin test..."



"""
@admin_bp.route("/admin/testdatabase")
def admin_test_db():
    db = None
    try:
        db = connect_to_database()
        db_cursor = db.cursor()
        print("-----------database here...")

        #db_cursor.execute("SELECT version()")
        db_cursor.execute("\dt")

        db_version = db_cursor.fetchall()
        print("---version: ", db_version)

        #close cursor
        db_cursor.close()

    except Exception as e:
        print("something is wrong...",e)
    finally:
        #close database connection
        db.close()

    return "test database connection..."

#FIXME: add more permission restrictions later
@admin_bp.route("/admin/init_db")
def init_my_db():
    init_db()
    return "init database..."


@admin_bp.route("/admin/show_table_user")
def show_table_user():

    db = None
    db_result = "DEFAULT"
    try:
        db = connect_to_database()
        db_cursor = db.cursor()
        print("-----------database here...")

        #drop the database if exist


        sql_command = "SELECT * FROM public.user"
        db_cursor.execute(sql_command)

        db_result = db_cursor.fetchall()

        #print("db result: ", db_result)

        #db.commit()



        # close cursor
        db_cursor.close()

    except Exception as e:
        print("something is wrong...", e)
    finally:
        # close database connection
        db.close()

    return db_result

"""