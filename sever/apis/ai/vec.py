import logging

from flask import Blueprint, request

vec = Blueprint('vec', __name__)


@vec.route("onehoe", methods=["POST"])
def one_hoe():
    try:
        request.json
    except:
        logging.info("")
