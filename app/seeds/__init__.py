from flask.cli import AppGroup
from .users import seed_users, undo_users
from .boards import seed_boards, undo_boards
from .pyns import seed_pyns, undo_pyns
from .comments import seed_comments, undo_comments
from .pyn_board import seed_pyn_board, undo_seed_pyn_board


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_boards()
    seed_pyns()
    seed_comments()
    seed_pyn_board()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_boards()
    undo_pyns()
    undo_comments()
    undo_seed_pyn_board()
    # Add other undo functions here
