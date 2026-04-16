const { default: axios } = require("axios");

export const BASE_URL = "http://localhost:9080" || process.env.NEXT_PUBLIC_API_URL || "/_/backend"


export const clientServer = axios.create({
    baseURL: BASE_URL,
})