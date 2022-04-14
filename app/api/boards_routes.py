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
