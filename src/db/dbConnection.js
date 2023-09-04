const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Veritabanina basariyla baglanildi");
    })
    .catch((err) => {
        console.log("Veritabanina baglanilamadi:",err);
    })
