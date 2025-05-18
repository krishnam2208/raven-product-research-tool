from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend (HTML/JS) to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route: GET /products
@app.get("/products")
def get_products():
    return [
        {
            "title": "Wireless Mouse",
            "category": "Electronics",
            "price": 999,
            "reviewCount": 150,
            "bsr": 12,
            "image": "https://example.com/mouse.jpg",
            "url": "https://www.amazon.in/dp/B01XYZ1234"
        },
        {
            "title": "Steel Water Bottle",
            "category": "Kitchen",
            "price": 499,
            "reviewCount": 200,
            "bsr": 40,
            "image": "https://example.com/bottle.jpg",
            "url": "https://www.amazon.in/dp/B02ABC5678"
        }
    ]
