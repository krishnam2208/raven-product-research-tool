#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Product {
    string title;
    string category;
    int price;
    int reviewCount;
    int bsr;
};

int main() {
    vector<Product> products = {
        {"Wireless Bluetooth Headphones", "Electronics", 2999, 1350, 23},
        {"Stainless Steel Water Bottle", "Kitchen", 699, 590, 78},
        {"Aloe Vera Skin Gel", "Beauty", 299, 250, 45}
    };

    string selectedCategory = "Electronics";
    int minPrice = 1000, maxPrice = 4000;
    int maxReviewCount = 2000, maxBSR = 100;

    for (const auto& product : products) {
        if (product.category == selectedCategory &&
            product.price >= minPrice && product.price <= maxPrice &&
            product.reviewCount <= maxReviewCount &&
            product.bsr <= maxBSR) {
            cout << product.title << " | " << product.price << " | " << product.reviewCount << " | " << product.bsr << endl;
        }
    }

    return 0;
}