import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: false,
    },
    // image: {
    //   public_id: {
    //     type: String,
    //     required: true
    //   },
    //   url: {
    //     type: String,
    //     required: true
    //   }
    // },
    image:{
      type: String,
      required: true,
    }
    ,
    gear: {
      type: String,
      required: true,
    },
    blurhash: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
