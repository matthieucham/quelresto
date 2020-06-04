FROM nginx:1.17.4-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d

# create the staticfiles directories
ENV STATICFILES_DIR=/home/quelresto/web/staticfiles
RUN mkdir -p $STATICFILES_DIR
# populate static files dir
COPY ./quelresto_backend/staticfiles $STATICFILES_DIR