from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Board, db, Pyn, pyn_board


board_routes= Blueprint('boards', __name__)


@board_routes.route('/')
def boards():
  boards = Board.query.all()
  return {
    'boards': [board.to_dict_full() for board in boards]
  }


@board_routes.route('/', methods=['POST'])
def createBoard():
  new_board = Board(
    user_id = request.json['user_id'],
    title = request.json['title'],
  )

  db.session.add(new_board)
  db.session.commit()
  return new_board.to_dict()


@board_routes.route('/<int:id>', methods=['PUT'])
def updateBoard(id):
  board = Board.query.get(id)
  board.title = request.json['title']
  db.session.commit()

  return board.to_dict_full()


@board_routes.route('/<int:id>', methods=['DELETE'])
def deleteBoard(id):
  board = Board.query.get(id)

  db.session.delete(board)
  db.session.commit()

  return board.to_dict()


@board_routes.route('/<int:id>/addToBoard', methods=['PUT'])
def addToBoard(id):
  addedPyn = request.json['pynId']
  board = Board.query.get(id)
  pyn = Pyn.query.get(int(addedPyn))
  board.pyns.append(pyn)
  db.session.commit()

  return board.to_dict_full()



@board_routes.route('/<int:id>/removeFromBoard', methods=['PUT'])
def removeFromBoard(id):
  removedPyn = request.json['pynId']
  board = Board.query.get(id)
  board.pyns = [pyn for pyn in board.pyns if pyn != removedPyn]
  sql = f"DELETE FROM pyn_board WHERE pyn_id = {removedPyn} AND board_id = {id}"

  db.session.execute(sql)

  db.session.commit()

  return board.to_dict_full()
