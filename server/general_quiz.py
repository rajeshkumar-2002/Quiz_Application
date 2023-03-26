from flask import Blueprint

general_bp = Blueprint('routes', __name__)

@general_bp.route('/done')
def done():
    return 'Hello, world!'
