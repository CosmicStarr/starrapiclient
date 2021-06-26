import { IPhoto } from "./IPhoto";

export interface IMember {
    userId: number
    username: string
    photoUrl: string
    age: number
    alsoKnownAs: any
    profileCreated: Date
    lastActive: Date
    gender: string
    introduction: string
    lookingFor: string
    interestedIn: string
    city: string
    country: string
    photos: IPhoto[]
  }
  
