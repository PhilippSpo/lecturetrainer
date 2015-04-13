Projects = new Mongo.Collection('projects');

ProjectSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Projectname"
	},
	type: {
		type: String,
		allowedValues: ["Speech", "Question-Answer"],
		autoform: {
	      options: [
	        {label: "Sprache", value: "speech"},
	        {label: "Frage-Antwort", value: "qa"}
	      ]
	    }
	},
	speechA: {
		type: String,
		label: "Speech A",
		optional: true,
	    custom: requireSpeeches
	},
	speechB: {
		type: String,
		label: "Speech B",
		optional: true,
	    custom: requireSpeeches
	}
});

Projects.attachSchema(ProjectSchema);

function requireSpeeches () {
  var customCondition = this.field('type').value == 'Speech';
  if (customCondition && !this.isSet && (!this.operator || (this.value === null || this.value === ""))) {
    return "required";
  }
}