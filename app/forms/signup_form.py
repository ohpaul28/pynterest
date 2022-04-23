from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, EqualTo, Email
from app.models import User


def email_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use!')


class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(message="Don't forget to tell us who you are!")])
    last_name = StringField('Last Name', validators=[DataRequired(message="Don't forget to tell us your last name!")])
    email = StringField('Email', validators=[DataRequired(message="Don't forget to tell us your email!"), email_exists, Email()])
    password = StringField('Password', validators=[DataRequired(message="Don't forget to set a password!"), EqualTo('confirm_password', message='Make sure your passwords match!')])
    confirm_password = StringField('Confirm Password', validators=[DataRequired(message="Make sure your passwords match!")])
