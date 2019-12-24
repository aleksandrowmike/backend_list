import * as mongoose from "mongoose";

const uri: string = "mongodb+srv://new-mikhail_31:LJL9KSbUnIG6QHzd@cluster0-ziqns.azure.mongodb.net/test?retryWrites=true&w=majority\n";

mongoose.connect(uri, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully Connected!");
  }
});

export interface IBook extends mongoose.Document {
  name: string;
}

export const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const Book = mongoose.model<IBook>("book", BookSchema);
