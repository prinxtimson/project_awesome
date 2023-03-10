FROM php:8.1-alpine
ARG uid=1000
ARG user=tabtech

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    zip \
    unzip

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# COPY . .

WORKDIR /var/www

USER $user
