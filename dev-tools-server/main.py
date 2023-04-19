from flask import Flask
from api.net import net_api

app = Flask(__name__)
app.register_blueprint(net_api, url_prefix='/net')


if __name__ == '__main__':
    app.run()