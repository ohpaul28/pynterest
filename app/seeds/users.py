from app.models import db, User
from werkzeug.security import generate_password_hash
from faker import Faker
fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
      first_name='De',
      last_name='Mo',
      email='demo@aa.io',
      password='password')

    for i in range(1, 100):
      users = User(
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        email=fake.unique.email(),
        hashed_password=generate_password_hash(fake.password()),
      )
      db.session.add(users)

    db.session.add(demo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
