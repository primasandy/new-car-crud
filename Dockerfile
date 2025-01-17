# Menggunakan image Python 3.10
FROM python:3.10-slim

# Instal Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Set PATH untuk Rust
ENV PATH="/root/.cargo/bin:${PATH}"

# Menyalin dan menginstal dependencies
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Menyalin seluruh kode aplikasi
COPY . .

# Menjalankan aplikasi
CMD ["python", "app.py"]
