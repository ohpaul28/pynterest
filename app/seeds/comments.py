from app.models import db, Comment
from faker import Faker
from random import randint
fake = Faker()

def seed_comments():
  for i in range(1, 90):
    comments = Comment(
      user_id=randint(1, 50),
      pyn_id=randint(1, 10),
      content=fake.text()
    )
    db.session.add(comments)
  db.session.commit()

def undo_comments():
  db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
  db.session.commit()
