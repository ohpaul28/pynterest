from .db import db

class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, nullable=False)
  pyn_id = db.Column(db.Integer, nullable=False)
  content = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, default=db.func.now()) # FORMAT: 2022-04-02 13:27:25.457314
  updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

  user = db.relationship('User', back_populates='comments')
  pyn = db.relationship('Pyn', back_populates='comments')
