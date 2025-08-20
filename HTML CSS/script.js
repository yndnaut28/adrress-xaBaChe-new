const khomData = {
  ttr: ["Khu 1", "Khu 2", "Khu 3","Khu 3A", "Khu 4", "Khu 5", "Khu 6","Khu 7"],//8
  xdd: ["Thôn Khe Mằn", "Thôn Khe Mười", "Thôn Khe Vang", "Thôn Lang Cang",
        "Thôn Làng Cổng", "Thôn Làng Han", "Thôn Làng Mô", "Thôn Nà Bắp", "Thôn Nà Làng",
        "Thôn Nam Kim", "Thôn Nước Đừng","Thôn Pắc Cáy", "Thôn Tân Tiến", "Thôn Tầu Tiên"],// 14
  xns: ["Thôn Cái Gian", "Thôn Khe Hố", "Thôn Khe Sâu", "Thôn Khe Tâm",
        "Thôn Làng Mới", "Thôn Lò Vôi", "Thôn Nam Hả Trong", "Thôn Nam Hả Ngoài", "Thôn Sơn Hải"],//9
  xts: ["Thôn Bắc Văn", "Thôn Khe Lò", "Thôn Khe Lọng Ngoài", "Thôn Khe Lọng Trong",
        "Thôn Khe Nà", "Thôn Khe Pụt", "Thôn Thành Công"] //7
};//Tong 38 thon

const xaSelect = document.getElementById("xa");
const khomSelect = document.getElementById("khom");

xaSelect.addEventListener("change", function () {
  const xaValue = this.value;
  khomSelect.innerHTML = "<option>-- Chọn Thôn/Khu --</option>";

  if (khomData[xaValue]) {
    khomData[xaValue].forEach((khom) => {
       let displayName = khom;
        if (xaValue === "ttr") {
        //chỉ đổi trong xã Thị trấn Ba Chẽ
        displayName = khom.replace(/^Khu/, "Thôn");
        }
        const option = document.createElement("option");
        option.value = khom;
        option.textContent = khom;
        khomSelect.appendChild(option);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const xaSelect = document.getElementById("xa");
  const khomSelect = document.getElementById("khom");
  const showBtn = document.getElementById("btnshow"); // sửa đúng id
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  const popupClose = document.getElementById("popup-close");

  function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = "flex"; // hiện popup
  }
 // showPopup(""); 
  popupClose.addEventListener("click", () => {
    popup.style.display = "none"; // tắt khi bấm nút ×
  });

  // Đóng khi bấm ra ngoài nội dung
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
  
  showBtn.addEventListener("click", function () {
    const xaValue = xaSelect.value;
    const xaText = xaSelect.options[xaSelect.selectedIndex].text.trim();
    let khom = khomSelect.value;

     if (!xaText || xaText.includes("Chọn") || !khom || khom.includes("Chọn")) {
      showPopup("⚠️ Vui lòng chọn đầy đủ Xã và Thôn/Khu.");
    } else {
      //Nếu là thị trấn (ttr) thì đổi chữ Khu -> Thôn khi hiển thị
      if (xaValue === "ttr") {
        khom = khom.replace(/^Khu/, "Thôn");
      }
      showPopup("🏠 Địa chỉ: " + khom + ", " + xaText + ", tỉnh Quảng Ninh");
    }
  });
});
