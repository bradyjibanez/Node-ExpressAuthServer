/*Model that defines collection item schema
CRUD maintained (create, read, update, delete)*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    admin: { type: String, required: true },
    users: { type: [String], default: [], required: true},
    envName: { type: String, required: true },
    envLoc: { type: String, required: true },
    envType: { type: String, required: true },
    envDesc: { type: String, required: false },
    claimedStatus: { type: Boolean, default: false, required: true},
    hubID: { type: String, default: "undefined", required: true},
    claimToken: { type: String },
    configToken: { type: String },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Environment', schema);