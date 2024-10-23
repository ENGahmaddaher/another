// الحصول على العناصر
const colorPicker = document.getElementById('colorPicker');
const svgElements = document.querySelectorAll('.se');  // استهداف كل العناصر داخل الـ SVG

// تحديث لون كل عناصر الـ SVG عندما يختار المستخدم لون جديد
colorPicker.addEventListener('input', (event) => {
    const selectedColor = event.target.value;  // الحصول على اللون المختار
    
    // تكرار كل عنصر وتحديث خاصية 'fill' باللون الجديد
    svgElements.forEach((element) => {
        element.style.fill = selectedColor;
    });
});




// الحصول على القائمة المنسدلة والصور
const colorDropdown = document.getElementById('color-dropdown');
const images = document.querySelectorAll('.color-image');

// إضافة حدث تغيير عند اختيار لون من القائمة المنسدلة
colorDropdown.addEventListener('change', function() {
    const selectedColor = this.value;

    // إزالة التحديد من جميع الصور
    images.forEach(img => img.classList.remove('selected'));

    // تحديد الصورة المطابقة للون المختار
    document.querySelector(`.color-image[data-color="${selectedColor}"]`).classList.add('selected');
});






























const logoUploader = document.getElementById("logoUploader"); 
const userLogo = document.getElementById("userLogo");
let rotation = 0; // لتتبع زاوية التدوير

// عند اختيار صورة جديدة
logoUploader.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            userLogo.src = e.target.result; // تحديث الصورة الجديدة
            userLogo.style.display = "block"; // جعل الصورة مرئية
            userLogo.style.width = "50px"; // تعيين العرض الابتدائي
            userLogo.style.height = "50px"; // تعيين الارتفاع الابتدائي
            userLogo.style.top = "60%"; // ضبط موضع الشعار
            userLogo.style.left = "64%"; // ضبط موضع الشعار
            userLogo.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`; // مركزي
            enableDragResize(userLogo); // تمكين سحب وتغيير حجم الصورة
        };
        reader.readAsDataURL(file); // قراءة الصورة كـ Data URL
    }
});

// تمكين سحب وتغيير حجم الصورة
function enableDragResize(element) {
    let isDragging = false;
    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    // سحب أو تغيير الحجم
    element.addEventListener("mousedown", (e) => {
        if (e.offsetX > element.clientWidth - 10 && e.offsetY > element.clientHeight - 10) {
            isResizing = true;
            startWidth = element.clientWidth;
            startHeight = element.clientHeight;
            startX = e.clientX;
            startY = e.clientY;
            element.style.cursor = "nwse-resize"; // تغيير شكل المؤشر
        } else {
            isDragging = true;
            startX = e.clientX - element.offsetLeft;
            startY = e.clientY - element.offsetTop;
            element.style.cursor = "grabbing"; // تغيير شكل المؤشر
        }

        // إزالة مستمعي الأحداث القديمة
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    });

    const mouseMoveHandler = (e) => {
        if (isDragging) {
            handleDrag(e);
        }
        if (isResizing) {
            handleResize(e);
        }
    };

    const mouseUpHandler = () => {
        isDragging = false;
        isResizing = false;
        element.style.cursor = "auto"; // استعادة شكل المؤشر
        // إزالة مستمعي الأحداث
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    };

    const handleDrag = (e) => {
        const newX = e.clientX - startX;
        const newY = e.clientY - startY;

        const productRect = document.querySelector('.product').getBoundingClientRect();
        const maxX = productRect.width - element.clientWidth;
        const maxY = productRect.height - element.clientHeight;

        element.style.left = Math.min(Math.max(newX, 0), maxX) + "px";
        element.style.top = Math.min(Math.max(newY, 0), maxY) + "px";
    };

    const handleResize = (e) => {
        const newWidth = startWidth + (e.clientX - startX);
        const newHeight = startHeight + (e.clientY - startY);

        // تحديد الحدود القصوى والحدود الدنيا
        if (newWidth > 10 && newWidth <= 100) {
            element.style.width = newWidth + "px";
        }
        if (newHeight > 10 && newHeight <= 100) {
            element.style.height = newHeight + "px";
        }
    };
}

// إضافة خاصية التدوير
userLogo.addEventListener("mousedown", (e) => {
    if (e.button === 0) { // تحقق مما إذا كان الزر الأيسر للماوس مضغوطًا
        document.addEventListener("mousemove", handleRotate);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", handleRotate);
        });
    }
});

const handleRotate = (e) => {
    const dx = e.clientX - (userLogo.offsetLeft + userLogo.clientWidth / 2);
    const dy = e.clientY - (userLogo.offsetTop + userLogo.clientHeight / 2);
    rotation += Math.atan2(dy, dx) * (180 / Math.PI); // حساب الزاوية
    userLogo.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`; // تطبيق التدوير
};



