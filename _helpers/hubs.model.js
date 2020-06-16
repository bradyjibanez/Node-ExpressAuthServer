/*Model that defines collection item schema
CRUD maintained (create, read, update, delete)*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    admin: { type: String, required: true },
    users: { type: [String], default: [], required: true},
    envName: { type: String, required: true },
    hubID: {type: String, required: true },
    envType: { type: String, required: true },
    claimToken: { type: String },
    configToken: { type: String },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Hubs', schema);