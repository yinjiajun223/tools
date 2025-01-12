document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const upload = document.getElementById('upload');
    const controlsArea = document.getElementById('controlsArea');
    const previewArea = document.getElementById('previewArea');
    const downloadButton = document.getElementById('download');
    const loadingOverlay = document.getElementById('loadingOverlay');

    let originalImageFile;
    let compressedBlob;

    // 处理拖放
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.match('image.*')) {
            handleFile(file);
        }
    });

    // 点击上传区域触发文件选择
    uploadArea.addEventListener('click', function() {
        upload.click();
    });

    upload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            handleFile(file);
        }
    });

    // 显示加载状态
    function showLoading(message = '处理中...') {
        loadingOverlay.querySelector('.loading-text').textContent = message;
        loadingOverlay.style.display = 'flex';
    }

    // 隐藏加载状态
    function hideLoading() {
        loadingOverlay.style.display = 'none';
    }

    function handleFile(file) {
        showLoading('加载图片中...');
        originalImageFile = file;
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                document.getElementById('originalImage').src = e.target.result;
                document.getElementById('originalSize').textContent = formatFileSize(file.size);
                document.getElementById('originalResolution').textContent = `${img.width}x${img.height}`;
                controlsArea.style.display = 'block';
                previewArea.style.display = 'grid';
                hideLoading();
            };
            img.onerror = function() {
                hideLoading();
                alert('图片加载失败，请重试');
            };
            img.src = e.target.result;
        };
        reader.onerror = function() {
            hideLoading();
            alert('文件读取失败，请重试');
        };
        reader.readAsDataURL(file);
    }

    document.getElementById('compress').addEventListener('click', compressImage);
    document.getElementById('download').addEventListener('click', downloadImage);

    function compressImage(targetWidth, targetHeight) {
        const previewBox = document.getElementById('resizePreview');
        if (originalImageFile) {
            showLoading('压缩图片中...');
            const img = new Image();
            img.src = URL.createObjectURL(originalImageFile);
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // 使用目标宽高或原始宽高
                canvas.width = targetWidth || img.width;
                canvas.height = targetHeight || img.height;
                
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                canvas.toBlob(function(blob) {
                    compressedBlob = blob;
                    const compressedUrl = URL.createObjectURL(blob);

                    // 动态创建并插入压缩后的图片
                    const compressedImageContainer = document.getElementById('compressedImageContainer');
                    let compressedImage = document.getElementById('compressedImage');
                    if (!compressedImage) {
                        compressedImage = document.createElement('img');
                        compressedImage.id = 'compressedImage';
                        compressedImage.alt = '压缩图片';
                        compressedImage.className = 'clickable-image';
                        compressedImageContainer.appendChild(compressedImage);
                    }
                    compressedImage.src = compressedUrl;
                    compressedImage.style.display = 'block';
                    compressedPlaceholder.style.display = 'none';

                    document.getElementById('compressedSize').textContent = formatFileSize(blob.size);
                    document.getElementById('compressedResolution').textContent = `${canvas.width}x${canvas.height}`;
                    downloadButton.style.display = 'block';
                    hideLoading();
                    previewBox.style.display = 'none';
                }, 'image/jpeg', 0.7);
            };
            img.onerror = function() {
                hideLoading();
                alert('图片处理失败，请重试');
                previewBox.style.display = 'none';
            };
        }
    }

    function downloadImage() {
        if (compressedBlob) {
            showLoading('准备下载...');
            const link = document.createElement('a');
            link.href = URL.createObjectURL(compressedBlob);
            link.download = 'compressed_image.jpg';
            link.onclick = () => {
                setTimeout(hideLoading, 500); // 短暂显示加载状态
            };
            link.click();
        }
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 添加粘贴事件监听
    document.addEventListener('paste', function(e) {
        e.preventDefault();
        const items = (e.clipboardData || window.clipboardData).items;
        
        for (let item of items) {
            if (item.type.indexOf('image') !== -1) {
                showLoading('处理粘贴的图片...');
                const file = item.getAsFile();
                handleFile(file);
                
                uploadArea.classList.add('paste-success');
                setTimeout(() => {
                    uploadArea.classList.remove('paste-success');
                }, 1000);
                
                break;
            }
        }
    });

    document.getElementById('aspectRatio').addEventListener('change', function() {
        const aspectRatio = this.value.split('/').map(Number);
        const img = document.getElementById('originalImage');
        const previewBox = document.getElementById('resizePreview');
        if (img.src) {
            const originalWidth = img.naturalWidth;
            const originalHeight = img.naturalHeight;
            let targetWidth, targetHeight;

            if (aspectRatio.length === 2) {
                const [widthRatio, heightRatio] = aspectRatio;
                if (widthRatio / heightRatio > originalWidth / originalHeight) {
                    targetWidth = originalWidth;
                    targetHeight = (originalWidth * heightRatio) / widthRatio;
                } else {
                    targetHeight = originalHeight;
                    targetWidth = (originalHeight * widthRatio) / heightRatio;
                }
            } else {
                targetWidth = originalWidth;
                targetHeight = originalHeight;
            }

            // 更新预览框
            previewBox.style.width = `${targetWidth}px`;
            previewBox.style.height = `${targetHeight}px`;
            previewBox.style.display = 'block';

            // 如果已经有压缩后的图片，重新压缩
            if (originalImageFile) {
                compressImage(targetWidth, targetHeight);
            }
        }
    });

    // 更新压缩按钮的事件监听器
    document.getElementById('compress').addEventListener('click', function() {
        const previewBox = document.getElementById('resizePreview');
        const targetWidth = previewBox.style.display === 'block' ? parseInt(previewBox.style.width) : null;
        const targetHeight = previewBox.style.display === 'block' ? parseInt(previewBox.style.height) : null;
        compressImage(targetWidth, targetHeight);
    });
}); 