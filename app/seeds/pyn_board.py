from app.models import db, pyn_board
from faker import Faker
from random import randint
fake = Faker()



# def generate_item():
#   pyns_boards_seeds = set()
#   for i in range(1,151):
#     pynId = randint(1,101)
#     boardId = randint(1, 151)
#     pyns_boards_seeds.add({'pyn_id': int(pynId), 'board_id': int(boardId)})
#     return list(pyns_boards_seeds)


def generate_item():
    result = []
    num_attempts = 400
    while num_attempts > 0:
        num_attempts -= 1
        candidate = {'pyn_id': randint(1,400), 'board_id': randint(1,100)}
        if candidate in result:
            continue
        else:
            result.append(candidate)
    return result


def seed_pyn_board():
  seeds = generate_item()
  for seed in seeds:
    add_association = pyn_board.insert().values(seed)
    db.session.execute(add_association)

  db.session.commit()





def undo_seed_pyn_board():
  db.session.execute('TRUNCATE pyn_board RESTART IDENTITY CASCADE;')
  db.session.commit()
