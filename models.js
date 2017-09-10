'use strict';
let mongoose = require('mongoose');

// Store the schema constructor as a local variable
let Schema = mongoose.Schema;

let sortAnswers = (a, b) => {
	// negative a before b
	// 0 no change
	// + positive a after b
	if(a.votes === b.votes){
		return b.updatedAt - a.updatedAt;
	}
	return b.votes - a.votes;
}

let AnswerSchema = new Schema({
	text: String,
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	votes: {type: Number, default: 0}
});

// Create an instance method called update
AnswerSchema.method("update", function(updates, callback){
	Object.assign(this, updates, {updatedAt: new Date()});
	this.parent().save(callback);
});

// Vote instance method

AnswerSchema.method("vote", function(vote, callback){
	if(vote === "up"){
		this.votes++;
	} else {
		this.votes--;
	}
	this.parent().save(callback);
})
// Question Schema
let QuestionSchema = new Schema({
	text: String,
	createdAt: {type: Date, default: Date.now},
	answers: [AnswerSchema]
});

// Pre-save hook
QuestionSchema.pre('save', function(next){
	this.answers.sort(sortAnswers);
	next();
})
// Create the model with mongoose's model method
let Question = mongoose.model('Question', QuestionSchema);
// Export the model
module.exports.Question = Question;
