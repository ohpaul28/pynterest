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
  # pyns = db.relationship('Pyn')


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'pyn_id': self.pyn_id,
      'content': self.content,
      'created_at': self.created_at,
      'user': self.users.to_comment_dict(),
    }

  def to_id(self):
    return {
      'id': self.id
    }
