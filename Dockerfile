FROM "node" as builder
WORKDIR /var/www/frontend
COPY ./ ./
RUN ["npm","install","-g","serve"]
RUN ["npm","install","-g","@angular/cli"]
RUN ["npm","install"]
RUN ["ng","build"]

FROM nginx
EXPOSE 80
COPY --from=builder /var/www/frontend/dist/frontend-angular /usr/share/nginx/html
