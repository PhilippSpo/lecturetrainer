// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
	id: 'de.paetzold.projectred',
	name: 'LectureTrainer',
	description: '',
	author: 'Philipp Sporrer',
	email: 'philipp.sporrer@planifica.de',
	website: 'http://www.planifica.de'
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarStyle', 'lightcontent');
App.setPreference('StatusBarBackgroundColor', '#2E56AB');

App.accessRule('*kadira.io');
App.accessRule('*gravater.com');
