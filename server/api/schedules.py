from apscheduler.schedulers.background import BackgroundScheduler
from flask import current_app
from server.api.extensions import db
from server.api.constants import MAX_USER_ROWS, MAX_ROWS
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


    #{'count':num, 'total_rows':num,tables:{'one_table':row_num} }
    status = {}

    all_table_names = db.engine.table_names()
    status['count'] = len(all_table_names)

    total_rows = 0
    tables_details = {}


    #get all the models (tables) in the database
    #https://stackoverflow.com/questions/26514823/get-all-models-from-flask-sqlalchemy-db
    all_models = []
    for clazz in db.Model._decl_class_registry.values():
        try:
            all_models.append(clazz)
        except:
            pass


    for one_model in all_models:
        #will include a class with no tablename, so need to use try
        try:
            model_name = one_model.__tablename__
            model_row_cnt = one_model.query.count()

            total_rows += model_row_cnt
            tables_details[model_name] = model_row_cnt
        except:
            pass




    status['total_rows'] = total_rows
    status['tables_details'] = tables_details

    print("---db status: ", status)

















bg_scheduler = BackgroundScheduler()

bg_scheduler.add_job(test_job, 'interval', minutes=1)

#watch database
bg_scheduler.add_job(watch_database, 'interval', minutes=1)

#put it here, so when imported by __init__, it will run automatically
bg_scheduler.start()
