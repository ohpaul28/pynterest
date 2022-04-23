from app.models import db, Board
from faker import Faker
from random import randint
fake = Faker()

def seed_boards():
  for i in range(1, 101):
    boards = Board(
      user_id=randint(1,50),
      title=fake.sentence(3),
    )
    db.session.add(boards)
  db.session.commit()


def undo_boards():
  db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
  db.session.commit()
