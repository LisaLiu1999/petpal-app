// src/services/strapi.js
console.log(import.meta.env.VITE_REACT_APP_STRAPI_URL)

const API_URL = import.meta.env.VITE_REACT_APP_STRAPI_URL || 'http://localhost:1337';


// 獲取服務列表
export const fetchServices = async () => {
  try {
    const response = await fetch(`${API_URL}/api/services?populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

// 獲取特色功能
export const fetchFeatures = async () => {
  try {
    const response = await fetch(`${API_URL}/api/features?populate=*&sort=order:asc`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
};

// // 獲取 Hero Section
// export const fetchHeroSection = async () => {
//   try {
//     const response = await fetch(`${API_URL}/api/hero-sections?populate=*`);
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching hero section:', error);
//     throw error;
//   }
// };

// 獲取媒體文件 URL
export const getStrapiMedia = (media) => {
  if (!media?.data?.attributes?.url) return null;
  
  const { url } = media.data.attributes;
  return url.startsWith('/') ? `${API_URL}${url}` : url;
};