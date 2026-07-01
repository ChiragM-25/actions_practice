# DevOps Demo Application

## Install

```bash
npm install
```

Run

```bash
npm start
```

Application

```
http://localhost:3000
```

Health

```
http://localhost:3000/health
```

Version

```
http://localhost:3000/version
```

Info

```
http://localhost:3000/info
```

Docker

```bash
docker build -t devops-demo .

docker run -d \
-p 3000:3000 \
-e APP_ENV=dev \
-e APP_VERSION=1.0.0 \
devops-demo
```
