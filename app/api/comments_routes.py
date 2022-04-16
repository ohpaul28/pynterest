from flask import Blueprint, request
from flask_login import current_user
from app.models import Comment, db


comment_routes= Blueprint('comments', __name__)


@comment_routes.route('/<int:pynId>')
def comments(pynId):
  comments = Comment.query.filter(Comment.pyn_id == pynId)
  return [c.to_dict() for c in comments]


@comment_routes.route('/', methods=['POST'])
def create_comment():
  new_comment = Comment(
    user_id = current_user.id,
    pyn_id = request.json['pyn_id'],
    content = request.json['content']
  )

  db.session.add(new_comment)
  db.session.commit()
  return new_comment.to_dict()


@comment_routes.route('/<int:id>', methods=['PUT'])
def update_comment(id):
  comment = Comment.query.get(id)
  comment.content = request.json['content']
  db.session.commit()
  return comment.to_dict()


@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
  comment = Comment.query.get(id)
  db.session.delete(comment)
  db.session.commit()
  return comment.to_id()
