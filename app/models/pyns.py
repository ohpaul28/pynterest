from .db import db

class Pyn(db.Model):
  __tablename__ = 'pyns'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  board_id = db.Column(db.Integer, db.ForeignKey('boards.id'))
  title = db.Column(db.String(50), nullable=False)
  img_url = db.Column(db.String(2048), nullable=False)
  created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
  updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.current_timestamp())


  users = db.relationship('User', back_populates='pyns')
  boards = db.relationship('Board', back_populates='pyns')
  comments = db.relationship('Comment', back_populates='pyns', cascade='all, delete-orphan')


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'board_id': self.board_id,
      'title': self.title,
      'img_url': self.img_url,
      'comments': {comment.id:comment.to_dict() for comment in self.comments}
    }

  def home_to_dict(self):
    return {
      'id': self.id,
      'img_url': self.img_url,
      'comments': len(self.comments)
    }

  