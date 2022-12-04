FROM ruby:3.1.3-alpine AS build
ARG RAILS_ENV=production
ARG BUILD_PACKAGES="build-base gcompat"
ARG DEV_PACKAGES="libxml2-dev libxslt-dev postgresql-dev nodejs libcurl git"
ARG RUBY_PACKAGES="tzdata"
WORKDIR /opt/app
ENV RAILS_ROOT /opt/app
ENV RAILS_SERVE_STATIC_FILES true
RUN apk update \
    && apk upgrade \
    && apk add --no-cache $BUILD_PACKAGES $DEV_PACKAGES $RUBY_PACKAGES
RUN gem install bundler:2.3.26
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install --jobs $(nproc)
EXPOSE 3000
CMD ["puma", "-C", "config/puma.rb"]

FROM ruby:3.1.3-alpine
ARG RELEASE_VERSION
ENV VERSION $RELEASE_VERSION
ENV RAILS_ROOT /opt/app
ARG PACKAGES="tzdata postgresql-client nodejs libxml2 gcompat ca-certificates"
ENV RAILS_ENV=production
WORKDIR $RAILS_ROOT
RUN apk update \
    && apk upgrade \
    && apk add --update --no-cache $PACKAGES
RUN mkdir -p /opt/app/vendor
COPY --from=build /usr/local/bundle  /usr/local/bundle
COPY . .

EXPOSE 3000
CMD ["puma", "-C", "config/puma.rb"]%