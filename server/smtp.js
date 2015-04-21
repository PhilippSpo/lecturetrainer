Meteor.startup(function () {
process.env.MAIL_URL = 'smtp://'+Meteor.settings.sendGrid.user+':'+Meteor.settings.sendGrid.password+'@smtp.sendgrid.net:587';
});
