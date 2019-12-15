import { findHotels, bookHotelByDates, findHotelsByDates } from '../database/db.service';

export async function getAllHotels(req: any, res: any) {
   const hotels = await findHotels();
   res.send(hotels);
}

export async function bookHotel(req: any, res: any) {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const hotelId = req.body.hotelId;
    console.log(`Try to book hotel ${hotelId} with dates ${startDate}-${endDate}`);
    await bookHotelByDates(startDate, endDate, hotelId);
    res.sendStatus(200);
}

export async function getHotelsByDate(req: any, res: any) {
    const startDate = req.query.startDate;
    const endDate = req.query.startDate;
    // const hotelId = req.data.hotelId;
    const hotels = await findHotelsByDates(startDate, endDate);
    res.send(hotels);
}