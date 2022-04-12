from .db import db

class Board(db.Model):
  __tablename__ = 'boards'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, nullable=False)
  title = db.Column(db.String(30), nullable=False)

  user = db.relationship('User', back_populates='boards')
  pyn = db.relationship('Pyn', back_populates='boards', cascade='all, delete-orphan')


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'title': self.title,
    }
