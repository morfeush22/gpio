from gevent import monkey
monkey.patch_all()

from flask import Flask, render_template, make_response
from flask.ext.socketio import SocketIO, emit
from threading import Thread

import RPi.GPIO as GPIO
import signal
import sys

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['DEBUG'] = True
socketio = SocketIO(app)
thread = None

GPIO.setmode(GPIO.BCM)

pins = {
	17: {'room-name': 'light-room-1', 'state': GPIO.LOW},
	27: {'room-name': 'light-room-2', 'state': GPIO.LOW},
	22: {'room-name': 'light-room-3', 'state': GPIO.LOW}
	}

for pin in pins:
	GPIO.setup(pin, GPIO.OUT)
	GPIO.output(pin, GPIO.LOW)

@socketio.on('connect', namespace='/gpio')
def initSync():
	print("Client connected")
	emit('initSync', pins)
	return

@socketio.on('disconnect', namespace='/gpio')
def test_disconnect():
	return

@socketio.on('pin_change', namespace='/gpio')
def handle_pin_change(data):
	pinNo = int(data['pin'])
	action = str(data['data'])
	if action == "on":
		GPIO.output(pinNo, GPIO.HIGH)
	if action == "off":
		GPIO.output(pinNo, GPIO.LOW)

	for pin in pins:
		pins[pin]['state'] = GPIO.input(pin)

	emit('resp', 
			{'count': pinNo, 'data': "Changed state", 'to': action}, 
			broadcast=True)
	return

@app.route("/")
def index():
	return render_template('index.html')

def signalHandler(signal, frame):
	GPIO.cleanup()
	sys.exit(0)

signal.signal(signal.SIGINT, signalHandler)


if __name__ == "__main__":
	socketio.run(app, host='0.0.0.0')
