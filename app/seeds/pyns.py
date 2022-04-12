from app.models import db, Pyn
from faker import Faker
from random import randint
fake = Faker()

def seed_pyns():
  for i in range(1, 450):
    pyns = Pyn(
      user_id=randint(1, 50),
      board_id=randint(1, 150),
      title=fake.sentence(5),
      img_url=fake.image_url()
    )
    db.session.add(pyns)
  db.session.commit()


def undo_reviews():
  db.session.execute('TRUNCATE pyns RESTART IDENTITY CASCADE;')
  db.session.commit()
