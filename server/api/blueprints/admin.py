from flask import Blueprint
from server.api.decorators import permission_required, login_required
from server.api.extensions import limiter
#routes for admin related works

admin_bp = Blueprint('admin', __name__)

@admin_bp.route("/admin")
@limiter.limit("2 per second")
@login_required
def admin():
    #FIXME: need the acutal url
    return "this is admin page..."


#FIXME: test if permission decorator works
@admin_bp.route(("/admin/test"))
@permission_required("no")
def admin_test():
    return "this is admin test..."