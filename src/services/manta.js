import { MantaClient } from "mantahq-sdk";

const manta = new MantaClient({
  sdkKey: import.meta.env.VITE_MANTA_API_KEY,
});

export default manta;
