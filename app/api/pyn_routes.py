from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Pyn, db
from app.awsS3 import upload_file_to_s3, allowed_file, get_unique_filename
from app.forms.pyn_form import PynForm


pyn_routes = Blueprint('pyns', __name__)


def error_generator(validation_errors):
  errors = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errors.append(f'{field} : {error}')
  return errors


# get all pyns
@pyn_routes.route('/')
def pyns():
  pyns = Pyn.query.all()
  return {
    'pyns': [pyn.home_to_dict() for pyn in pyns]
}


# get one pyn
@pyn_routes.route('/<int:id>')
def pyn(id):
  pyn = Pyn.query.get(id)
  return pyn.to_dict()


# post a pyn
@pyn_routes.route('/', methods=['POST'])
def upload_pyn():
  # print(request.form['id'])
  if 'image' not in request.files:
    return {'errors': 'image required'}, 400

  image = request.files['image']

  if not allowed_file(image.filename):
    return {'errors': 'file type not permitted'}, 400

  image.filename = get_unique_filename(image.filename)

  upload = upload_file_to_s3(image)

  if 'url' not in upload:
    return upload, 400

  url = upload['url']

  new_pyn = Pyn(
    user_id = request.form['user_id'],
    board_id = request.form['board_id'],
    title = request.form['title'],
    img_url = url
  )

  db.session.add(new_pyn)
  db.session.commit()
  return {'url': url}


# delete a pyn
@pyn_routes.route('/<int:id>', methods=['DELETE'])
def delete_pyn(id):
  pyn = Pyn.query.get(id)

  db.session.delete(pyn)
  db.session.commit()

  return {
    'deletedPyn': pyn.id
  }


# update a pyn
@pyn_routes.route('/<int:id>', methods=['PUT'])
def update_pyn(id):

  if 'image' not in request.files:
    return {'errors': 'image required'}, 400

  image = request.files['image']

  if not allowed_file(image.filename):
    return {'errors': 'file type not permitted'}, 400

  image.filename = get_unique_filename(image.filename)

  upload = upload_file_to_s3(image)

  if 'url' not in upload:
    return upload, 400

  url = upload['url']

  form = PynForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    pyn = Pyn.query.get(id)
    pyn.user_id = current_user.id
    pyn.board_id = request.json['user_id']
    pyn.title = request.json['title']
    pyn.img_url = url

    db.session.commit()

    return pyn.to_dict()

  return {'errors': error_generator(form.errors)}
