from flask import Blueprint

#routes for admin related works

admin_bp = Blueprint('admin', __name__)

@admin_bp.route("/admin")
def admin():
    return "this is admin page..."