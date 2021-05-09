from flask import Blueprint, render_template, flash, redirect, url_for, jsonify
from flask_login import login_required, current_user
from server.api.decorators import permission_required, is_admin
from server.api.extensions import limiter, db
from server.api.models import *
from server.api.forms.admin import Ban_Reason_Form
from server.api.utils import get_all_models
from server.api.constants import NO_MAX_TABLES, MAX_ROWS
import random
import pygal
from pygal.style import DarkSolarizedStyle, LightSolarizedStyle

#--file: this file has routes for admin related apis

admin_bp = Blueprint('admin', __name__)




#--api: home of admin page
@admin_bp.route("/admin")
@admin_bp.route("/admin/")
@login_required
@is_admin
def home():

    title = "Website Histories"

    histories = get_website_histories()

    x_axis = []
    y_axis  = []

    count = {}
    total_cnt = 0

    #get the count for each api access history
    for one_history in histories:
        path = one_history['path']
        try:
            count[path] += 1
        except:
            count[path] = 1

        total_cnt += 1

    for one_path in count:
        x_axis.append(one_path)
        y_axis.append(count[one_path])

    #bar chart for website histories
    histories_bar_chart = pygal.Bar(width=1200, height=600,
                                    explicit_size=True, title=title,
                                    #style=DarkSolarizedStyle,
                                    style=LightSolarizedStyle,
                                    disable_xml_declaration=True)
    histories_bar_chart.x_labels=x_axis
    histories_bar_chart.add("visit count", y_axis)

    #pie chart for website histories
    histories_pie_chart = pygal.Pie(width=1200, height=600,
                                    explicit_size=True, title=title,
                                    #style=DarkSolarizedStyle,
                                    style=LightSolarizedStyle,
                                    disable_xml_declaration=True,
                                    inner_radius=0.25)

    for one_path in count:
        histories_pie_chart.add(one_path, count[one_path])




    return render_template("base.html", histories_bar_chart=histories_bar_chart,
                            histories_pie_chart=histories_pie_chart
                           )


#--api: manage website page
@admin_bp.route("/admin/manage_website")
@limiter.limit("2 per second")
@login_required
@is_admin
def manage_website():
    return render_template("manage_website.html",
                           database_status=_database_status()
                           )



#--helper: function to get the website histories in terms of a list of access histories
@login_required
@is_admin
def get_website_histories():
    result = []
    all_histories = Flask_Statistics.query.order_by(Flask_Statistics.timestamp_date.desc()).limit(7).all()
    all_histories = all_histories[::-1]

    for one_history in all_histories:
        histories = one_history.get_json()
        for one_api_call_idx in histories:
            result.append(histories[one_api_call_idx])

    #reverse, so the most recent is on the left
    return result[::-1]


#--api: return a html piece (a table in this case) shows the website api call histories
@admin_bp.route("/admin/all_website_histories")
@limiter.limit("2 per second")
@login_required
@is_admin
def all_website_histories():
    return render_template("_website_histories_details.html", website_histories=get_website_histories())


#--api: return a html piece (a table) shows the database status
@admin_bp.route("/admin/database_status")
@login_required
@is_admin
def database_status():
    return render_template('_database_status.html', database_status=_database_status())

#--helper: function to get database status
@login_required
@is_admin
def _database_status():
    #{'count':num, 'total_rows':num,tables:{'one_table':row_num} }
    status = {}

    all_table_names = db.engine.table_names()
    status['count'] = len(all_table_names)

    total_rows = 0
    #{'tablename':{'count': N, 'limit': N}, 'tablename':{}}
    tables_details = {}

    #get all the models (tables) in the database
    all_models = get_all_models()

    for one_model in all_models:
        #will include a class with no tablename, so need to use try
        try:
            model_name = one_model.__tablename__
            model_row_cnt = one_model.query.count()
            total_rows += model_row_cnt
            model_row_limit = -1
            if model_name not in NO_MAX_TABLES:
                model_row_limit = MAX_ROWS

            #tables_details[model_name] = model_row_cnt
            tables_details[model_name] = {'count': model_row_cnt, 'limit': model_row_limit}
        except Exception as e:
            print("======table status exception: ", e)
            pass


    status['total_rows'] = total_rows
    status['tables_details'] = tables_details

    return status


#--api: manage users page
@admin_bp.route("/admin/manage_users")
@limiter.limit("2 per second")
@login_required
@is_admin
def manage_users():
    return render_template("manage_users.html",
                           top_active_users=top_active_users(100),
                           banned_users=banned_users(100)
                           )



#--helper: function to get top active users
@login_required
@is_admin
def top_active_users(count=100):
    #{'user_id':{'user_name':name, 'user_email':email, 'last_active':time, 'last_ip':ip} }
    status = {}

    db_users = User.query.filter(User.banned == False).order_by(User.timestamp.desc()).limit(count).all()

    for one_user in db_users:
        temp_dict = {}
        temp_dict['user_name'] = one_user.user_name
        temp_dict['user_email'] = one_user.user_email
        temp_dict['last_ip'] = one_user.ip_addr
        temp_dict['last_active'] = one_user.timestamp

        status[one_user.user_id] = temp_dict

    return status

#--helper function:  to get the list of banned user
@login_required
@is_admin
def banned_users(count=100):
    status = {}

    db_users = User.query.filter(User.banned == True).order_by(User.timestamp.desc()).limit(count).all()
    for one_user in db_users:
        temp_dict = {}
        temp_dict['user_name'] = one_user.user_name
        temp_dict['user_email'] = one_user.user_email
        temp_dict['last_ip'] = one_user.ip_addr
        temp_dict['banned_timestamp'] = one_user.banned_timestamp
        temp_dict['reason'] = one_user.banned_reason

        status[one_user.user_id] = temp_dict

    return status


#--api: to ban user given the user id
#----get returns the ckeditor to input reasons,
#----post gives the backend the input in the input ckeditor
@admin_bp.route("/admin/manage_users/ban/<user_id>", methods=['GET','POST'])
@limiter.limit("1 per second")
@login_required
@is_admin
def ban_user(user_id):
    form = Ban_Reason_Form()

    #post, and pass validation
    if form.validate_on_submit():
        if current_user.user_id == user_id:
            flash("You can not ban yourself...")
            return redirect(url_for('admin.manage_users'))

        db_user = User.query.filter(User.user_id == user_id).first()
        if not db_user:
            flash("User not found...")
            return redirect(url_for('admin.manage_users')), 404

        db_user.banned = True
        db_user.banned_reason=form.reason.data
        db_user.banned_timestamp = datetime.utcnow()
        db.session.commit()
        flash("Banned user...")
        return redirect(url_for('admin.manage_users'))

    #else, return the form to fill out
    return render_template('ban_user.html', form=form)



#--api: unban user given the user id
@admin_bp.route("/admin/manage_users/unban/<user_id>")
@limiter.limit("1 per second")
@login_required
@is_admin
def unban_user(user_id):
    db_user = User.query.filter(User.user_id == user_id).first()
    if not db_user:
        flash("User not exist...")

    else:
        db_user.banned = False
        db.session.commit()
        flash("Unbanned user...")


    return redirect(url_for('admin.manage_users'))




