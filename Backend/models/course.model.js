import { model, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required:[true,"Title is required"],
      trim:true
      
    },
    description: {
      type: String,
      required:[true,"Description is required"],
      trim:true
    },
    category: {
      type: String,
      required:[true,"Category is required"],
      trim:true
    },
    thumbnail: {
      public_id: {
        type: String,
        required:[true," public_id  is required"],
      },
      secure_url: {
        type: String,
        required:[true,"Secure url is required"],
      },
    },
    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id: {
            type: String,
          },
          secure_url: {
            type: String,
          },
        },
      },
    ],
    numberOfLectures: {
      type: Number,
      default:0
    },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Course = new model('Course',courseSchema);
export default Course;