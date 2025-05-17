products = [
    {
        "title": "Wireless Bluetooth Headphones",
        "category": "Electronics",
        "price": 2999,
        "reviewCount": 1350,
        "bsr": 23
    },
    {
        "title": "Stainless Steel Water Bottle",
        "category": "Kitchen",
        "price": 699,
        "reviewCount": 590,
        "bsr": 78
    },
    {
        "title": "Aloe Vera Skin Gel",
        "category": "Beauty",
        "price": 299,
        "reviewCount": 250,
        "bsr": 45
    }
]

# Filter Input
selected_category = "Electronics"
min_price = 1000
max_price = 4000
max_review_count = 2000
max_bsr = 100

# Filter Logic
result = []
for product in products:
    if (product["category"] == selected_category and
        min_price <= product["price"] <= max_price and
        product["reviewCount"] <= max_review_count and
        product["bsr"] <= max_bsr):
        result.append(product)

# Output
for item in result:
    print(item)
