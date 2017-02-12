'use strict';

const Alexa = require('alexa-sdk');
const AWS = require('aws-sdk');

var config = {
    bucket: 'sonos-communicator',
    key: 'actions'
}

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

function sendMessage(messageJSON){
  var s3 = new AWS.S3();

  var params = {
      Bucket : config.bucket,
      Key : config.key,
      Body : JSON.stringify(messageJSON)
  }

  return new Promise (function (resolve, cat) {
    s3.putObject(params, function(err, data) {
      if (!err) { resolve(); }
      else { cat(); }
    });
  });
}

const handlers = {
    'PlayMusic': function () {
      let slots = this.event.request.intent.slots

      let message = {
        command: 'play',
        search: slots.search.value || 'Rock',
        zones: slots.zones.value || 'Living Room',
        type: slots.type.value
      }

      return sendMessage(message).then(function () {
        this.emit(':tell', 'Playing ' + message.search + ' in the ' + message.zones);
      }.bind(this)).catch(function () {
        this.emit(':tell', 'There has been an error somewhere along the way');
      }.bind(this));
    },
    'ChangeVolume': function () {
      let slots = this.event.request.intent.slots

      let message = {
        command: 'volume',
        zones: slots.zones.value || 'Living Room',
        search: Number(slots.volume.value) || 30
      }

      return sendMessage(message).then(function () {
        this.emit(':tell', 'Turning the volume to ' + message.search + ' in the ' + message.zones);
      }.bind(this)).catch(function () {
        this.emit(':tell', 'There has been an error somewhere along the way');
      }.bind(this));
    },
    'GeneralCommand': function () {
      let slots = this.event.request.intent.slots

      let message = {
        command: slots.command.value,
        zones: slots.zones.value || 'Living Room'
      }

      return sendMessage(message).then(function () {
        this.emit(':tell', 'Telling sonos in the ' + message.zones + ' to ' + message.command);
      }.bind(this)).catch(function () {
        this.emit(':tell', 'There has been an error somewhere along the way');
      }.bind(this));
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
