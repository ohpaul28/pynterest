from .db import db
from .boards import pyn_board

class Pyn(db.Model):
  __tablename__ = 'pyns'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  title = db.Column(db.String(50), nullable=False)
  img_url = db.Column(db.String(2048), nullable=False)
  description = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
  updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.current_timestamp())


  users = db.relationship('User', back_populates='pyns')
  boards = db.relationship('Board', secondary=pyn_board, back_populates='pyns')
  comments = db.relationship('Comment', backref='pyns', cascade='all, delete-orphan')


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'title': self.title,
      'img_url': self.img_url,
      'description': self.description,
      'boards': [b.to_id() for b in self.boards],
      'comments': {c.id:c.to_dict() for c in self.comments}
    }

  def home_to_dict(self):
    return {
      'id': self.id,
      'img_url': self.img_url,
    }

  def backend_to_dict(self):
    return {
      'id': self.id,
      'boards': [b.to_dict_full() for b in self.boards],
    }

  def to_id(self):
    return {
    'id': self.id,
    'img_url': self.img_url,
    'title': self.title,
    'comments': {c.id:c.to_dict() for c in self.comments},
    'user_id': self.user_id,
    'description': self.description
    }
