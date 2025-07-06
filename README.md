# 🦑 SQUID GAME - Web Edition cho Điện Thoại
### Trò chơi sinh tồn trên web được tối ưu hóa cho mobile

## 📱 Giới thiệu
Trải nghiệm lại những thử thách gay cấn từ bộ phim Squid Game trực tiếp trên điện thoại của bạn! Ứng dụng web này được thiết kế đặc biệt cho người dùng mobile với giao diện cảm ứng thân thiện.

## 🎮 Các Trò Chơi

### 1. 🚦 Đèn Đỏ, Đèn Xanh (Red Light, Green Light)
- **Mục tiêu**: Di chuyển đến vạch đích trong thời gian cho phép
- **Cách chơi**: 
  - Chạm vào màn hình hoặc nút "TAP TO MOVE!" khi đèn xanh sáng
  - Dừng lại khi đèn đỏ sáng
  - Trên PC: Nhấn phím Space
- **Thời gian**: 30 giây

### 2. 🍪 Kẹo Dalgona (Dalgona Cookie)
- **Mục tiêu**: Cắt hình ngôi sao từ kẹo mà không làm vỡ
- **Cách chơi**: 
  - Dùng ngón tay để vẽ/cắt quanh hình ngôi sao
  - Giữ độ chính xác trên 70%
  - Hỗ trợ cảm ứng đa điểm
- **Thời gian**: 60 giây
- **Mạng sống**: 3 ❤️

### 3. 🪢 Kéo Co (Tug of War)
- **Mục tiêu**: Kéo đội đối thủ qua vạch biên
- **Cách chơi**: Nhấn nút "PULL!" liên tục để tăng sức mạnh
- **Chiến lược**: Nhấn nhanh và đều đặn

### 4. 🔮 Bi Kính (Marbles - Chẵn/Lẻ)
- **Mục tiêu**: Đoán đúng số bi trong tay đối thủ
- **Cách chơi**: 
  - Đặt cược số bi muốn chơi
  - Chọn "ODD" (lẻ) hoặc "EVEN" (chẵn)
  - Thắng để lấy bi của đối thủ
- **Điều kiện thắng**: Lấy hết 10 bi của đối thủ

### 5. 🌉 Cầu Kính (Glass Bridge)
- **Mục tiêu**: Qua cầu bằng cách chọn tấm kính an toàn
- **Cách chơi**: 
  - Chọn LEFT hoặc RIGHT cho mỗi bước
  - Tấm kính cường lực sẽ không vỡ (màu xanh)
  - Tấm kính thường sẽ vỡ (màu đỏ)
- **Thử thách**: 10 bước để hoàn thành

## 📱 Tính năng Mobile

### ✨ Tối ưu hóa cảm ứng
- **Điều khiển cảm ứng**: Hỗ trợ tap, swipe, và multi-touch
- **Nút bấm lớn**: Dễ dàng chạm trên màn hình nhỏ
- **Giao diện responsive**: Tự động điều chỉnh theo kích thước màn hình
- **Phông chữ tiếng Hàn**: Noto Sans KR cho trải nghiệm chân thực

### 🎯 Trải nghiệm người dùng
- **Hiệu ứng visual**: Gradient, shadow, và animation mượt mà
- **Âm thanh phản hồi**: Hiệu ứng khi chạm nút
- **Haptic feedback**: Rung khi tương tác (trên thiết bị hỗ trợ)
- **Chống cuộn trang**: Không bị cuộn khi vẽ trên canvas

## 🚀 Cách chạy ứng dụng

### Trên máy chủ local:
```bash
# Khởi động web server
python3 -m http.server 8000

# Mở trình duyệt và truy cập:
http://localhost:8000
```

### Trên điện thoại:
1. Đảm bảo điện thoại và máy tính cùng mạng WiFi
2. Tìm địa chỉ IP của máy tính (ví dụ: 192.168.1.100)
3. Trên điện thoại, mở browser và truy cập: `http://192.168.1.100:8000`
4. Thêm vào màn hình chính để có trải nghiệm như app

## 🎨 Thiết kế

### Màu sắc chủ đạo:
- **Đỏ Squid Game**: #ff1744 (màu chính)
- **Đen gradient**: Background tối
- **Xanh lá**: #4caf50 (thành công)
- **Vàng**: #ffff00 (cảnh báo/giải thưởng)

### Typography:
- **Font chính**: Noto Sans KR (hỗ trợ tiếng Hàn)
- **Fallback**: Sans-serif system fonts

## 📱 Hỗ trợ thiết bị

### ✅ Tương thích:
- **iOS Safari** (iPhone/iPad)
- **Android Chrome** 
- **Android Samsung Internet**
- **Desktop browsers** (Chrome, Firefox, Safari, Edge)

### 📋 Yêu cầu:
- **JavaScript**: Enabled
- **Canvas API**: Hỗ trợ HTML5 Canvas
- **Touch Events**: Cho điều khiển cảm ứng
- **CSS3**: Transforms và animations

## � Luật chơi và điểm số

### Thắng/Thua:
- **Thắng**: Hoàn thành mục tiêu của từng trò chơi
- **Thua**: Vi phạm luật hoặc hết thời gian
- **Giải thưởng**: ₩1,000,000 cho mỗi trò chơi thắng

### Hệ thống progression:
- Chơi tuần tự các trò chơi
- Unlock từng level sau khi hoàn thành
- Restart không giới hạn

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc và Canvas API
- **CSS3**: Styling và responsive design
- **Vanilla JavaScript**: Game logic và tương tác
- **Google Fonts**: Typography (Noto Sans KR)
- **Progressive Web App**: Có thể cài đặt như app native

## 🔧 Tùy chỉnh

### Độ khó:
- Thời gian có thể điều chỉnh trong code
- Tốc độ AI opponent có thể thay đổi
- Số lượng bước cầu kính có thể tùy chỉnh

### Giao diện:
- Dễ dàng thay đổi màu sắc trong CSS
- Thêm âm thanh bằng Web Audio API
- Tích hợp high score system

## 📞 Hỗ trợ

### Báo lỗi:
- Game lag trên thiết bị cũ
- Touch không responsive
- Canvas không hoạt động

### Tối ưu hóa:
- Đóng các app khác khi chơi
- Sử dụng WiFi ổn định
- Cập nhật browser lên phiên bản mới nhất

---

**🎭 "Player 456, welcome to the game!"**

*Chúc bạn may mắn và sống sót qua tất cả các thử thách!* 🦑