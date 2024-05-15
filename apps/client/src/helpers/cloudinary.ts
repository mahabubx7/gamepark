import { Cloudinary } from '@cloudinary/url-gen'

export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLD_CLOUD_NAME,
    apiKey: import.meta.env.VITE_CLD_API_KEY,
    apiSecret: import.meta.env.VITE_CLD_API_SECRET,
  },
})
