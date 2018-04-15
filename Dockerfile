# Builder
FROM composer as builder
ENV APP_ENV prod
COPY ./ /app
RUN composer --no-dev install

# Service
FROM php:7.2-apache

RUN a2enmod rewrite env

# System Dependencies.
RUN apt-get update && apt-get install -y \
        libicu-dev \
        librabbitmq-dev \
	--no-install-recommends && rm -r /var/lib/apt/lists/*

# App Dependencies.
RUN set -ex \
	&& buildDeps=' \
		libsqlite3-dev \
	' \
	&& apt-get update && apt-get install -y --no-install-recommends $buildDeps && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install intl opcache pdo_mysql pdo_sqlite \
    && pecl install amqp \
    && docker-php-ext-enable amqp \
	&& apt-get purge -y --auto-remove $buildDeps

# set recommended PHP.ini settings
# see https://secure.php.net/manual/en/opcache.installation.php
RUN { \
		echo 'opcache.memory_consumption=128'; \
		echo 'opcache.interned_strings_buffer=8'; \
		echo 'opcache.max_accelerated_files=4000'; \
		echo 'opcache.revalidate_freq=60'; \
		echo 'opcache.fast_shutdown=1'; \
		echo 'opcache.enable_cli=1'; \
	} > /usr/local/etc/php/conf.d/opcache-recommended.ini

# Default Environment
ENV APP_ENV prod
ENV APP_DEBUG 0
ENV DATABASE_URL sqlite:////var/www/var/data/data.db
ENV MESSENGER_ADAPTER_DSN amqp://guest:guest@messenger:5672/%2f/messages
ENV MAILER_URL null://localhost
ENV CORS_ALLOW_ORIGIN ^https?://localhost:?[0-9]*$
ENV SITE_NAME Example
ENV SITE_EMAIL mail@example.com
ENV BRIDE_NAME Awesome
ENV BRIDE_EMAIL awesome@example.com
ENV GROOM_NAME Sauce
ENV GROOM_EMAIL sauce@example.com

# Copy the app and all the dependencies
COPY --from=builder /app /var/www

# Touch the SQLite Database and set the permissions
RUN mkdir -p ../var/data \
    && chmod 777 ../var/data \
    && touch ../var/data/data.db \
    && chown www-data:www-data ../var/data/data.db

# Create the database schema and load the fixtures
# RUN ../bin/console doctrine:schema:create \
#     && ../bin/console doctrine:fixtures:load --fixtures=../src/DataFixtures/ORM\
RUN ../bin/console cache:clear \
  && chown -R www-data:www-data ../var \
  && ../bin/console doctrine:schema:create
