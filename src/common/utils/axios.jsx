// src/utils/axios.js
import axios from "axios";
import { APP_CONSTANTS } from "./variables";
import { supabase } from "@/lib/supabaseClient";
// import {TokenUser} from '@/context/AuthContext';

// Cria uma instância do axios com a base URL definida
const api = axios.create({
  baseURL: APP_CONSTANTS.apiUrl, // Defina a base URL aqui
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;
