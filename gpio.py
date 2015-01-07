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

GPIO.setmode(GPIO.BCM)

pins = {
	'light-room-1': [[{'pinNumber': 17, 'state': 0}], {'overallState': 0}],
	'light-room-2': [[{'pinNumber': 27, 'state': 0}], {'overallState': 0}],
	'light-room-3': [[{'pinNumber': 22, 'state': 0}], {'overallState': 0}]
}

for states in pins.itervalues():
	for pinState in states[0]:
		GPIO.setup(pinState['pinNumber'], GPIO.OUT)
		GPIO.output(pinState['pinNumber'], GPIO.LOW)

@socketio.on('connect', namespace='/gpio')
def initSync():
	print "Client connected!"
	emit('initSync', pins)
	return

@socketio.on('disconnect', namespace='/gpio')
def test_disconnect():
	return

@socketio.on('syncReq', namespace='/gpio')
def sync():
	print "Sync!"
	emit('sync', pins)
	return

@socketio.on('lightChange', namespace='/gpio')
def handleLightChange(data):
	roomId = data['roomId']
	state = data['state']
	pinNumber = pins[roomId][0][0]['pinNumber']

	if state == 1:
		GPIO.output(pinNumber, GPIO.HIGH)
	if state == 0:
		GPIO.output(pinNumber, GPIO.LOW)

	for states in pins.itervalues():
		for pinState in states[0]:
			pinState['state'] = GPIO.input(pinState['pinNumber'])
		states[1]['overallState'] = GPIO.input(states[0][0]['pinNumber'])

	emit('serverResponse', {
		'roomId': roomId,
		'state': pins[roomId][1]['overallState']
		}, 
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
