
const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('MongoDBコネクションok');
    })
    .catch((err) => {
        console.log('MongoDBコネクションエラー');
        console.log(err);
    });

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() *2000) + 1000;
        const camp = new Campground({
            author: mongoose.Types.ObjectId('67e577d1c72fdf58c4f05772'),
            location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[randomCityIndex].longitude,
                    cities[randomCityIndex].latitude
                ]
            },
            title: `${sample(descriptors)}・${sample(places)}`,
            description: 'たしかにあれがみんな星だと考えますと、突き当たりの大きな扉をあけました。カムパネルラが手をのばしていました。ジョバンニは思わず、カムパネルラともあんまり物を言わないように窓の外から光りました。私はたいへんいい実験をしたってのぼくも知ってらい。ジョバンニはだんだんこころもちが明るくなって、その火は燃えているのです。',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/di3o78wgy/image/upload/v1743950017/YelpCamp/uzjyodzdsnzxvx9zpmrq.jpg',
                  filename: 'YelpCamp/uzjyodzdsnzxvx9zpmrq'
                },
                {
                  url: 'https://res.cloudinary.com/di3o78wgy/image/upload/v1743950017/YelpCamp/uupkm6x9kyaar2allrke.webp',
                  filename: 'YelpCamp/uupkm6x9kyaar2allrke'
                }
              ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});