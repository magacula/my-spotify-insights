from apscheduler.schedulers.background import BackgroundScheduler
from flask import current_app
from server.api.extensions import db
from server.api.utils import get_all_models
from server.api.constants import MAX_ROWS
from server.api.models import No_Max
import os
import flask




def test_job():
    print("----------this is background job")



def watch_database():
    #----------------------
    #need app to work with database
    from server.api import create_app
    my_app = create_app(os.getenv('PROJECT_MODE', "production"))
    my_app.app_context().push()
    #----------------------

    total_rows = 0

    #get all the models (tables) in the database
    all_models = get_all_models()

    #get the table names of all tables that can have unlimited rows
    no_limit_tables_raw = No_Max.query.all()
    no_limit_tables = []
    for one_no_limit in no_limit_tables_raw:
        no_limit_tables.append(one_no_limit.tablename)

    for one_model in all_models:
        #will include a class with no tablename, so need to use try
        try:
            model_name = one_model.__tablename__
            model_row_cnt = one_model.query.count()
            #if the talbe is part of unlimited table and skip
            if model_name in no_limit_tables:
                continue

            if model_row_cnt < MAX_ROWS:
                continue

            #else, if row count exceed, do clean up, remove exceed amt + 1/4 of the MAX allowed
            remove_amt = (model_row_cnt - MAX_ROWS) + (MAX_ROWS//4)
            print("-----REACH ROW LIMIT :: try to remove from ", model_name, " : ",remove_amt)

            rows_to_delete = one_model.query.order_by(one_model.timestamp).limit(remove_amt)

            for one_row in rows_to_delete:
                db.session.delete(one_row)

            db.session.commit()
            print("----REACH ROW LIMIT ::a remove success from: ", model_name)

        except Exception as e:
            print("---failed try: ", e)






















bg_scheduler = BackgroundScheduler()

#example
#bg_scheduler.add_job(test_job, 'interval', minutes=1)

#watch database
bg_scheduler.add_job(watch_database, 'interval', minutes=3)

#put it here, so when imported by __init__, it will run automatically
bg_scheduler.start()
