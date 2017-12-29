var mongoose = require('mongoose');
var Schema = mongoose.Schema

var JournalSchema = new mongoose.Schema({
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {
        type: String,
        required: [true, "Journal must have title."],
        trim: true,
    },
    secure: {
        type: Boolean,
        required: true,
        default: false
    },
    _pages: [{
        type: Schema.Types.ObjectId,
        ref: 'Page'
    }],
    category: {
        type: String,
        required: true,
        default: "default"
    },
    style: {
        type: String,
        required: true,
        default: "default"
    }},
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

var Journal = mongoose.model('Journal', JournalSchema);