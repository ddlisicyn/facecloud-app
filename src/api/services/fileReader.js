export function getSize(photo, callback) {  
    const fr = new FileReader();
    
    fr.onload = function() {
        const img = new Image();
    
        img.onload = function() {
            if (typeof callback === 'function') {
                callback(img.width, img.height);
            }
        };
    
        img.src = fr.result;
    };
    
    fr.readAsDataURL(photo);
}