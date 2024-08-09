import { Schema,model,Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const articleSchema = new Schema ({
    title: { type: String, required: true },
    source: { type: String},
   contentLink: {type:String, required: true},
    uploadedBy: {type: Types.ObjectId, ref:"User", required:true}
}, {
    timestamps:true
});

articleSchema.plugin(toJSON);
export const ArticleModel = model("Article", articleSchema);