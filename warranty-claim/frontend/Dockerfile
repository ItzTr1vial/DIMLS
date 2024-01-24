# Use a lightweight web server as the base image
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/ 
COPY app.js /usr/share/nginx/html/ 

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]