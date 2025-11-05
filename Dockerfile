FROM golang:1.22 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o server .

# =========================
# 2. Run Stage
# =========================
FROM gcr.io/distroless/base-debian12 AS runner

# Create app directory
WORKDIR /app

# Copy built binary from builder
COPY --from=builder /app/server .

EXPOSE 8090

# Start the server
ENTRYPOINT ["./server", "serve", "--http=0.0.0.0:8090"]

