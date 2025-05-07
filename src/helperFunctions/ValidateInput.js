export function validatePassword(password,langeuge){
    const englishAlphabeticAndNumbers = /^[A-Za-z0-9]+$/;
    if (!englishAlphabeticAndNumbers.test(password)) {
        return langeuge === "En" 
            ? 'Password can only contain English letters and numbers.' 
            : 'يمكن أن تحتوي كلمة المرور على أحرف إنجليزية وأرقام فقط.';
    }

    if(langeuge==="En"){
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
      
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one capital letter.';
        }
        if (!/[0-9]/.test(password)) {
            return 'Password must contain at least one number.';
        }
    }
    else{
        if (password.length < 8) {
            return 'يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل.';
        }
      
        if (!/[A-Z]/.test(password)) {
            return 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل.';
        }
        if (!/[0-9]/.test(password)) {
            return 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل.';
        }
    }
        return '';
      }
     
      export function validateEmail(email, languege) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return languege === "En" 
                ? 'Please enter a valid email address.' 
                : 'الرجاء إدخال عنوان بريد إلكتروني صالح.';
        }
        return ''; // Return an empty string if the email is valid
    }

