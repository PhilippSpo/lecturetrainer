/*global Chapters:true */
/*global ChapterSchema:true */

Chapters = new Mongo.Collection('chapters');

ChapterSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Chapter title",
    	index: 1
	},
	project: {
		type: String,
		index: 1
	}
});

Chapters.attachSchema(ChapterSchema);