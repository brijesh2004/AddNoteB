const mongoose = require('mongoose');

const AddNotesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    messages: [
        {
        title:{
            type: String,
        },
            message: {
                type: String,
            }
        }
    ]
});

AddNotesSchema.methods.addMessage = async function (title , message) {
    try {
        this.messages = this.messages.concat({title,message });
        await this.save();
        return this.messages;
    }
    catch (err) {
        console.log(err);
    }
}



const Add = mongoose.model('Add', AddNotesSchema);

module.exports = Add;
