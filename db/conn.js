const mongoose = require('mongoose');

async function main(){
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(
            "mongodb+srv://isadora:wUe6ji1ZYVBOZfpK@cluster0.woge6ou.mongodb.net/?retryWrites=true&w=majority"
        )

        console.log("Conectado ao banco!")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}
module.exports = main;