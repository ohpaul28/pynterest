from .db import db

pyn_board = db.Table(
  'pyn_board',
  db.Column('pyn_id', db.ForeignKey('pyns.id'), primary_key=True),
  db.Column('board_id', db.ForeignKey('boards.id'), primary_key=True)
)

class Board(db.Model):
  __tablename__ = 'boards'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  title = db.Column(db.String(50), nullable=False)
  created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
  updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

  users = db.relationship('User', back_populates='boards')
  pyns = db.relationship('Pyn', secondary=pyn_board, back_populates='boards')


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'title': self.title,
    }

  def to_dict_full(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'title': self.title,
      'pyns': self.pyns,
      'pynslength': len(self.pyns),
      'created_at': self.created_at
    }
