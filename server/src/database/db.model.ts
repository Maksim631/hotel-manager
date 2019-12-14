export interface UserModel {
    email: string,
    password: string
}

export interface HotelModel {
    img: string,
    name: string,
    cost: number,
    description: string,
}

export interface BookModel {
    id: string, 
    startDate: string, 
    endDate: string
}
