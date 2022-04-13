from .db import db

class Board(db.Model):
  __tablename__ = 'boards'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  title = db.Column(db.String(50), nullable=False)
  created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
  updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

  users = db.relationship('User', back_populates='boards')
  pyns = db.relationship('Pyn', back_populates='boards')


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'title': self.title,
    }
