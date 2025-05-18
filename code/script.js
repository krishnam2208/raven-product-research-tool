
let products = [];
let filtered = [];
let currentPage = 1;
const resultsPerPage = 5;

document.getElementById("loading").style.display = "block";

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    filtered = [...products];
    renderCategoryOptions(products);
    document.getElementById("loading").style.display = "none";
    displayPage();
  });

function renderCategoryOptions(data) {
  const categorySet = new Set(data.map(p => p.category));
  const categorySelect = document.getElementById("category");
  categorySelect.innerHTML = "<option value=''>--All--</option>";
  for (const cat of categorySet) {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  }
}

function filterProducts() {
  const category = document.getElementById('category').value;
  const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
  const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
  const maxReviews = parseInt(document.getElementById('maxReviews').value) || Infinity;
  const maxBSR = parseInt(document.getElementById('maxBSR').value) || Infinity;

  filtered = products.filter(p =>
    (!category || p.category === category) &&
    p.price >= minPrice && p.price <= maxPrice &&
    p.reviewCount <= maxReviews &&
    p.bsr <= maxBSR
  );

  currentPage = 1;
  displayPage();
}

function displayPage() {
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const pageData = filtered.slice(startIndex, endIndex);

  const tbody = document.getElementById("results-body");
  tbody.innerHTML = "";

  if (pageData.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>No matching products found.</td></tr>";
    document.getElementById("pagination-controls").innerHTML = "";
    return;
  }

  for (const p of pageData) {
    const row = `<tr>
      <td><div style='display:flex; align-items:center; gap:10px;'>
          <img src="${p.image}" class="product-img">
          <a href="${p.url}" target="_blank" style="text-decoration:none; color:#000; font-weight:500;">
            ${p.title}
          </a>
        </div>
      </td>
      <td>${p.category}</td>
      <td>₹${p.price}</td>
      <td>${p.reviewCount}</td>
      <td>${p.bsr}</td>
    </tr>`;
    tbody.innerHTML += row;
  }

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filtered.length / resultsPerPage);
  const controls = document.getElementById("pagination-controls");
  controls.innerHTML = "";

  const prevDisabled = currentPage === 1 ? 'disabled' : '';
  const nextDisabled = currentPage === totalPages ? 'disabled' : '';

  controls.innerHTML = `
    <button onclick="prevPage()" ${prevDisabled}>Previous</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button onclick="nextPage()" ${nextDisabled}>Next</button>
  `;
}

function nextPage() {
  if (currentPage * resultsPerPage < filtered.length) {
    currentPage++;
    displayPage();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPage();
  }
}


function clearFilters() {
  document.getElementById('category').value = '';
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = '';
  document.getElementById('maxReviews').value = '';
  document.getElementById('maxBSR').value = '';
  filterProducts();
}


function exportToCSV() {
  if (filtered.length === 0) return;

  const headers = ["Title", "Category", "Price", "Reviews", "BSR", "URL"];
  const rows = filtered.map(p => [
    '"' + p.title + '"',
    '"' + p.category + '"',
    p.price,
    p.reviewCount,
    p.bsr,
    p.url
  ]);

  const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "results.csv";
  a.click();

  URL.revokeObjectURL(url);
}
