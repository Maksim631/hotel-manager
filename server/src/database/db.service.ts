import { MongoClient, Db, ObjectId } from "mongodb";
import { UserModel } from './db.model';
import { cryptPassword, comparePassword } from '../commons/encode';

const mongoOptions = {
    useUnifiedTopology: true
}

const url = require('../../config.json').dbUrl;
const usersCollection = 'users';
const hotelsCollection = 'hotels';
const bookCollection = 'bookings';

let db: Db;
let connection: MongoClient;

export async function connect() {
    connection = await MongoClient.connect(url, mongoOptions);
    db = connection.db();
    console.log('Database connected');
}

export async function close() {
    await connection.close();
    console.log('Database closed');
}

export async function registerUser(user: UserModel) {
    console.log(`Try to register new user`);
    user.password = await cryptPassword(user.password);
    return await db.collection(usersCollection).insertOne(user);
}

export async function findByName(email: string) {
    console.log(`Try to find user with name ${email}`);
    return await db.collection(usersCollection).findOne({
        email: email
    });
}

export async function findByNameAndPassword(email: string, password: string) {
    console.log(`Try to find user with name ${email} and password ${password}`);
    const user = await db.collection(usersCollection).findOne({
        email: email
    });
    let comparing;
    if (user) {
        comparing = comparePassword(password, user.password);
    }
    if (comparing) {
        return user;
    } else {
        return null;
    }
}

export async function findHotels() {
    console.log('Try to get all hotels');
    const hotels = db.collection(hotelsCollection).find();
    return await hotels.toArray();
}

export async function bookHotelByDates(startDate: Date, endDate: Date, hotelId: string) {
    return await db.collection(bookCollection).insertOne({
        hotelId: `${hotelId}`,
        startDate: startDate,
        endDate: endDate
    });
}

export async function findHotelsByDates(startDate: string, endDate: string) {
    const hotelIds: string[] = [];
    const hotels = (await db.collection(hotelsCollection).find().toArray());
    for (let hotel of hotels) {
        const bookings = (await db.collection(bookCollection).find({
            hotelId: `${hotel.id}`
        }).toArray());
        if (bookings.length === 0) {
            console.log('empty');
            hotelIds.push(hotel.id);
        } else {
            const isFree = bookings.every(booking => {
                const bookStartDate = new Date(booking.startDate);
                const bookEndDate = new Date(booking.endDate);

                const startDateMs = new Date(startDate).valueOf();
                const endDateMs = new Date(endDate).valueOf();

                const bookStartDateMs = bookStartDate.valueOf();
                const bookEndDateMs = bookEndDate.valueOf();
                if (startDateMs < bookStartDateMs && endDateMs < bookEndDateMs) {
                    return true;
                } else {
                    if (startDateMs > bookEndDateMs) {
                        return true;
                    }
                }
                return false;
            });
            if (isFree) {
                hotelIds.push(hotel.id);
            }
        }
    }
    
    return (await db.collection(hotelsCollection).find({
        id: {
            $in: hotelIds
        } 
    }).toArray());
}