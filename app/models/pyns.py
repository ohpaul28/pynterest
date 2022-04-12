from .db import db

class Pyn(db.Model):
  __tablename__ = 'pyns'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, nullable=False)
  board_id = db.Column(db.Integer, nullable=False)
  title = db.Column(db.String(30), nullable=False)
  img_url = db.Column(db.String(2048), nullable=False)


  user = db.relationship('User', back_populates='pyns')
  board = db.relationship('Board', back_populates='pyns', cascade='all, delete-orphan')


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'board_id': self.board_id,
      'title': self.title,
      'img_url': self.img_url
    }

  def home_to_dict(self):
    return {
      'id': self.id,
      'img_url': self.img_url
    }
