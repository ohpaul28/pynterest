from .db import db

class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  pyn_id = db.Column(db.Integer, db.ForeignKey('pyns.id'))
  content = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
  updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

  users = db.relationship('User', back_populates='comments')
  pyns = db.relationship('Pyn', back_populates='comments',)
