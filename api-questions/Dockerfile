# #  IITP Questions API - (Node-Express)

# FROM node:17-alpine

# # # Create App Directory
# RUN mkdir -p /usr/src/app

# WORKDIR /usr/src/app

# # Install Dependencies
# COPY package*.json ./



# # RUN apk add --no-cache --update librsvg ghostscript graphicsmagick imagemagick
# # build tools for native dependencies
# # RUN apk add --update make gcc g++ git

# # install graphicsmagick from source because install via apk not working
# # ENV PKGNAME=graphicsmagick
# # ENV PKGVER=1.3.40
# # ENV PKGSOURCE=https://downloads.sourceforge.net/$PKGNAME/$PKGNAME/$PKGVER/GraphicsMagick-$PKGVER.tar.lz

# # Installing graphicsmagick dependencies
# # RUN apk add --update \
# #     lzip \
# #     wget \
# #     ffmpeg \
# #     libjpeg-turbo-dev \
# #     libpng-dev \
# #     libtool \
# #     libgomp && \
# #     wget $PKGSOURCE --no-check-certificate && \
# #     lzip -d -c GraphicsMagick-$PKGVER.tar.lz | tar -xvf - && \
# #     cd GraphicsMagick-$PKGVER && \
# #     ./configure \
# #     --build=$CBUILD \
# #     --host=$CHOST \
# #     --prefix=/usr \
# #     --sysconfdir=/etc \
# #     --mandir=/usr/share/man \
# #     --infodir=/usr/share/info \
# #     --localstatedir=/var \
# #     --enable-shared \
# #     --disable-static \
# #     --with-modules \
# #     --with-bzip=yes \
# #     --with-tiff=yes \
# #     --with-freetype=yes \
# #     --with-jpeg=yes \
# #     --with-jp2=yes \
# #     --with-cms2=yes \
# #     --with-xml=yes \
# #     --with-x11=yes \
# #     --with-wmf=yes \
# #     --with-threads \
# #     --with-gs-font-dir=/usr/share/fonts/Type1 \
# #     --with-quantum-depth=16 && \
# #     make && \
# #     make install && \
# #     cd ../ / && \
# #     rm -rf GraphicsMagick-$PKGVER && \
# #     rm GraphicsMagick-$PKGVER.tar.lz

# RUN npm install --silent

# # Copy app source code
# COPY . .

# # Exports
# EXPOSE 8081

# CMD ["npm","start"]

#  IITP Questions API - (Node-Express)
FROM node:17-alpine

# # Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./
RUN npm install --silent

# Install pandoc
# RUN apk update && \
#     apk add --no-cache wget && \
#     wget http://dl-cdn.alpinelinux.org/alpine/v3.17/community/x86_64/pandoc-2.19.2-r0.apk && \
#     apk add --no-cache --allow-untrusted pandoc-2.19.2-r0.apk && \
#     apk del wget

# Install libreoffice
# RUN apk update && \
#     apk add libreoffice

# RUN apk add --no-cache msttcorefonts-installer fontconfig
# RUN update-ms-fonts

# RUN wget https://github.com/google/fonts/archive/main.tar.gz -O gf.tar.gz
# RUN tar -xf gf.tar.gz
# RUN mkdir -p /usr/share/fonts/truetype/google-fonts
# RUN find $PWD/fonts-main/ -name "*.ttf" -exec install -m644 {} /usr/share/fonts/truetype/google-fonts/ \; || return 1
# RUN rm -f gf.tar.gz
# RUN fc-cache -f && rm -rf /var/cache/*


# Copy app source code
COPY . .

# Expose the container port
EXPOSE 8002

# Start the app
CMD ["npm","start"]
