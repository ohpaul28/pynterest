from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Board, db


board_routes= Blueprint('boards', __name__)


@board_routes.route('/')
def boards():
  boards = Board.query.all()
  return {
    'boards': [board.to_dict() for board in boards]
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

  return {
    'updatedBoard': board.id
  }


@board_routes.route('/<int:id>', methods=['DELETE'])
def deleteBoard(id):
  board = Board.query.get(id)

  db.session.delete(board)
  db.session.commit()

  return {
    'deletedBoard': board.id
  }
