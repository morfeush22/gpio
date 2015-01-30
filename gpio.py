from gevent import monkey
monkey.patch_all()

from flask import Flask, render_template, make_response
from flask.ext.socketio import SocketIO, emit
from threading import Thread

import RPi.GPIO as GPIO
import signal
import sys

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_pass'
app.config['DEBUG'] = False
socketio = SocketIO(app)

GPIO.setmode(GPIO.BCM)

pins = {
	'light':
		{
			'light-room-1': [[{'pinNumber': 17, 'state': 0}], {'overallState': 0}],
			'light-room-2': [[{'pinNumber': 27, 'state': 0}], {'overallState': 0}],
			'light-room-3': [[{'pinNumber': 22, 'state': 0}], {'overallState': 0}]
		},
	'temperature':
		{
			'temp-room-1': [[], {'overallState': 15}],
			'temp-room-2': [[], {'overallState': 20}],
			'temp-room-3': [[], {'overallState': 25}]
		}
}

for types in pins.itervalues():
	for states in types.itervalues():
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
	print "Client disconnected!"
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
	pinNumber = pins['light'][roomId][0][0]['pinNumber']

	if state == 1:
		GPIO.output(pinNumber, GPIO.HIGH)
	if state == 0:
		GPIO.output(pinNumber, GPIO.LOW)

	for states in pins['light'].itervalues():
		for pinState in states[0]:
			pinState['state'] = GPIO.input(pinState['pinNumber'])
		states[1]['overallState'] = GPIO.input(states[0][0]['pinNumber'])

	emit('serverResponse', {
			'type': 'light',
			'roomId': roomId,
			'state': pins['light'][roomId][1]['overallState']
		}, 
		broadcast=True)

	print "Light change!"

	return

@socketio.on('temperatureChange', namespace='/gpio')
def handleTemperatureChange(data):
	roomId = data['roomId']
	state = data['state']

	pins['temperature'][roomId][1]['overallState'] = state

	emit('serverResponse', {
			'type': 'temperature',
			'roomId': roomId,
			'state': pins['temperature'][roomId][1]['overallState']
		}, 
		broadcast=True)

	print "Temp change!"

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
