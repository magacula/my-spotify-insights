from flask_wtf import FlaskForm
from wtforms import SubmitField, TextField
from wtforms.validators import DataRequired, Length
from flask_ckeditor import CKEditorField

class Ban_Reason_Form(FlaskForm):
    reason = CKEditorField('reason', validators=[DataRequired(), Length(5, 300)])
    submit = SubmitField('Ban User')