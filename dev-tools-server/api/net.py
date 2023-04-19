from flask import (
    Blueprint, request, json
)

from service import whois

net_api = Blueprint('net', __name__, )


@net_api.route('/queryWhois', methods=['GET'])
def query_whois():
    url = request.args.get('url')
    return json(whois.query_whois(url))


@net_api.route('/ping', methods=['GET'])
def ping():
    return 'ping'


@net_api.route('/dnsQuery', methods=['GET'])
def dns():
    return 'ping'