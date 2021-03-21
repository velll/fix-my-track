FROM golang:latest

EXPOSE 8080
WORKDIR /go/src/app

COPY . .

RUN go build -o start

CMD ["/go/src/app/start"]
