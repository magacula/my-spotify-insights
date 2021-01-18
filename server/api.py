import time
from flask import Flask

app = Flask(__name__)  # creates our flask app


# .route maps a URL to our flask app ("/" points to the route URL)
@app.route('/time')
def get_current_time():
    return {'time': time.time()}
