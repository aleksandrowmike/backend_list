import { Document } from "mongoose";
export interface IStudent extends Document {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    birth: Date;
    score: number;
}
