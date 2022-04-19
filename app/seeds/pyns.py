from app.models import db, Pyn
from faker import Faker
from random import randint
fake = Faker()

def seed_pyns():
  for i in range(1, 101):
    pyns = Pyn(
      user_id=randint(1, 50),
      # board_id=randint(1, 150),
      title=fake.sentence(3),
      img_url='https://picsum.photos/500/600?random',
      description=fake.sentence(8)
    )
    db.session.add(pyns)
  db.session.commit()


def undo_pyns():
  db.session.execute('TRUNCATE pyns RESTART IDENTITY CASCADE;')
  db.session.commit()
