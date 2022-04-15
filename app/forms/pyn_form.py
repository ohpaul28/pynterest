from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Pyn


def image_entered(form, field):
  content = form.data['img_url']
  # print('\n\nCONTENT ---',content, '\n\n')
  if not content:
    raise ValidationError('Please enter an image URL.')

class PynForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  img_url = StringField('Image URL', validators=[image_entered, Length(min=0, max=2048)])
