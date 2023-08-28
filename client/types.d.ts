//auth
export type SignUpData = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    dob: Date,
    avatar: Blob
}
export type SignInData = {
    email: string,
    password: string
}
export type User = {
    id: Number | null,
    avatar: string | null,
    dob: Date | null,
    email: string,
    first_name: string,
    last_name: string
}
export type AuthState = {
    isLoggedIn: boolean,
    token: string,
    info: User,
}

//item
export type ItemData = {
    name: string,
    image: Blob,
    quantity: number,
    unit: string,
    expiration: Date
}

export type ItemType = {
    id: Number,
    name: string,
    status: string,
    expiration: Date,
    image: string,
    amount: Number,
    unit: string,
    added_at: Date
}

export type ItemSummary = {
    totalItems: Number, 
    totalExpiredItems: Number,
    totalExpiringInOneDay: Number
}

export type ItemReport = {
    summary: ItemSummary,
    itemList: ItemType[]
}

//share
// export type ImageType = {
//     name: string,
//     uri: string,
//     type: 'image/jpg',
// }