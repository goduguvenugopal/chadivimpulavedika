import maleNames from "./maleNames.json";
import femaleNames from "./femaleNames.json";

const allNames = [...(maleNames as string[]), ...(femaleNames as string[])];

export default allNames;
