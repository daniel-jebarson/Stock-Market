import mongoose from "mongoose";
//{"username":"dani","coins":0,"IBM":0,"TSCO":0,"DAI":0,"SHOP":0,"GPV":0,"RELIANCE":0,"start":new Date()}
const DataSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  profit: {
    type: Number,
    required: true,
  },
  coins: {
    type: Number,
    required: true,
  },
  IBM: {
    stocks: {
      type: Number,
      required: true,
    },
    times: {
      type: Number,
      required: true,
    },
    cp: {
      type: Number,
      required: true,
    },
  },
  TSCO: {
    stocks: {
      type: Number,
      required: true,
    },
    times: {
      type: Number,
      required: true,
    },
    cp: {
      type: Number,
      required: true,
    },
  },
  DAI: {
    stocks: {
      type: Number,
      required: true,
    },
    times: {
      type: Number,
      required: true,
    },
    cp: {
      type: Number,
      required: true,
    },
  },
  SHOP: {
    stocks: {
      type: Number,
      required: true,
    },
    times: {
      type: Number,
      required: true,
    },
    cp: {
      type: Number,
      required: true,
    },
  },
  GPV: {
    stocks: {
      type: Number,
      required: true,
    },
    times: {
      type: Number,
      required: true,
    },
    cp: {
      type: Number,
      required: true,
    },
  },
  RELIANCE: {
    stocks: {
      type: Number,
      required: true,
    },
    times: {
      type: Number,
      required: true,
    },
    cp: {
      type: Number,
      required: true,
    },
  },
  start: {
    type: Object,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const DataModel = mongoose.model("Data", DataSchema);

export default DataModel;
