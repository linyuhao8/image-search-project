# Image Search Website

This is an image search website built using React and Next.js for the frontend, with an Express backend. It integrates with the Pexels API to display random images or search results. The frontend sends API requests to retrieve images while maintaining a **frontend-backend separation**.

# UI Preview

![image](https://github.com/linyuhao8/image-search-project/blob/main/frontend/public/image-search-ui1.png)
![image](https://github.com/linyuhao8/image-search-project/blob/main/frontend/public/image-search-ui2.png)
![image](https://github.com/linyuhao8/image-search-project/blob/main/frontend/public/image-search-ui3.png)
![image](https://github.com/linyuhao8/image-search-project/blob/main/frontend/public/image-search-ui4.png)
![image](https://github.com/linyuhao8/image-search-project/blob/main/frontend/public/image-search-ui5.png)
![image](https://github.com/linyuhao8/image-search-project/blob/main/frontend/public/image-search-ui6.png)

## Features

### 1. **Homepage**

- On first load at `http://localhost:3000`, the homepage requests images from the Pexels API based on a randomly generated page number. Each request fetches **15 images per page** in JSON format.
- Clicking "Load More" will generate a new random page number (ensuring no duplicates) and fetch additional random images, appending them to the bottom of the page.
- Users can search for images, which redirects them to the search page.
- The frontend computes a random page number and sends a GET request to `http://localhost:5001/random?page=1`. The backend processes this route and returns the images.

### 2. **Search Page**

- When a user searches for images, the page redirects to `http://localhost:3000/search?q={keyword}`.
- The backend extracts the keyword from the URL and requests images from the Pexels API.
- The frontend automatically computes the page number and sends a GET request to `http://localhost:5001/search?q=keyword&page=1`, returning the first set of search results.
- Clicking "Load More" increments the page number by 1, fetching additional images.

### 3. **Masonry Layout**

- Initially, the layout used CSS for the waterfall grid. It has now been replaced with `react-masonry-css`, ensuring that images remain in order even after dynamically adding more, and fully supporting **responsive design (RWD)**.

### 4. **Additional Pages**

- **Homepage**
- **Search results page** (only accessible after searching)
- **Privacy Policy page**
- **About Us page**

---

## API Routes

The backend provides two API routes for image requests:
On the image display page you can open the DevTools checking console and whenever the API is requested, there will be routing information and an array of images on it.

- **Random Images:**

  - Endpoint: `http://localhost:5001/random`
  - Returns 15 random images based on a randomly generated page number.

- **Search Images:**
  - Endpoint: `http://localhost:5001/search?q={keyword}`
  - Fetches images based on the provided search keyword.

---

## Technologies Used

### **Frontend:**

- Next.js
- React
- Axios
- Tailwind CSS (for responsive design)
- `react-masonry-css` (for masonry grid layout)
- `dotenv` (for environment variable management)

### **Backend:**

- Express
- CORS
- `dotenv` (for environment variable management)

### **Security:**

- API keys are **encrypted using `.env` files**.
- The **frontend only interacts with the backend**, which then communicates with the Pexels API. This structure ensures:
  - **Backend security** (API keys remain hidden)
  - **Frontend-backend separation**, making the project easier to maintain.

---

## Setup Instructions

1.Clone this repository.
```bash
git clone https://github.com/linyuhao8/image-search-project.git
cd image-search-project
```
2.Add a new file `.env` to /server. Reference env.sample.
```bash
cd server
npm install
touch .env
```
Fill in the API key https://www.pexels.com/api/
```
.env

#Backend Port
PORT=5001
#Api key https://www.pexels.com/api/
IMAGE_API_KEY=yourkey
```
3.start backend
```bash
npm start
```
The backend will run on `http://localhost:5001`.
4. Add a new file `.env` to /client. Reference env.sample.
```bash
cd client
npm install
touch .env
```
According to the front-end PORT.
```
.env
#According to the front-end PORT
NEXT_PUBLIC_API_URL=http://localhost:5001
```
5. Start the frontend:
```bash
npm run dev
```
The frontend will run on `http://localhost:3000`.

---

## About This Project

This project is a **personal side project** aimed at practicing **frontend-backend separation** and integrating third-party APIs (Pexels) to build a smooth image search experience. Through this project, I have gained deeper experience with **Next.js, Express, API integration, masonry grid layouts, and environment variable management (.env).**

### Current Features:

- Dynamic API-based image retrieval (random and search modes)
- Masonry-style image layout for a better user experience
- **Frontend-backend separation**, with the backend handling API requests and protecting API keys
- Implement **infinite scroll**

### Future Plans:

- Add a **user favorites feature**
- Integrate **more image sources**

This is an **open-source project**! If you're interested, feel free to contribute or share your ideas! 🎉

---
