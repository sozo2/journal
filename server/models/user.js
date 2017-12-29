var mongoose = require('mongoose');
var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Name field must be filled out"],
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, "Name field must be filled out"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Must input email"],
        minlength: [5, "Email must be at least 5 characters"],
        maxlength: [40, "Email can be no longer than 40 characters"],
        unique: [true, "Email already registered. Please log in or use different email."],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Email not valid format. Please try again."]
    },
    _journals: [{
        type: Schema.Types.ObjectId,
        ref: 'Journal'
    }],
    dashboard_theme: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 32
    }},
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

var User = mongoose.model('User', UserSchema);