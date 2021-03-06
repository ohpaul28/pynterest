"""empty message

Revision ID: 25dd7c3336ac
Revises: 
Create Date: 2022-04-22 20:13:16.033546

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '25dd7c3336ac'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('boards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pyns',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('img_url', sa.String(length=2048), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('pyn_id', sa.Integer(), nullable=True),
    sa.Column('content', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['pyn_id'], ['pyns.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pyn_board',
    sa.Column('pyn_id', sa.Integer(), nullable=False),
    sa.Column('board_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['board_id'], ['boards.id'], ),
    sa.ForeignKeyConstraint(['pyn_id'], ['pyns.id'], ),
    sa.PrimaryKeyConstraint('pyn_id', 'board_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pyn_board')
    op.drop_table('comments')
    op.drop_table('pyns')
    op.drop_table('boards')
    op.drop_table('users')
    # ### end Alembic commands ###
