# Menggunakan image Python 3.10 sebagai dasar
FROM python:3.10-slim

# Mengatur direktori kerja di dalam container
WORKDIR /app

# Menyalin file requirements.txt ke dalam container
COPY requirements.txt .

# Menginstal dependencies yang ada di requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Menyalin seluruh file aplikasi ke dalam container
COPY . .

# Mengatur perintah untuk menjalankan aplikasi Anda
CMD ["python", "app.py"]
