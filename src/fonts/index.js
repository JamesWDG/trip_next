import { Outfit } from "next/font/google";
import { Poppins } from "next/font/google";
import { Roboto } from "next/font/google";

const Outfit600 = Outfit({ subsets: ["latin"], weight: "600" });
const Outfit300 = Outfit({ subsets: ["latin"], weight: "300" });
const Outfit400 = Outfit({ subsets: ["latin"], weight: "400" });
const Outfit500 = Outfit({ subsets: ["latin"], weight: "500" });

const Poppins700 = Poppins({ subsets: ["latin"], weight: "700" });
const Poppins500 = Poppins({ subsets: ["latin"], weight: "500" });
const Poppins400 = Poppins({ subsets: ["latin"], weight: "400" });

const Roboto700 = Roboto({ subsets: ["latin"], weight: "700" });
const Roboto500 = Roboto({ subsets: ["latin"], weight: "500" });
const Roboto400 = Roboto({ subsets: ["latin"], weight: "400" });

export {
  Outfit600,
  Outfit400,
  Outfit500,
  Outfit300,
  Poppins700,
  Poppins500,
  Poppins400,
  Roboto400,
  Roboto500,
  Roboto700,
};
